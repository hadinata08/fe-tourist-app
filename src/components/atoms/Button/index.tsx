import * as React from "react";
import { ButtonHTMLAttributes, useMemo } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "primary-outline";
  size?: "sm" | "md";
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any, ref: any) => {
    const {
      disabled,
      size = "sm",
      variant = "primary",
      onMouseOver,
      onMouseLeave,
      style,
      className,
      ...attrs
    } = props;

    const buttonSize = useMemo(() => {
      switch (size) {
        case "sm":
          return "h-10";
        default:
          return "h-14";
      }
    }, [size]);

    const backgroundColor = useMemo(() => {
      switch (variant) {
        case "primary":
          if (disabled) {
            return "#B3B3B3";
          } else {
            return "#D81922";
          }
        case "primary-outline":
          return "transparent";
      }
    }, [variant, disabled]);

    const borderColor = useMemo(() => {
      switch (variant) {
        case "primary":
          return "#D81922";
        case "primary-outline":
          if (disabled) {
            return "#FF5A001A";
          } else {
            return "#D81922";
          }
      }
    }, [variant, disabled]);

    const textSize = useMemo(() => {
      if (size === "sm") {
        return "text-sm";
      }
      return "text-base";
    }, [size]);

    const textColor = useMemo(() => {
      switch (variant) {
        case "primary":
          if (disabled) {
            return "#E2E2E2";
          } else {
            return "#FFFFFF";
          }
        case "primary-outline":
          if (disabled) {
            return "#FF5A001A";
          } else {
            return "#D81922";
          }
      }
    }, [variant, disabled]);

    return (
      <button
        disabled={disabled}
        onMouseOver={(e) => {
          if (!onMouseOver) return;

          onMouseOver(e);
        }}
        onMouseLeave={(e) => {
          if (!onMouseLeave) return;

          onMouseLeave(e);
        }}
        className={"rounded font-semibold px-6"
          .concat(textSize ? " " + textSize : "")
          .concat(buttonSize ? " " + buttonSize : "")
          .concat(variant === "primary-outline" ? " border" : "")
          .concat(className ? " " + className : "")}
        style={{ borderColor, backgroundColor, color: textColor, ...style }}
        {...attrs}
        ref={ref}
      />
    );
  }
);

export default Button;
