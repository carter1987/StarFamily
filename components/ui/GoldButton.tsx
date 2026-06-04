import { type ButtonHTMLAttributes, type ReactNode } from "react";

type GoldButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  as?: "button" | "a";
  href?: string;
};

export function GoldButton({
  children,
  className = "",
  as = "button",
  href,
  ...props
}: GoldButtonProps) {
  const classes = `gold-btn inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-wide ${className}`;

  if (as === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
