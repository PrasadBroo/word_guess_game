import React, { useState } from "react";

type Defination = string | null;

export default function useGameManager() {
  const [defination, setDefination] = useState<Defination>(null);

  const [secretWordLength, setSecretWordLength] = useState<number>(0);
  const [counter, setCounter] = useState<number>(60);

  return [
    defination,
    setDefination,
    secretWordLength,
    setSecretWordLength,
    counter,
    setCounter,
  ];
}
