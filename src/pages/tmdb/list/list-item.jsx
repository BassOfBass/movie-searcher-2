import { TMDBImage } from "components/tmdb-image";
import { format } from "date-fns";
import { Link } from "react-router-dom";

/**
 * @param {object} props
 * @param {TMDBEndpoints.List.ListResult[]} props.results
 */
export function ListItems({ results }) {
  return (
    <section>
      {results.map(
        ({
          id,
          title,
          adult,
          backdrop_path,
          media_type,
          original_title,
          original_language,
          release_date,
          poster_path,
          overview,
          genre_ids
        }) => (
          <article key={id} id={id}>
            <header>
              <TMDBImage path={poster_path} entry={"poster_path"}/>
              <h2>
                <Link to={`/movies/${id}`}>
                  {title}
                </Link>{" "}
                <span>({new Date(release_date).getFullYear()})</span>
              </h2>
              {original_title !== title && (
                <p>{original_title} ({original_language})</p>
              )}
            </header>
            <section>
              <TMDBImage path={backdrop_path} entry={"backdrop_path"}/>
              <p>{overview}</p>
            </section>
            <footer>
              <div>
                <p>Genres:</p>
                <ul>
                  {genre_ids.map((genre) => (
                    <li key={genre}>{genre}</li>
                  ))}
                </ul>
              </div>
              <ul>
                {adult && (
                  <li>Adult</li>
                )}
                <li>Type: {media_type}</li>
              </ul>
              <p>
                Released:{" "}
                <time dateTime={release_date}>{format(new Date(release_date), "do MMMM yo")}</time>
              </p>
            </footer>
          </article>
        )
      )}
    </section>
  )
}