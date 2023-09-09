import "./style.css";

import {
  CSSProperties,
  InputHTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react";

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "ref" | "onClick" | "register"
> & {
  status?: "success" | "warning" | "error" | undefined;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  onClick?: () => void;
};

const Input = (props: Props) => {
  const {
    className,
    style,
    containerClassName,
    containerStyle,
    status,
    placeholder,
    onFocus,
    onBlur,
    ...attrs
  } = props;

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const boxShadow = useMemo(() => {
    if (attrs.disabled) {
      return;
    }

    switch (status) {
      case "error":
        return "0px 5px 10px rgba(255, 0, 0, 0.1)";
      case "warning":
        return "0px 5px 10px rgba(203, 210, 31, 0.1)";
      case "success":
        return "0px 5px 10px rgba(28, 193, 28, 0.1)";
    }
  }, [attrs.disabled, status]);

  const borderColor = useMemo(() => {
    switch (status) {
      case "error":
        return "#EC1E1E";
      case "warning":
        return "#F2B50F";
      case "success":
        return "#86E4AD";
    }
  }, [status]);

  const backgroundColor = useMemo(() => {
    if (attrs.disabled) {
      return "#E5E5E5";
    } else {
      return "#FFFFFF";
    }
  }, [attrs.disabled]);

  return (
    <div
      className={"w-full border h-12 rounded relative transition-all duration-200 ease-in-out"
        .concat(attrs.disabled ? " cursor-not-allowed" : " cursor-text")
        .concat(containerClassName ? " " + containerClassName : "")}
      style={{
        boxShadow,
        borderColor,
        backgroundColor,
        ...containerStyle,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        className={`absolute top-5 left-4 right-4 text-sm outline-none transition-all duration-200 ease-in-out disabled:cursor-not-allowed input`}
        style={{
          backgroundColor,
        }}
        onFocus={(e) => {
          setIsFocus(true);

          if (!onFocus) {
            return;
          }
          onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocus(false);

          if (!onBlur) {
            return;
          }
          onBlur(e);
        }}
        {...attrs}
        ref={inputRef}
      />

      <label
        id={attrs.id ? attrs.id + "__label" : undefined}
        htmlFor={attrs.id}
        className={"absolute flex items-center pl-4 pr-4 overflow-hidden cursor-text transition-all duration-200 ease-in-out font-demibold select-none disabled:cursor-not-allowed"
          .concat(
            isFocus || attrs.value || attrs.defaultValue
              ? " top-1.5 left-0 right-0 text-xs"
              : " top-3.5 bottom-auto left-0 right-0 text-sm"
          )
          .concat(attrs.disabled ? " cursor-not-allowed" : "")
          .concat(className ? " " + className : "")}
        style={{
          color: "#808080",
          ...style,
        }}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
