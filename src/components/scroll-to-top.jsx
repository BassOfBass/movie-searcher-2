import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
 * 
 * Most of the time all you need is to “scroll to the top” 
 * because you have a long content page, that when navigated to, stays scrolled down. 
 * This is straightforward to handle with a `<ScrollToTop>` component 
 * that will scroll the window up on every navigation.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}