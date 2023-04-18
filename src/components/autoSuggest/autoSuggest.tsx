import * as classNames from "classnames";
import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./autoSuggest.css"

const useUniqueId = (x: string) => x

type SuggestTerm<K extends string> = K | ObjectTerm<K>;

export type ObjectTerm<K extends string = string> = {
  value: K;
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  category?: string;
};

export type Props<K extends string, O extends SuggestTerm<K>> = {
  className?: string;
  label: string;
  minLength?: number;
  maxSuggestions?: number;
  autoSuggestTerms: O[];
  showNoResultsFound?: boolean;
  noResultsFoundText?: string;
  showAllTerms?: boolean;
  value: string | O;
  onChange?: (newValue: string) => void;
  onSelection?: (selection: O) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  disabled?: boolean;
  messageType?: "error" | "warning" | "success" | "info";
  message?: string;
  // icon?: React.ReactNode;
  icon?: boolean;
  loading?: boolean;
  name?: string;
  placeholder?: string;
  required?: boolean;
};

function AutoSuggest<
  K extends string = string,
  O extends SuggestTerm<K> = SuggestTerm<K>,
>({
  className,
  label,
  autoSuggestTerms,
  maxSuggestions = 7,
  minLength = 2,
  noResultsFoundText = "No results found",
  value,
  onChange,
  onSelection,
  showAllTerms = false,
  showNoResultsFound,
  disabled,
  message,
  messageType,
  ... props
}: Props<K, O>): React.ReactElement {
  const labelId = useUniqueId("autosuggest-label");
  const listboxId = useUniqueId("autosuggest-listbox");
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>(() => getQuery(value));
  const [focusedWithin, setFocusedWithin] = useState(false);
  const [activeTermIdx, setActiveTermIdx] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const [closeable, setCloseable] = useState(true);

  const hasInput = !!value;
  const termsToShow = showAllTerms && !hasInput
    ? autoSuggestTerms
    : getFilteredTerms(value, minLength, autoSuggestTerms, maxSuggestions);


  const onBlur = (callback?: any) => {
    if (!!props.onBlur) {
      props.onBlur;
    }
    else if (closeable) {
      setExpanded(false);
      callback?.();
    }
  }

  const onFocusOnChange = () => {
    if (termsToShow.length > 0){
      setExpanded(true);
    }
    setCloseable(true);
  }

  const onSelect = () => {
    setCloseable(true);
    setExpanded(false);
  }

  useEffect(() => {
    setQuery(getQuery(value));
  }, [value]);

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
    if (e.target !== inputRef.current) {
      inputRef.current?.focus();
    }  else if (termsToShow.length < 1) {
      setExpanded(false);
      return;
    }
    if (e.key === "Enter" && e.target === inputRef.current && activeTermIdx !== -1) {
      onSelection?.(termsToShow[activeTermIdx]);
      onSelect();
    } else  if (e.key === "Escape") {
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
      className={classNames(
        "autoSuggest",
        hasInput ? "active" : "",
        className,
      )}
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
      {... messageType !== undefined && message !== undefined ? { [`data-${messageType}`]: true } : {}}
    >
      <label>
        <div className="autoSuggest__field">
        <input
          ref={inputRef}
          className={classNames("autoSuggest__input", {
            focus: focusedWithin,
            borderRight: !props.icon
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
            activeTermIdx === -1
              ? undefined
              : "autoSuggest__listItem"//__${activeTermIdx}
          }
          value={query}
          onChange={(e) => {
            onChange?.(e.target.value);
            onFocusOnChange();
          }}
          disabled={disabled}
          placeholder={props.placeholder}
        />
        <span id={labelId} className="spark-label">
          {label}
        </span>
        {/* <button
          type="button"
          className={classNames(
            "autoSuggest__clear-btn", "closIcon",
            hasInput ? "visible" : "",
          )}
          aria-label="Clear contents"
          onClick={() => {
            onChange?.("");
            inputRef.current?.focus();
          }}
          disabled={disabled}
        >usuń</button> */}
          {props.icon ?? 
            <button 
            className={classNames("autoSuggest__searchButton" , {
              focus: focusedWithin })}
            onClick={() => activeTermIdx !== -1 && onSelection?.(termsToShow[activeTermIdx])}
            >
              <FaSearch className="autoSuggest__icon"/>
            </button>}
        </div>
      </label>
      <ul
        id={listboxId}
        className={classNames("autoSuggest__listbox", 
          expanded ? "visible" : "",
           expanded && showAllTerms && !hasInput ? "show_all_terms" : "",
        )}
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
          termsToShow.length < 1 &&
          typeof value === "string" &&
          value.length >= minLength && (
            <li
              className={classNames("autoSuggest__listItem", "autoSuggest__listItem__no_results")}
              role="presentation"
            >
              {noResultsFoundText}
            </li>
          )}
      </ul>
      {messageType !== undefined && message !== undefined && <span className="spark-input__message">{message}</span>}
    </div>
  );
}

function getQuery<O extends SuggestTerm<string>>(value: string | O): string {
  return typeof value === "string" ? value : value.label ?? value.value;
}

function getFilteredTerms<K extends string, O extends SuggestTerm<K>>(
  value: string | O,
  minLength: number,
  autoSuggestTerms: O[],
  maxSuggestions: number,
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

function getLabel<O extends SuggestTerm<string>>(
  suggestTerm: SuggestTerm<string>,
  value: string | O,
  termIdx: number,
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
    <span
      className={"autoSuggest__listItem__value"}
      data-term-index={termIdx}
    >
      {prefix}
      <mark>{middle}</mark>
      {suffix}
    </span>
  );
}

export { AutoSuggest };