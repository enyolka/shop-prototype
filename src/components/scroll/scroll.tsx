import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import * as classnames from "classnames";
import styles from "./scroll.module.css"

type Props = {
  label?: string;
  className?: any; 
  children: React.ReactNode;
};

function ScrollToTop({
  label = "Back to top",
  children,
  className
}: Props): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (!containerRef.current || !buttonRef.current) {
        return;
      }
      const containerBoundingRect =
        containerRef.current.getBoundingClientRect();
      setVisible((prev) => {
        if (
          !prev &&
          containerBoundingRect.bottom > window.innerHeight &&
          containerBoundingRect.top < -20
        ) {
          return true;
        } else if (
          prev &&
          (containerBoundingRect.top >= -20 ||
            containerBoundingRect.bottom < window.innerHeight)
        ) {
          return false;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [containerRef.current, buttonRef.current]);

  return (
    <div className={classnames(className)} style={{ position: "relative" }} ref={containerRef}>
      {children}
      <button
        ref={buttonRef}
        className={classnames(styles.scroll,
          visible ? styles.visible : "")}
        onClick={handleClick}
        aria-label={label}
      >
        <i className={styles.scroll__icon} />
      </button>
    </div>
  );
}

export { ScrollToTop };