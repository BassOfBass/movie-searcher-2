import { ErrorDisplay, LoadingDisplay } from "components";
import { TMDBImage } from "components/tmdb-image";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { statusList } from "scripts";
import { tmdbAPI } from "scripts/tmdb/api";

import styles from "./index.module.scss";
import { ListItems } from "./list-item";

export function TMDBList() {
  let [status, changeStatus] = useState(statusList.idle);
  const [error, setError] = useState(null);
  const [list, setList] = useState(
    /** 
     * @type {TMDBEndpoints.List.GetList}
     */
    ({})
  );

  useEffect(() => {
    (async() => {
      if (status === statusList.idle) {
        changeStatus(status => status = statusList.loading);
        const fetchedList = await tmdbAPI.list.getList({ listID: 1 });

        if (fetchedList instanceof Error) {
          changeStatus(status => status = statusList.failed);
          setError(error => error = fetchedList);
        }

        setList(list => list = fetchedList);
        changeStatus(status => status = statusList.succeeded);
      }
    })();
  }, [status, error, list]);

  if (status === statusList.loading || status === statusList.idle) {
    return <LoadingDisplay />
  }

  if (status === statusList.failed) {
    return <ErrorDisplay error={error}/>
  }

  const {
    name,
    comments,
    page,
    total_pages,
    total_results,
    average_rating,
    backdrop_path,
    created_by,
    description,
    id,
    poster_path,
    public: isPublic,
    revenue,
    runtime,
    iso_3166_1,
    iso_639_1,
    results
  } = list;

  return (
    <>
      <h1 id={id}>{name}</h1>
      <section className={styles.info}>
        <TMDBImage className={styles.poster} path={poster_path} entry={"poster_path"}/>
        <TMDBImage className={styles.backdrop} path={backdrop_path} entry={"backdrop_path"}/>
        <p className={styles.author}>
          Created by:{" "}
          <Link to={`/users/${created_by.username}`}>{created_by.name}</Link>
        </p>
        <p className={styles.description}>
          {description}
        </p>
        <p className={styles.rating}>Rating: {average_rating.toFixed(1)} out of 10</p>
        <footer className={styles.footer}>
          {!isPublic && (
            <p>Private</p>
          )}
          <p>Page: {page} out of {total_pages}</p>
          <p>Total results: {total_results}</p>
        </footer>
      </section>
      <ListItems result={results}/>
    </>
  )
}

