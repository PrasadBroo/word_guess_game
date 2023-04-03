import { useEffect } from "react";
type HandlerType = () => void;

const useWindowUnloadEffect = (handler: HandlerType, dependencies: any[]) => {
  useEffect(() => {
    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, dependencies);
};

export default useWindowUnloadEffect;
