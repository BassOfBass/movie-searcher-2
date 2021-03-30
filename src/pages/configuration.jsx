import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusRender } from "src/components/status-render";
import { fetchConfig } from "src/reducers/tmdb-config";
import { statusList } from "src/scripts/index";

export function TMDBConfiguration() {
  const dispatch = useDispatch();
  const { config, status, error } = useSelector(state => state.tmdbConfig)

  useEffect(() => {
    if (status === statusList.idle) {
      dispatch(fetchConfig());
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