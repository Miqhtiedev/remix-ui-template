import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "New App" }, { name: "description", content: "Welcome" }];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-red-500">hi</h1>
    </div>
  );
}
