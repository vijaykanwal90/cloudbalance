import { useCallback, useEffect, useRef } from "react";

export const useUserActivity = (onActivity, delay = 600000) => {
  const timeoutRef = useRef(null);

  const handleDebouncedActivity = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {

      onActivity();
    }, delay);
  }, [onActivity, delay]);

  useEffect(() => {
    const handleActivity = () => {
      handleDebouncedActivity();
    };

    const events = [ "keydown", "scroll", "click"];

    events.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearTimeout(timeoutRef.current);
    };
  }, [handleDebouncedActivity]);
};
