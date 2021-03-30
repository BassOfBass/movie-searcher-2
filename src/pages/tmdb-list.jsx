import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusRender } from "src/components/status-render";
import { fetchTMDBList } from "src/reducers/tmdb-list";
import { statusList } from "src/scripts";

export function TMDBList() {
  const dispatch = useDispatch();

  const {list, status, error} = useSelector(state => state.tmdbList);

  useEffect(() => {
    if (status === statusList.idle) {
      dispatch(fetchTMDBList());
    }
  });

  return (
      <>
        <h1>Movie list</h1>
        <section>
          <StatusRender status={status} error={error} >
            {JSON.stringify(list)}
          </StatusRender>
        </section>
      </>
    );
}