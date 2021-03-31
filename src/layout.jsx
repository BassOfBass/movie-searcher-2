import { Link } from "react-router-dom";
import { SiteLogo } from "./assets";

export function Layout({ children }) {
  
  /**
   * @param {import("react").FormEvent<HTMLFormElement} event 
   */
  function handleSiteSearch(event) {
    event.preventDefault();
    /**
     * @type {HTMLFormElement}
     */
    const form = event.target;
    const input = form.elements["site-search"];
  }

  return (
    <>
      <header className="global-header">
        <nav className="global-header__top">
          <div role="banner">
            <Link to="/">
              <SiteLogo />
            </Link>
          </div>
          <form 
            role="search"
            aria-label="Sitewide"
            onSubmit={handleSiteSearch}
          >
            <label htmlFor="site-search">Search:</label>
            <input type="search" name="site-search" id="site-search"/>
            <button type="submit">Go!</button>
          </form>
        </nav>
        <nav role="navigation" aria-label="site">
          <ul>
            <li>
              <Link to="/lists">Lists</Link>
            </li>
            <li>
            <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>
        
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer 
        className="global-footer"
        role="contentinfo"
      >
        TMDB
      </footer>
    </>
  );
}