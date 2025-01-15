import Breadcrumbs from "~/components/Breadcrumbs";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import WalkForm from "~/components/forms/Walk";

export default async function Walks({
  params,
}: {
  params: Promise<{ walkId: string }>;
}) {
  const id = Number((await params).walkId);
  const walk = await api.walk.getById({ id });

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
        <WalkForm walk={walk} />
      </div>
    </>
  );
}
