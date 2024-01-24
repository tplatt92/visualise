"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

// May need userID when auth is implemented
export type graphData = {
	name: string;
	x: number;
	y: number;
	options: any;
};

console.log(this);

export const columns: ColumnDef<graphData>[] = [
	{
		accessorKey: "entryName",
		header: `Entry Name`,
	},
	{
		accessorKey: "x",
		header: `X Axis`,
	},
	{
		accessorKey: "y",
		header: `Y Axis`,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-4 w-4 p-0">
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={(e) =>
								console.log("ID = " + row.id + " " + row.original)
							}
						>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={(e) =>
								console.log("ID = " + row.id + " " + row.original)
							}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
