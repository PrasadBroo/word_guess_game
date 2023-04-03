import React, { useEffect, useState } from "react";

export default function useDocumentTitle(customTitle: string) {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  useEffect(()=>{
    setTitle(customTitle)
  },[])

  return [title, setTitle];
}
