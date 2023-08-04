import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Form,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import Document from "./components/Document";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const [params] = useSearchParams();

  return (
    <Document>
      <Form method="get">
        <input
          type="text"
          name="city"
          defaultValue={params.get("city") || ""}
        />
        <button type="submit">Search</button>
      </Form>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const renderDetails = () => {
    if (isRouteErrorResponse(error)) {
      return (
        <div>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </div>
      );
    } else if (error instanceof Error) {
      return (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      );
    } else {
      return <h1>Unknown Error</h1>;
    }
  };

  return <Document title="Error">{renderDetails()}</Document>;
}
