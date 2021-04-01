import { TMDBImage } from "components/image";
import { createTMDBPagination } from "scripts/tmdb";

/**
 * @param {object} props
 * @param {TMDBStore.List} props.list
 */
export function ListInfo({ list }) {
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
        <TMDBImage path={poster_path} entry="poster_path"/>
        {created_by && (
          <p>
            Created by: <a href={created_by.username}>{created_by.name}</a>({created_by.gravatar_hash})
          </p>
        )}
      </header>
      <div>
        <TMDBImage path={backdrop_path} entry="backdrop_path" />
        {description}
      </div>
      <footer>
        <div>
          <p>Results: {total_results}</p>
          <p>Page: {page} out of {total_pages}</p>
        </div>
        <div>
          <p>Comments:</p>
          <ul>
            {comments && Object.entries(comments).map(([id, comment]) => (
              comment && <li id={id}>{comment}</li>
            ))}
          </ul>
        </div>
      </footer>
    </section>
  );
}