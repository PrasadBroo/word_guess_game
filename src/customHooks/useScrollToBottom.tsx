import { useEffect, useRef } from "react";

function useScrollToBottom(ref: React.RefObject<HTMLDivElement>): void {
  const prevScrollHeightRef = useRef<number>(0);
  useEffect(() => {
    const div = ref.current;
    console.log(div?.scrollHeight);
    if (div && div.scrollHeight > prevScrollHeightRef.current) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }

    prevScrollHeightRef.current = div?.scrollHeight ?? 0;
  });
}

export default useScrollToBottom;
