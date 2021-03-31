import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from "./layout";
import { HomePage } from "./pages/home";
import { TMDBIndex } from "./pages/tmdb";

export function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/tmdb">
          <TMDBIndex />
        </Route>
      </Switch>
    </Layout>
  );
}
