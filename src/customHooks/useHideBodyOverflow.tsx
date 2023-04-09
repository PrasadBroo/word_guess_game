import React, { useEffect, useState } from "react";

export default function useHideBodyOverflow() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (hide) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [hide]);

  return { hide, setHide };
}
