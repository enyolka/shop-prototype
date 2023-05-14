import * as React from "react";
import * as classNames from "classnames";
import "./button.css";
import { useEffect } from "react";

type Role = "default" | "secondary" | "important" | "error";

type PropsButton = {
  className?: string;
  role?: Role;
  effect?: boolean;
  children?: React.ReactNode;
};

type Props = PropsButton & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  role = "default",
  className,
  effect,
  children,
  ...props
}: Props) => {
  var animateButton = function (e: any) {
    e.preventDefault;
    // e.target.classList.remove('animate');
    e.target.classList.add("animate");

    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  };

  useEffect(() => {
    const bubbles = document.getElementsByClassName("button--effect");

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].addEventListener("click", animateButton, false);
    }
  }, []);

  return (
    <button
      className={classNames("button", role, className, {
        "button--effect": effect,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
