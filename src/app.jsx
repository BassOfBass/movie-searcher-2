import {
  Switch,
  Route,
  Redirect,
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
        <Route exact path="/tmdb">
          <TMDBIndex />
        </Route>
        <Redirect exact to="/"/>
      </Switch>
    </Layout>
  );
}
