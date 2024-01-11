import { useState, useEffect } from 'react';

const useMedia = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMediaChange = (event) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleMediaChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaChange);
    };
  }, [query]);

  return matches;
};

export default useMedia;
