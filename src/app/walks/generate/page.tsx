import Breadcrumbs from "~/components/Breadcrumbs";
import GenerateWalkCollectionForm from "~/components/forms/GenerateWalkCollectionForm";

export default async function CreateWalkPage() {
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
            label: "Generate",
          },
        ]}
      />

      <div className="prose mt-6">
        <h1>Generate Walk Collection</h1>
        <GenerateWalkCollectionForm />
      </div>
    </>
  );
}
