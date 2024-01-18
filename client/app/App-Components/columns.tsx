"use client";

import { ColumnDef } from "@tanstack/react-table";

// May need userID when auth is implemented
export type graphData = {
  name: string;
  x: number;
  y: number;
  options: any;
};

export const columns: ColumnDef<graphData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "x",
    header: "X Axis",
  },
  {
    accessorKey: "y",
    header: "Y Axis",
  },
  {
    accessorKey: "options",
    header: "Options",
  },
];
