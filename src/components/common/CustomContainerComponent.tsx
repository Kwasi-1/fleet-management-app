import React from "react";

interface Props {
  children: React.ReactNode;
  styles?: string;
}

const CustomContainerComponent = ({ children, styles = "" }: Props) => {
  return <div className={`p-4 h-full min-h-[400px] ${styles}`}>{children}</div>;
};

export default CustomContainerComponent;
