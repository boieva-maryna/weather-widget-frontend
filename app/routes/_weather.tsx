import { Form, Outlet, useNavigation, useSearchParams } from "@remix-run/react";
import Button from "~/components/Button";
import Input from "~/components/Input";

export default function WeatherIndex() {
  const [params] = useSearchParams();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="container mx-auto space-y-10">
      <div className="rounded-lg bg-white p-5 shadow">
        <Form method="get" action="/weather">
          <div className="mb-4 flex items-center space-x-2">
            <Input
              type="text"
              name="city"
              defaultValue={params.get("city") || ""}
              required
            />
            <Button type="submit" className="min-w-[85px]" loading={isLoading}>
              Search
            </Button>
          </div>
        </Form>
        <Outlet />
      </div>
    </div>
  );
}
