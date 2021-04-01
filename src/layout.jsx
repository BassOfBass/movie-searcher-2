import { Link } from "react-router-dom";
import { SiteLogo } from "./assets";

import styles from "./layout.module.scss";
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
      <header className={styles.header}>
        <nav className={styles.top}>
          <div role="banner" className={styles.icon}>
            <Link to="/" className="image-link">
              <SiteLogo className={styles.logo}/>
            </Link>
          </div>
          <form 
            role="search"
            aria-label="Sitewide"
            className={styles.search}
            onSubmit={handleSiteSearch}
          >
            <label htmlFor="site-search">Search:</label>
            <input type="search" name="site-search" id="site-search"/>
            <button 
              className={styles.button}
              type="submit"
            >
              Go!
            </button>
          </form>
          <div></div>
        </nav>
        <nav role="navigation" aria-label="site">
          <ul className={styles.navbar}>
            <li className={styles.navitem}>
              <Link to="/lists">Lists</Link>
            </li>
            <li className={styles.navitem}>
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