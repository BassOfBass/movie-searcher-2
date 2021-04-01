import { TMDBImage } from "components/image";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import styles from "./list-result.module.scss";

/**
 * @param {object} props 
 * @param {TMDBEndpoints.List.ListResult} props.result
 */
export function ListResult({ result }) {
  const {
    id,
    title,
    original_title,
    overview,
    genre_ids,
    adult,
    backdrop_path,
    media_type,
    original_language,
    popularity,
    poster_path,
    release_date,
    video,
    vote_average,
    vote_count
  } = result;

  const formattedRelease = format(new Date(release_date), "do MMMM Y");

  return (
    <article
      id={id}
      className={styles.item}
    >
      <header
        className={styles.header}
      > 
        <TMDBImage
          className={styles.poster}
          path={poster_path} 
          entry={"poster_path"}
        />
        <h3 className={styles.title}>
          <Link to={`movies/${id}`}>
            {title}
          </Link>{" "}
          <span>({new Date(release_date).getFullYear()})</span>
        </h3>
        {title !== original_title &&
          <p className={styles.original}>
            <span>{original_title}</span>{" "}
            <span>({original_language})</span>
          </p>
        }
        
        {adult && 
          <p>Adults Only</p>
        }
      </header>
      <section className={styles.body}>
        <TMDBImage path={backdrop_path} entry={"backdrop_path"}/>
        {overview}
      </section>
      <footer className={styles.footer}>
        <ul>
          <li>Type: {media_type}</li>
          <li>Popularity: {popularity}</li>
          {/* <li>isVideo: {String(video)}</li> */}
          <li>Vote count: {vote_count}</li>
          <li>Vote average: {vote_average}</li>
        </ul>
        <div>
          <span>Genres:</span>{" "}
          <ul className={styles.genres} >
            {genre_ids.map(id => (
              // TODO: make them links
              <li>{id}</li>
            ))}
          </ul>
        </div>
        <p>
          Release: <time dateTime={release_date}>{formattedRelease}</time>
        </p>
      </footer>
    </article> 
  )
}