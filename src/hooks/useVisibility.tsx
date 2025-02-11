import { useState, useCallback } from 'react';

interface UseVisibilityReturn {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

const useVisibility = (): UseVisibilityReturn => {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

  return { isVisible, show, hide, toggle };
};

export default useVisibility;
