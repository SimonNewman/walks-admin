import Breadcrumbs from "~/components/Breadcrumbs";
import { DataTable } from "~/components/DataTable";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { walkColumns } from "~/lib/columns";

export default async function Walks({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const id = Number((await params).collectionId);
  const collection = await api.walkCollection.getById({ id });

  if (!collection) {
    return notFound();
  }

  const { name, walks } = collection;

  const tableWalks = walks.map((w) => ({
    id: w.id,
    name: w.name,
    distance: w.distance,
    link: `/walks/${id}/${w.id}`,
  }));

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", link: "/" },
          {
            label: "Walks",
            link: "/walks",
          },
          {
            label: collection.name,
          },
        ]}
      />

      <div className="prose mt-6">
        <h1>{name}</h1>
        <DataTable columns={walkColumns} data={tableWalks} />
      </div>
    </>
  );
}
