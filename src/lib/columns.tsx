"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "~/components/ui/button";

export const walkCollectionsColumns: ColumnDef<{
  id: number;
  name: string;
  link: ReactNode;
}>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link className="no-underline" href={row.getValue("link")}>
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "walks",
    header: "Walks Count",
  },
  {
    accessorKey: "distance",
    header: "Total Distance",
    cell: ({ row }) => (
      <div>
        {row.getValue("distance")} Mile{row.getValue("distance") !== 1 && "s"}
      </div>
    ),
  },
  {
    accessorKey: "link",
    header: "",
    cell: ({ row }) => (
      <div className="text-right">
        <Button asChild size="sm" variant="outline">
          <Link className="no-underline" href={row.getValue("link")}>
            Edit
          </Link>
        </Button>
      </div>
    ),
  },
];

export const walkColumns: ColumnDef<{
  id: number;
  name: string;
}>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link className="no-underline" href={row.getValue("link")}>
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "distance",
    header: "Distance",
    cell: ({ row }) => (
      <div>
        {row.getValue("distance")} Mile{row.getValue("distance") !== 1 && "s"}
      </div>
    ),
  },
  {
    accessorKey: "link",
    header: "",
    cell: ({ row }) => (
      <div className="text-right">
        <Button asChild size="sm">
          <Link className="no-underline" href={row.getValue("link")}>
            Edit
          </Link>
        </Button>
      </div>
    ),
  },
];
