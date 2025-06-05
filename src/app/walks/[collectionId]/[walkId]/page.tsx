import Breadcrumbs from "~/components/Breadcrumbs";
import WalkForm from "~/components/forms/WalkForm";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";

export default async function Walks({
  params,
}: {
  params: Promise<{ collectionId: string; walkId: string }>;
}) {
  const collectionId = Number((await params).collectionId);
  const id = Number((await params).walkId);
  const walk = await api.walk.getById(id);

  if (!walk) {
    return notFound();
  }

  const { name, collection } = walk;

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
            label: name,
          },
        ]}
      />

      <div className="prose mt-6">
        <h1>{name}</h1>
        <WalkForm collectionId={collectionId} walk={walk} />
      </div>
    </>
  );
}
