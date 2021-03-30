import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusRender } from "src/components/status-render";
import { fetchTMDBAPIConfig } from "src/reducers/tmdb/configuration/reducer";
import { statusList } from "src/scripts/index";

export function TMDBConfiguration() {
  const dispatch = useDispatch();
  const { config, status, error } = useSelector(state => state.tmdbConfig)

  useEffect(() => {
    if (status === statusList.idle) {
      dispatch(fetchTMDBAPIConfig());
    }
  }, [status, dispatch]);

  return (
    <>
      <h1>Configuration</h1>
      <section>
        <StatusRender status={status} error={error} >
          {JSON.stringify(config)}
        </StatusRender>
      </section>
    </>

  );
}