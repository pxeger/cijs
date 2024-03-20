import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorType, errorMessage: string;
  console.error(error);
  if (
    error instanceof Object &&
    "status" in error &&
    "statusText" in error &&
    "data" in error
  ) {
    // error is type `ErrorResponse`
    errorType = `${error.status as string} ${error.statusText as string}`;
    errorMessage = error.data as string;
  } else {
    errorType = "Internal error";
    if (error instanceof Object && "message" in error) {
      errorMessage = error.message as string;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "An unknown error has occurred.";
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{errorType}</h1>
      <p>
        <code>{errorMessage}</code>
      </p>
    </div>
  );
}
