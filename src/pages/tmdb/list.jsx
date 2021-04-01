import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { StatusRender } from "components/status-render";
import { fetchTMDBList } from "reducers/tmdb/list/tmdb-list";
import { statusList } from "scripts";
import { ListInfo } from "./components/list-info";
import { ListResult } from "./components/list-result";

import styles from "./list.module.scss";

export function TMDBList() {
  const params = useParams();
  const dispatch = useDispatch();
  const pageID = Number(params.id) || 1;

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
      <StatusRender 
        status={status} 
        error={error} 
      >
        {list && 
          <ListInfo list={list} />
        }
        <section className="page-section">
          {list.results && list.results.map((result) => (
            <ListResult key={result.id} result={result} />
          ))}
        </section>
      </StatusRender>
    </>
  );
}
