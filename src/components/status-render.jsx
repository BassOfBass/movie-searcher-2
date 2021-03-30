import { statusList } from "src/scripts";

export function StatusRender({ status, error, children }) {
  return (
    <>
      {status === statusList.loading
        ? <div>Loading...</div>
        : status === statusList.failed
          ? <div>{error}</div>
          : children
      }
    </>
  );
}