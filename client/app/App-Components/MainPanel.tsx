"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Separator } from "@/components/ui/separator";
import TableInputform from "./TableInputForm";
import Graph from "./Graph";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Data = {
	id: string;
	tableName: string;
	name: string;
	x: number;
	y: number;
	options: any;
	payload: object[];
};

type MainPanelProps = {
	data: Data[];
	handleUpdateTable: (arg0: string) => void;
	selectedTable: any;
};

export default function MainPanel({
	data,
	handleUpdateTable,
	selectedTable,
}: MainPanelProps) {
	const [switchValue, setSwitchValue] = useState<string>("line");

	return (
		<div className="flex gap-12">
			<div className="flex-1">
				<ResizablePanelGroup
					direction="horizontal"
					className="min-h-[772px] max-h-[772px] flex-1 rounded border bg-black shadow-std"
				>
					<ResizablePanel defaultSize={60}>
						<div className="flex h-full items-center justify-center flex-col">
							{/* <div className="flex-1">Graph Element</div> */}
							<div className="pr-8 pt-8 flex-1 w-full">
								<Graph switchValue={switchValue} data={selectedTable}></Graph>
							</div>
							<Separator
								orientation="horizontal"
								className="w-full"
							></Separator>
							<div className="flex justify-between py-4 w-full px-12">
								<div className="h-1"></div>
								<div className="flex item-center gap-2 justify-center">
									<ToggleGroup
										onValueChange={(e) => setSwitchValue(e)}
										defaultValue="line"
										type="single"
									>
										<ToggleGroupItem
											value="line"
											aria-label="Toggle line chart"
											className="rounded-xl"
										>
											<Image
												width={20}
												height={20}
												src="/images/line-chart.png"
												alt="line chart icon"
											></Image>
										</ToggleGroupItem>
										<ToggleGroupItem
											value="bar"
											aria-label="Toggle bar chart"
											className="rounded-xl"
										>
											<Image
												width={20}
												height={20}
												src="/images/bar-chart.png"
												alt="bar chart icon"
												className="mb-1"
											></Image>
										</ToggleGroupItem>
									</ToggleGroup>
								</div>
							</div>
							<Separator
								orientation="horizontal"
								className="w-full"
							></Separator>
							<TableInputform data={selectedTable}></TableInputform>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={40}>
						<div className="flex h-full items-center justify-center">
							<DataTable
								columns={columns}
								data={selectedTable.payload}
								tableHeaders={selectedTable}
							></DataTable>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>{" "}
			</div>
			<div>
				<Select
					onValueChange={(e: any) => {
						handleUpdateTable(e);
					}}
				>
					<SelectTrigger className="w-[320px] border-none">
						<SelectValue placeholder={selectedTable.tableName} />
					</SelectTrigger>
					<SelectContent className="min-h-[726px] shadow-std rounded bg-black">
						{data.map((x) => (
							<SelectItem key={x.id} value={x.id}>
								{x.tableName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
