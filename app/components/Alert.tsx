import { ReactElement, ReactNode } from "react";

type AlertProps = {
  title: string;
  detalils?: ReactNode;
  type?: "error" | "success" | "warning" | "info";
};

const COLORS = {
  error: "red",
  success: "green",
  warning: "amber",
  info: "grey",
};

const Alert = ({
  title,
  detalils,
  type = "info",
}: AlertProps): ReactElement => {
  const color = COLORS[type];
  return (
    <div
      className={`bg-${color}-100 border-t border-b border-${color}-500 text-${color}-700 px-4 py-3`}
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <div className="text-sm">{detalils}</div>
    </div>
  );
};

export default Alert;
