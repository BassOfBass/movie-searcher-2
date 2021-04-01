import { GenreList } from "components/genre-list";
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
        <div className={styles.votes}>
          <p>Rating:</p>
          <meter
            max={10}
            low={5}
            high={8.5}
            optimum={9}
            value={vote_average}
            title={`${vote_average} out of 10`}
          >{vote_average} out of 10</meter>
          <p>{vote_count} votes</p>
        </div>
        <p className={styles.popularity} >Popularity: {popularity}</p>
        
        {adult && 
          <p>Adults Only</p>
        }
      </header>
      <section className={styles.body}>
        <TMDBImage 
          path={backdrop_path} 
          entry={"backdrop_path"}
        />
        <p className={styles.overview}>{overview}</p>
      </section>
      <footer className={styles.footer}>
        <GenreList list={genre_ids} type={media_type} />
        <p>
          Release: <time dateTime={release_date}>{formattedRelease}</time>
        </p>
      </footer>
    </article> 
  )
}