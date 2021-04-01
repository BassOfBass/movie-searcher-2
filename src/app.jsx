import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from "./layout";
import { TMDBIndex } from "./pages/tmdb";

export function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/">
          <TMDBIndex />
        </Route>
      </Switch>
    </Layout>
  );
}
