import { useEffect } from "react";

/**
 * https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
 * 
 * If you have a tab interface connected to the router, then you probably don’t want to be scrolling to the top when they switch tabs. Instead, how about a `<ScrollToTopOnMount>` in the specific places you need it?
 */
export function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}