import { ErrorDisplay, LoadingDisplay } from "components";
import { useEffect } from "react";
import { useState } from "react";
import { statusList } from "scripts";
import { tmdbAPI } from "scripts/tmdb/api";

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

  if (status === statusList.loading) {
    return <LoadingDisplay />
  }

  if (status === statusList.failed) {
    return <ErrorDisplay error={error}/>
  }

  const {
    name
  } = list;

  return (
    <>
      <h1>{name}</h1>
    </>
  )
}