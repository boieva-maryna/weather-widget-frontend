import { json, type LoaderFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const city = new URLSearchParams(url.search).get("city");

  const apiUrl = `${process.env.BACKEND_API}/weather?city=${
    city || "Copenhagen"
  }`;

  try {
    const { data } = await axios.get(apiUrl);
    return json({ data });
  } catch (err) {
    throw new Response("Sorry, we found no match for your location", {
      status: 404,
    });
  }
};

export default function Index() {
  const { data } = useLoaderData();

  return (
    <>
      <h2>weather in {data.city}</h2>
      <p>{data.temp}</p>
      <p>{data.main}</p>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p>{error.data}</p>
      </div>
    );
  }

  throw error;
}
