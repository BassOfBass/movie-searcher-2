import { useSelector } from "react-redux";
import { selectGenres } from "reducers/selectors";

import styles from "./genre-list.module.scss";

/**
 * @param {object} props
 * @param {string[]} props.list
 * @param {string} props.type
 * 
 */
export function GenreList({ list, type = "movie"}) {
  const genres = useSelector(selectGenres(list, type));

  // retrieve genre names according to their IDs 
  return (
    <div className={styles.container}>
      <ul className={styles.genres}>
        {genres.map(({id, name }) => (
          <li key={id} className={styles.genre}>{name}</li>
        ))}
      </ul>
    </div>
  );
}