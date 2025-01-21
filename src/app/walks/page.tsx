import Breadcrumbs from "~/components/Breadcrumbs";
import { DataTable } from "~/components/DataTable";
import { api } from "~/trpc/server";
import { walkCollectionsColumns } from "~/lib/columns";
import Link from "next/link";
import { Button } from "~/components/ui/button";

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
        <div className="flex items-center justify-between">
          <h1>Walks</h1>

          <Button asChild>
            <Link className="no-underline" href="/walks/create">
              Add New
            </Link>
          </Button>
        </div>

        <DataTable columns={walkCollectionsColumns} data={data} />
      </div>
    </>
  );
}
