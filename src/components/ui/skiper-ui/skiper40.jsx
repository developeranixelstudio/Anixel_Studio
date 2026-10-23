import React from "react";
import { cn } from "../../../lib/utils";
import "./skiper40.css";

const Link000 = ({
  children,
  href = "#",
  className = "",
  style = {},
  ...props
}) => {
  return (
    <a
      href={href}
      className={cn("skiper-link skiper-link-000", className)}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
};

const Link001 = ({
  children,
  href = "#",
  className = "",
  style = {},
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("skiper-link skiper-link-001 group", className)}
      style={style}
      {...props}
    >
      <span>{children}</span>
      <svg
        className="skiper-link__icon"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
};

const Link002 = ({
  children,
  href = "#",
  className = "",
  style = {},
  target,
  rel,
  ...props
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("skiper-link skiper-link-002 group", className)}
      style={style}
      {...props}
    >
      <span>{children}</span>
      <svg
        className="skiper-link__icon"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
};

const Link003 = ({
  children,
  href = "#",
  className = "",
  style = {},
  target,
  rel,
  ...props
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("skiper-link skiper-link-003 group", className)}
      style={style}
      {...props}
    >
      <span>{children}</span>
      <svg
        className="skiper-link__icon"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
};

const Link004 = ({
  children,
  href = "#",
  className = "",
  style = {},
  target,
  rel,
  ...props
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("skiper-link skiper-link-004 group", className)}
      style={style}
      {...props}
    >
      <span className="skiper-link__text">{children}</span>
      <svg
        className="skiper-link__icon skiper-link__icon--rotate"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
};

const Link005 = ({
  children,
  href = "#",
  className = "",
  style = {},
  target,
  rel,
  ...props
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("skiper-link skiper-link-005 group", className)}
      style={style}
      {...props}
    >
      <span className="skiper-link__text">{children}</span>
      <svg
        className="skiper-link__icon skiper-link__icon--slide"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
};

const Skiper40 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "40px 20px",
      }}
    >
      <Link001 href="mailto:contact@anixelstudio.com">contact@anixelstudio.com</Link001>
      <Link002 href="https://anixelstudio.com">Explore Anixel Studio</Link002>
      <Link003 href="#services">Our Capabilities</Link003>
      <Link004 href="#approach">Our Methodology</Link004>
      <Link005 href="#contact">Initiate Collaboration</Link005>
    </div>
  );
};

export { Link000, Link001, Link002, Link003, Link004, Link005, Skiper40 };
