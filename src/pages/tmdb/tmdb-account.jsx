import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusRender } from "src/components/status-render";
import { fetchTMDBAccount } from "src/reducers/tmdb-account";
import { statusList } from "src/scripts";

/**
 * TODO: write session mechanism
 */
export function TMDBAccount() {
  const dispatch = useDispatch();

  const {account, status, error} = useSelector(state => state.tmdbList);

  useEffect(() => {
    if (status === statusList.idle) {
      dispatch(fetchTMDBAccount());
    }
  });

  return (
    <>
      <h1>Account</h1>
      <section>
        <StatusRender status={status} error={error}>
          {JSON.stringify(account)}
        </StatusRender>
      </section>
    </>
  );
}