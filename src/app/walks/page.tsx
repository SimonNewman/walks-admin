import Breadcrumbs from "~/components/Breadcrumbs";
import { DataTable } from "~/components/DataTable";
import { api } from "~/trpc/server";
import { walkCollectionsColumns } from "~/lib/columns";

export default async function Walks() {
  const collections = await api.walkCollection.getAll();

  const data = collections.map((c) => ({
    id: c.id,
    name: c.name,
    walks: c.walks.length,
    distance: c.walks.reduce((distance, walk) => distance + walk.distance, 0),
    link: `/walks/${c.id}`,
  }));

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", link: "/" }, { label: "Walks" }]} />

      <div className="prose mt-6">
        <h1>Walks</h1>
        <DataTable columns={walkCollectionsColumns} data={data} />
      </div>
    </>
  );
}
