import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className = "", ...props }: LabelProps) {
  return <label className={`block text-sm font-medium mb-1 ${className}`} {...props} />;
}
