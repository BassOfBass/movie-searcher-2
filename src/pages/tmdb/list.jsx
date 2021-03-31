import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { StatusRender } from "src/components/status-render";
import { fetchTMDBList } from "src/reducers/tmdb/list/tmdb-list";
import { statusList } from "src/scripts";
import { createTMDBPagination } from "src/scripts/tmdb";

export function TMDBList() {
  let pageID;
  const params = useParams();
  const dispatch = useDispatch();

  if (!Number(params.id)) {
    pageID = 1
  } else {
    pageID = params.id
  }

  /**
   * @type {TMDBStore.List}
   */
  const { list, status, error } = useSelector(state => state.tmdbList);
  useEffect(() => {
    if (status === statusList.idle) {
      dispatch(fetchTMDBList(pageID));
    }
  }, [status, dispatch]);

  return (
    <>
      <h1>Movie list</h1>
      <StatusRender status={status} error={error} >
        <ListInfo list={list} />
        <section className="page-section">
          {list.results && list.results.map((result) => (
            <ListResult key={result.id} result={result} />
          ))}
        </section>
      </StatusRender>
    </>
  );
}

/**
 * @param {object} props
 * @param {TMDBStore.List["list"]} props.list
 */
function ListInfo({ list }) {
  const {
    id,
    name,
    comments,
    average_rating,
    backdrop_path,
    created_by,
    description,
    iso_3166_1,
    iso_639_1,
    poster_path,
    public: isPublic,
    revenue,
    runtime,
    page,
    total_pages,
    total_results
  } = list;

  const pagination = createTMDBPagination(page, total_pages, total_results);

  return (
    list && 
    <section className="page-section list-info">
      <header id={id}>
        <h2>
          {name} <span>({average_rating.toFixed(1)}/10)</span>
        </h2>
        <figure>
          <picture>
            <img src={poster_path} alt={poster_path}/>
          </picture>
        </figure>
        {created_by && (
          <p>
            Created by: <a href={created_by.username}>{created_by.name}</a>({created_by.gravatar_hash})
          </p>
        )}
      </header>
      <p>
        <figure>
          <picture>
            <img src={backdrop_path} alt={backdrop_path}/>
          </picture>
        </figure>
        {description}
      </p>
      <footer>
        <div>
          <p>Results: {total_results}</p>
          <p>Page: {page} out of {total_pages}</p>
        </div>
        <div>
          <p>Comments:</p>
          <ul>
            {comments && Object.entries(comments).map(([id, comment]) => {
              !comment
                ? null
                : <li id={id}>{comment}</li>
            })}
          </ul>
        </div>
      </footer>
    </section>
  );
}

/**
 * @param {object} props 
 * @param {TMDBEndpoints.ListResult} props.result
 */
function ListResult({ result }) {
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
      className="list-result"
    >
      <header
        className="list-result__header"
      >
        {/* TODO: add link */}
        <h3>
          <a href={id}>{title}</a> <span>({new Date(release_date).getFullYear()})</span>
        </h3>
        {title === original_title &&
          <p>
            {original_title}
            <span>{original_language}</span>
          </p>
        }
        <figure>
          <picture>
            <img src={poster_path} alt={poster_path}/>
          </picture>
        </figure>
        { adult && <p>Adults Only</p> }
      </header>
      <section className="list-result__body">
        <figure>
          <picture>
            <img src={backdrop_path} alt={backdrop_path}/>
          </picture>
        </figure>
        {overview}
      </section>
      <footer className="list-result__footer">
        <ul>
          <li>Type: {media_type}</li>
          <li>Popularity: {popularity}</li>
          <li>isVideo: {String(video)}</li>
          <li>Vote count: {vote_count}</li>
          <li>Vote average: {vote_average}</li>
        </ul>
        <div>
          <span>Genres:</span>{" "}
          <ul className="list-result_genres" >
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