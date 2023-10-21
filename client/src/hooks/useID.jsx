import { useState } from "react";

export default function useID() {
  const [elementID, setElementID] = useState(null);

  return {
    elementID,
    setElementID,
  };
}
