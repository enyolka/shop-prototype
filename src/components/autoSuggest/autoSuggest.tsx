import * as classNames from "classnames";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./autoSuggest.css";

const useUniqueId = (x: string) => x;

type SuggestTerm = string | ObjectTerm;

export type ObjectTerm = {
  value: string;
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  category?: string;
};

export type Props<O extends SuggestTerm> = {
  className?: string;
  label: string;
  minLength?: number;
  maxSuggestions?: number;
  autoSuggestTerms: [] | O[];
  showNoResultsFound?: boolean;
  noResultsFoundText?: string;
  showAllTerms?: boolean;
  value: string | O;
  onChange?: (newValue: string) => void;
  onSelection?: (selection: O) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  disabled?: boolean;
  buttonIcon?: React.ReactNode;
  button?: boolean;
  loading?: boolean;
  name?: string;
  placeholder?: string;
  required?: boolean;
};

function AutoSuggest<O extends SuggestTerm>({
  className,
  label,
  autoSuggestTerms,
  maxSuggestions = 7,
  minLength = 2,
  noResultsFoundText = "No results found",
  value,
  onChange,
  onSelection,
  showAllTerms = true,
  showNoResultsFound = true,
  disabled,
  buttonIcon,
  button = true,
  ...props
}: Props<O>): React.ReactElement {
  const labelId = useUniqueId("autosuggest-label");
  const listboxId = useUniqueId("autosuggest-listbox");
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>(() => getQuery(value));
  const [focusedWithin, setFocusedWithin] = useState(false);
  const [activeTermIdx, setActiveTermIdx] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const [closeable, setCloseable] = useState(true);
  const [termsToShow, setTermsToShow] = useState([]);

  const hasInput = !!value;

  const onBlur = (callback?: any) => {
    if (!!props.onBlur) {
      props.onBlur;
    } else if (closeable) {
      setExpanded(false);
      callback?.();
    }
  };

  const onFocusOnChange = () => {
    if (
      termsToShow.length > 0 &&
      typeof value === "string" &&
      value.length >= minLength
    ) {
      setExpanded(true);
    }
    setCloseable(true);
  };

  const onSelect = () => {
    setCloseable(true);
    setExpanded(false);
  };

  useEffect(() => {
    setQuery(getQuery(value));
  }, [value]);

  useEffect(() => {
    setTermsToShow(
      showAllTerms && !hasInput
        ? autoSuggestTerms
        : getFilteredTerms(value, minLength, autoSuggestTerms, maxSuggestions)
    );
  }, [showAllTerms, hasInput, autoSuggestTerms, maxSuggestions, length, value]);

  useEffect(() => {
    if (activeTermIdx === -1) {
      setQuery(getQuery(value));
    } else {
      const term = termsToShow[activeTermIdx] as O | undefined;
      if (term !== undefined) {
        setQuery(typeof term === "string" ? term : term.label ?? term.value);
      }
    }
  }, [activeTermIdx]);

  useEffect(() => {
    setActiveTermIdx(-1);
  }, [termsToShow.length]);

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.target !== inputRef.current && !e.shiftKey) {
      inputRef.current?.focus();
    }
    if (termsToShow.length < 1) {
      () => setExpanded(false);
      return;
    } else if (
      e.key === "Enter" &&
      e.target === inputRef.current &&
      activeTermIdx !== -1
    ) {
      onSelection?.(termsToShow[activeTermIdx]);
      onSelect();
    } else if (e.key === "Escape") {
      setExpanded(false);
      inputRef.current?.blur();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveTermIdx((prev) => Math.max(-1, prev - 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveTermIdx((prev) => Math.min(prev + 1, termsToShow.length - 1));
    }
  };

  return (
    <div
      className={classNames("autoSuggest", hasInput ? "active" : "", className)}
      role="combobox"
      aria-expanded={expanded}
      aria-haspopup="listbox"
      onFocus={() => {
        setFocusedWithin(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(document.activeElement)) {
          setFocusedWithin(false);
        }
        onBlur();
      }}
      onKeyDown={onKeyDown}
    >
      <label>
        <div className="autoSuggest__field">
          <input
            ref={inputRef}
            className={classNames("autoSuggest__input", {
              focus: focusedWithin,
              borderRight: !!buttonIcon || button,
            })}
            onFocus={() => {
              onFocusOnChange();
            }}
            type="text"
            autoComplete="off"
            role="textbox"
            aria-labelledby={labelId}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-activedescendant={
              activeTermIdx === -1 ? undefined : "autoSuggest__listItem" //__${activeTermIdx}
            }
            value={query}
            onChange={(e) => {
              onChange?.(e.target.value);
              onFocusOnChange();
            }}
            disabled={disabled}
            placeholder={props.placeholder}
          />
          <span id={labelId} className="label">
            {label}
          </span>
          {buttonIcon || button ? (
            <button
              className={classNames("autoSuggest__searchButton", {
                focus: focusedWithin,
              })}
              onClick={() =>
                activeTermIdx !== -1 &&
                onSelection?.(termsToShow[activeTermIdx])
              }
              disabled={disabled}
            >
              {buttonIcon != undefined ? (
                buttonIcon
              ) : (
                <FaSearch className="autoSuggest__buttonIcon" />
              )}
            </button>
          ) : null}
        </div>
      </label>
      <ul
        id={listboxId}
        className={classNames("autoSuggest__listbox", {
          visible: expanded,
          show_all_terms: expanded && showAllTerms && !hasInput,
        })}
        role="listbox"
        onMouseDown={() => setCloseable(false)}
      >
        {expanded &&
          termsToShow.map((it, idx) => (
            <li
              key={idx}
              role="option"
              id={`"autoSuggest__listItem--${idx}`}
              className={classNames("autoSuggest__listItem", {
                focus: activeTermIdx === idx,
              })}
              tabIndex={-1}
              aria-selected={activeTermIdx === idx}
              onClick={() => {
                onSelection?.(it);
                inputRef.current?.focus();
                onSelect();
              }}
              data-suggestion-object={typeof it !== "string" ? true : undefined}
            >
              {typeof it !== "string" && it.icon && (
                <span className="spark-icon-">{it.icon}</span>
              )}
              {getLabel(it, value, idx)}
              {typeof it !== "string" && it.description && (
                <span className={"autoSuggest__listItem__description"}>
                  {it.description}
                </span>
              )}
            </li>
          ))}
        {showNoResultsFound &&
          expanded &&
          termsToShow.length === 0 &&
          typeof value === "string" &&
          value.length >= minLength && (
            <li
              className={classNames(
                "autoSuggest__listItem",
                "autoSuggest__listItem__no_results"
              )}
              role="presentation"
            >
              {noResultsFoundText}
            </li>
          )}
      </ul>
    </div>
  );
}

function getQuery<O extends SuggestTerm>(value: string | O): string {
  return typeof value === "string" ? value : value.label ?? value.value;
}

function getFilteredTerms<O extends SuggestTerm>(
  value: string | O,
  minLength: number,
  autoSuggestTerms: O[],
  maxSuggestions: number
): O[] {
  if (typeof value !== "string") {
    autoSuggestTerms.find((it) => {
      const termValue = typeof it === "string" ? it : it.value;
      return termValue === value.value;
    });
    return [];
  }

  if (value === "" || value.length < minLength) {
    return [];
  }
  const result: O[] = [];
  const normalizedValue = value.toLowerCase();
  for (
    let idx = 0;
    idx < autoSuggestTerms.length && result.length < maxSuggestions;
    idx++
  ) {
    const it = autoSuggestTerms[idx];
    const term = typeof it === "string" ? it : it.label ?? it.value;
    if (term.toLowerCase().includes(normalizedValue)) {
      result.push(it);
    }
  }
  return result;
}

function getLabel<O extends SuggestTerm>(
  suggestTerm: SuggestTerm,
  value: string | O,
  termIdx: number
): React.ReactNode {
  const term =
    typeof suggestTerm === "string"
      ? suggestTerm
      : suggestTerm.label ?? suggestTerm.value;
  const query = getQuery(value);

  const idx = term.toLowerCase().indexOf(query.toLowerCase());
  const prefix = term.substring(0, idx);
  const middle = term.substring(idx, idx + query.length);
  const suffix = term.substring(idx + query.length);

  return (
    <span className={"autoSuggest__listItem__value"} data-term-index={termIdx}>
      {prefix}
      <mark>{middle}</mark>
      {suffix}
    </span>
  );
}

export { AutoSuggest };
