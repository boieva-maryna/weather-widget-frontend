import { json } from "@remix-run/node";
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";

import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";
import Alert from "~/components/Alert";

export const meta: V2_MetaFunction = ({ data }) => {
  return [
    {
      title: data?.weather
        ? `Weather in ${data.weather.city}`
        : "Weather widget",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const city = new URLSearchParams(url.search).get("city");

  const apiUrl = `${process.env.BACKEND_API}/weather?city=${
    city || "Copenhagen"
  }`;

  try {
    const { data } = await axios.get(apiUrl);
    return json({ weather: data });
  } catch (err) {
    throw new Response("Sorry, we found no match for your location", {
      status: 404,
    });
  }
};

export default function Weather() {
  const { weather } = useLoaderData();

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Weather in {weather.city}
      </h1>

      <p>
        Temperature: <span className="font-bold">{weather.temp}°C</span>
      </p>
      <p>
        Humidity: <span className="font-bold">{weather.humidity}</span>
      </p>
      <p>
        Wind:{" "}
        <span className="font-bold">
          {weather.wind.speed}m/s {weather.wind.direction}
        </span>
      </p>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <Alert title="Not found" detalils={error.data} />;
  }

  throw error;
}
