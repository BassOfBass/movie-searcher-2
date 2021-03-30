import { TMDBConfiguration } from "./pages/configuration";
import { TMDBList } from "./pages/tmdb-list";

export function App() {
  return (
    <>
      <header className="global-header">Logo TBD</header>
      <main className="main-content">
        <TMDBConfiguration />
        <TMDBList />
      </main>
      <footer className="global-footer">TMDB</footer>
    </>
  );
}
