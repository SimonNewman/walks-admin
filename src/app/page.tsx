import Breadcrumbs from "~/components/Breadcrumbs";

export default async function Walks() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home" }]} />

      <div className="prose mt-6">
        <h1>Peak Paths</h1>
      </div>
    </>
  );
}
