import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

type Props = {
  items: {
    label: string;
    link?: string;
  }[];
};

const Breadcrumbs = ({ items }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map(({ label, link }, key) => (
          <Fragment key={key}>
            <BreadcrumbItem>
              {link && <BreadcrumbLink href={link}>{label}</BreadcrumbLink>}
              {!link && <BreadcrumbPage>{label}</BreadcrumbPage>}
            </BreadcrumbItem>
            {key !== items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
