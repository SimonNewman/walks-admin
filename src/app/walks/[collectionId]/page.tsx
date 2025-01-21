import Breadcrumbs from "~/components/Breadcrumbs";
import { DataTable } from "~/components/DataTable";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { walkColumns } from "~/lib/columns";
import WalkCollectionForm from "~/components/forms/WalkCollectionForm";
import { Button } from "~/components/ui/button";
import Link from "next/link";

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
        <WalkCollectionForm collection={collection} />

        <hr />

        <div className="mb-4 mt-8 flex items-center justify-between">
          <h2 className="my-0">Walks</h2>

          <Button asChild>
            <Link className="no-underline" href={`/walks/${id}/create`}>
              Add New
            </Link>
          </Button>
        </div>

        <DataTable columns={walkColumns} data={tableWalks} />
      </div>
    </>
  );
}
