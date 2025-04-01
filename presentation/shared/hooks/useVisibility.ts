import { useState } from "react";

export const useVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  
  const hide = () => setIsVisible(false);

  const toggle = (state?: boolean) => {
    if (state) {
      setIsVisible(state);
      return;
    }

    setIsVisible((prev) => !prev);
  };

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};

