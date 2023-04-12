
import { useEffect, useMemo, useState } from "react";
import * as React from "react";
import * as classNames from "classnames";
import "./accordionMenu.css"

type SectionProps = {
  header: string;
  subHeader?: string;
  children?: React.ReactNode;
  expanded?: boolean;
  className?: string;
  onClick?: () => void;
  onAdditionalClick?:() => void;
};

export type Props = {
    className?: string;
    multiExpand?: boolean;
    collapsible?: boolean;
    children: Array<React.ReactElement<ChildrenProps> | null | false>;
  };
  
  type ChildrenProps = {
    expanded?: boolean;
    onClick?: () => void;
  };
  

function AccordionSection({
  expanded,
  onClick,
  onAdditionalClick,
  header,
  children,
  subHeader,
  className,
}: SectionProps): React.ReactElement {
  const accordionSectionId =  0;//useUniqueId("accordionSection");
  
  return (
    <section className="accordion__drawer">
      <header
        className="accordion__header"
        tabIndex={0}
        // aria-controls={accordionSectionId}
        aria-expanded={expanded}
        onClick={onClick}
      >
        <h4 onClick={(event) => {
            if(event.target == event.currentTarget)
              event.stopPropagation();
            onAdditionalClick();
          }}>{header}</h4>
      </header>
      {children ?
        <div
          className="accordion__content"
          // id={accordionSectionId}
          style={{
            visibility: expanded ? "visible" : "hidden",
            height: expanded ? "auto" : "0px",
          }}
        >
          {subHeader && <h5>{subHeader}</h5>}
          <div>{children}</div>
        </div> 
        : null }
    </section>
  );
}


  function Accordion({
    className,
    collapsible = true,
    multiExpand = true,
    children,
  }: Props): React.ReactElement {
    const sensibleChildren = useMemo(
      () => children.filter(isSensibleChild),
      [children],
    );
    const [expanded, onToggle] = useAccordion(
      sensibleChildren.length,
      collapsible,
      multiExpand,
      () => sensibleChildren.map((it) => it.props.expanded ?? false),
    );
  
    const clonedChildren = useMemo(() => {
      return sensibleChildren.map((element, idx) =>
        React.cloneElement(element, {
          key: idx,
          expanded: expanded[idx],
          onClick: () => onToggle(idx),
        }),
      );
    }, [sensibleChildren, expanded]);
  
    return (
      <div className={classNames("accordion", className)}>
        {clonedChildren}
      </div>
    );
  }
  
  const isSensibleChild = (
    element: React.ReactElement<ChildrenProps> | null | false,
  ): element is React.ReactElement<ChildrenProps> => !!element;
  



  const useAccordion = (
    length: number,
    collapsible: boolean,
    multiExpand: boolean,
    initialExpanded: boolean[] | (() => boolean[]),
  ): [expanded: boolean[], onToggle: (idx: number) => void] => {
    const [expanded, setExpanded] = useState(initialExpanded);
  
    useEffect(() => {
      setExpanded((prev) => normalize(prev, multiExpand));
    }, [multiExpand]);
  
    useEffect(() => {
      setExpanded((prev) => {
        if (length <= prev.length) {
          return normalize(prev.slice(0, length), multiExpand);
        } else {
          return normalize(
            [...prev, ...getBooleanArray(length - prev.length)],
            multiExpand,
          );
        }
      });
    }, [length]);
  
    const onToggle = (idx: number) =>
      setExpanded((prev) => toggle(prev, idx, collapsible, multiExpand));
  
    return [expanded, onToggle];
  };
  
  const toggle = (
    expanded: boolean[],
    idx: number,
    collapsible: boolean,
    multiExpand: boolean,
  ): boolean[] => {
    if (!collapsible && !multiExpand) {
      const newExpanded = getBooleanArray(expanded.length);
      newExpanded[idx] = !expanded[idx];
      if (newExpanded.every((isExpanded) => !isExpanded)) {
        return expanded;
      }
      return newExpanded;
    } else if (!collapsible) {
      const newExpanded = [...expanded];
      newExpanded[idx] = !expanded[idx];
      if (newExpanded.every((isExpanded) => !isExpanded)) {
        return expanded;
      }
      return newExpanded;
    } else if (!multiExpand) {
      const newExpanded = getBooleanArray(expanded.length);
      newExpanded[idx] = !expanded[idx];
      return newExpanded;
    } else {
      return toggleArray(expanded, idx);
    }
  };
  
  const toggleArray = (array: boolean[], idx: number) => {
    const newArray = [...array];
    newArray[idx] = !newArray[idx];
    return newArray;
  };
  
  const normalize = (expanded: boolean[], multiExpand: boolean): boolean[] => {
    if (!multiExpand) {
      const firstExpandedIdx = expanded.indexOf(true);
      const newExpanded = getBooleanArray(expanded.length);
      if (firstExpandedIdx !== -1) {
        newExpanded[firstExpandedIdx] = true;
      }
      return newExpanded;
    }
    return expanded;
  };
  
  const getBooleanArray = (size: number, init = false): boolean[] =>
    new Array(size).map(() => init);
  
  export { useAccordion };
  


  export { Accordion, AccordionSection };
  

