import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { TMDBList } from "./list";

import styles from "./index.module.scss";

export function TMDBIndex() {
  let match = useRouteMatch();
  const tmdbNav = [
    { id: "GPxgSkkSN5uvxeJp1eV8f", name: "Index", path: "" },
    { id: "MjakYHj52YG984iNocgRd", name: "Lists", path: "/lists" },
    { id: "tlCeYgK80n8GW9mFYmey_", name: "Movies", path: "/movies" },
    { id: "Km8A2kg44O12mAc4uCp4k", name: "TV", path: "/tv" },
    { id: "UNBwlLvV_nob8_0lejN-J", name: "Genres", path: "/genres" },
    { id: "snxdELbokLnKDlqOVYGVl", name: "People", path: "/people" },
    { id: "k14wnsd87RCdmh36uGT0x", name: "Reviews", path: "/reviews" },

  ];


  return (
    <>
      <aside>
        <nav role="navigation" aria-label="tmdb API">
          <ul>
            {tmdbNav.map((link) => (
              <li key={link.id}>
                <Link to={`${match.url}${link.path}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <Switch>
        <Route path={`${match.path}/lists/:id`}>
          <TMDBList />
        </Route>
      </Switch>
    </>
  );
}