import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusRender } from "src/components/status-render";
import { selectConfiguration } from "src/reducers/selectors";
import { fetchTMDBAPIConfig } from "src/reducers/tmdb/configuration/thunks";
import { statusList } from "src/scripts/index";

export function TMDBConfiguration() {
  const dispatch = useDispatch();
  const tmdbConfig = useSelector(selectConfiguration);

  useEffect(() => {
    if (tmdbConfig.status === statusList.idle) {
      dispatch(fetchTMDBAPIConfig());
    }
  }, [tmdbConfig.status, dispatch]);

  return (
    <>
      <h1>Configuration</h1>
      <section>
        <StatusRender status={tmdbConfig.status} error={tmdbConfig.error} >
          Loaded!
        </StatusRender>
      </section>
    </>

  );
}