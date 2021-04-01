import { statusList } from "scripts";

/**
 * TODO: write the array logic
 * @param {object} props
 * @param {string} props.status
 * @param {string} props.error
 */
export function StatusRender({ status, error, children }) {
  let render;

  switch (status) {
    case statusList.succeeded: {
      render = children;
      break;
    }

    case statusList.loading: {
      render = <div>Loading...</div>;
      break;
    }

    case statusList.idle: {
      render = <div>Initializing...</div>;
      break;
    }
  
    default: {
      render = <div>{error || "Unknown error"}</div>;
      break; 
    }
  }

  return render;
}