import { PropsWithChildren } from "react";

interface ConditionalProps {
  condition: boolean;
}

export default function Conditional({ children, condition }: PropsWithChildren<ConditionalProps>) {
  if (condition) return children;
  return "";
}
