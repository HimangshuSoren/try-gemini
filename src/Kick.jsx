import { useState, useTransition, useEffect } from "react";

export default function Kick() {
  const [isPending, startTransition] = useTransition();

  function getDogImage() {
    startTransition(() => {
      setTimeout(() => {
        console.log("Transition Completed");
      }, 2000);
    });
  }

  useEffect(() => {
    console.log("isPending updated:", isPending);
  }, [isPending]);

  return (
    <div>
      <button onClick={getDogImage}>
        {isPending ? "Loading..." : "Get Dog Image"}
      </button>
    </div>
  );
}
