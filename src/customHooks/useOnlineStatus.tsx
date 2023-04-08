import { useState, useEffect } from "react";

function useOnlineStatus(): { isOnline: boolean } {
  const [isOnline, setIsOnline] = useState<boolean>(
    document.visibilityState === "visible"
  );
  useEffect(() => {
    function handleOnlineStatus() {
      setIsOnline(document.visibilityState === "visible");
    }

    window.addEventListener("visibilitychange", handleOnlineStatus);

    return () => {
      window.removeEventListener("visibilitychange", handleOnlineStatus);
    };
  }, []);

  return { isOnline };
}

export default useOnlineStatus;
