import { notFound } from "next/navigation";
import Breadcrumbs from "~/components/Breadcrumbs";
import WalkForm from "~/components/forms/WalkForm";
import { api } from "~/trpc/server";

export default async function Walks({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const collectionId = Number((await params).collectionId);
  const collection = await api.walkCollection.getById({ id: collectionId });

  if (!collection) {
    return notFound();
  }

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
            link: `/walks/${collection.id}`,
          },
          {
            label: "Add New",
          },
        ]}
      />

      <div className="prose mt-6">
        <h1>Add New Walk - {collection.name}</h1>
        <WalkForm collectionId={collectionId} />
      </div>
    </>
  );
}
