import type { LinksFunction } from "@remix-run/node";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Document from "./components/Document";

import stylesheet from "./tailwind.css";
import Alert from "./components/Alert";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const renderDetails = () => {
    if (isRouteErrorResponse(error)) {
      return (
        <Alert
          title={`${error.status} ${error.statusText}`}
          detalils={error.data}
        />
      );
    } else if (error instanceof Error) {
      return (
        <Alert
          type="error"
          title="Error"
          detalils={
            <>
              <p>{error.message}</p>
              <p>The stack trace is:</p>
              <pre className="overflow-auto">{error.stack}</pre>
            </>
          }
        />
      );
    } else {
      return <Alert type="error" title="Unknown error" />;
    }
  };

  return <Document title="Error">{renderDetails()}</Document>;
}
