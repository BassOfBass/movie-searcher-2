import { TMDBConfiguration } from "./pages/tmdb-configuration";
import { TMDBAccount } from "./pages/tmdb-account";
import { TMDBList } from "./pages/tmdb-list";

export function App() {
  return (
    <>
      <header className="global-header">Logo TBD</header>
      <main className="main-content">
        <TMDBConfiguration />
        {/* <TMDBList />
        <TMDBAccount /> */}
      </main>
      <footer className="global-footer">TMDB</footer>
    </>
  );
}
