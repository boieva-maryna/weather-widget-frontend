import type { HTMLInputTypeAttribute, ReactElement } from "react";

type InputProps = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue: string;
  name: string;
  required?: boolean;
  className?: string;
};

const Input = ({
  type = "text",
  placeholder,
  defaultValue = "",
  name,
  required,
  className = "",
}: InputProps): ReactElement => {
  return (
    <input
      type={type}
      className={`w-full rounded border border-gray-200 p-2 ${className}`}
      placeholder={placeholder}
      defaultValue={defaultValue}
      name={name}
      required={required}
    />
  );
};

export default Input;
