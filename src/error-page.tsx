import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <main className="text-center my-10">
      <h1 className="text-2xl font-semibold text-red-500">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <strong>{error.statusText || error.message}</strong>
      </p>
    </main>
  );
}
