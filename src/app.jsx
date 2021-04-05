import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from "./layout";
import { HomePage } from "pages/home";
import { TMDBList } from "pages/tmdb/list";
import { MovieDetails } from "pages/tmdb/movies/details";
import { TMDBAuth } from "pages/tmdb/auth";
import { CreateList } from "pages/tmdb/list/create-list";

export function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" >
          <HomePage />
        </Route>
        <Route exact path="/auth" >
          <TMDBAuth />
        </Route>
        <Route exact path="/lists">
          <TMDBList />
        </Route>
        <Route exact path="/lists/create">
          <CreateList />
        </Route>
        <Route>
          <MovieDetails exact path="/movies/:movieID/details"/>
        </Route>
      </Switch>
      
    </Layout>
  );
}
