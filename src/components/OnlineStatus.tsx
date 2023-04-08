import classNames from "classnames";
import React from "react";
type Props = {
  isOnline: boolean;
};

const OnlineStatus: React.FC<Props> = (props) => {
  const class_names = classNames(
    "online-status inline-block ml-2  w-2 h-2 rounded-full",
    { "bg-green-600": props.isOnline, "bg-red-600": !props.isOnline }
  );
  return <div className={class_names}></div>;
};

export default OnlineStatus;
