import { Link } from "react-router-dom";
import { SiteLogo } from "./assets";

import styles from "./layout.module.scss";

export function Layout({ children }) {
  const navList = [
    { id: "GPxgSkkSN5uvxeJp1eV8f", name: "Index", path: "" },
    { id: "MjakYHj52YG984iNocgRd", name: "Lists", path: "/lists" },
    { id: "tlCeYgK80n8GW9mFYmey_", name: "Movies", path: "/movies" },
    { id: "Km8A2kg44O12mAc4uCp4k", name: "TV", path: "/tv" },
    { id: "UNBwlLvV_nob8_0lejN-J", name: "Genres", path: "/genres" },
    { id: "snxdELbokLnKDlqOVYGVl", name: "People", path: "/people" },
    { id: "k14wnsd87RCdmh36uGT0x", name: "Reviews", path: "/reviews" },

  ];
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
            className={styles.searchbar}
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
            {navList.map((link) => (
              <li 
                key={link.id}
                className={styles.navitem}
              >
                <Link to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer 
        className={styles.footer}
        role="contentinfo"
      >
        This product uses the <a href="https://www.themoviedb.org/">TMDb</a>  API but is not endorsed or certified by TMDb.
      </footer>
    </>
  );
}