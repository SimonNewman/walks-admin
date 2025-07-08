import Breadcrumbs from "~/components/Breadcrumbs";
import WalkForm from "~/components/forms/WalkCollectionForm";

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
            label: "Add New",
          },
        ]}
      />

      <div className="prose mt-6">
        <h1>Add New Walk Collection</h1>
        <WalkForm />
      </div>
    </>
  );
}
