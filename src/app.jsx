import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Layout } from "./layout";
import { TMDBIndex } from "./pages/tmdb";
import { TMDBList } from "pages/tmdb/list";

export function App() {
  return (
    <Layout>
      <Switch>
        <Route to="/">
          <TMDBList />
        </Route>
      </Switch>
    </Layout>
  );
}
