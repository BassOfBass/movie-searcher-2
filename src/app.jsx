import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from "./layout";
import { HomePage } from "pages/home";
import { TMDBList } from "pages/tmdb/list";

export function App() {
  return (
    <Layout>
      <Switch>
        <Route exact to="/lists">
          <TMDBList />
        </Route>
        <Route exact to="/" >
          <HomePage />
        </Route>
        

      </Switch>
      
    </Layout>
  );
}
