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
import { Separator } from "@/components/ui/separator";
import TableInputForm from "./TableInputForm";
import Graph from "./Graph";
import {
	JSXElementConstructor,
	Key,
	PromiseLikeOfReactNode,
	ReactElement,
	ReactNode,
	ReactPortal,
	useState,
} from "react";
import GraphTypeSwitchAndDelete from "./GraphTypeSwitchAndDelete";
import SortTypeSwitch from "./SortTypeSwitch";
import TablePanel from "./TablePanel";
import { MainPanelProps } from "@/types/types";
import { GraphType, SortType } from "@/types/enums";

export default function MainPanelMob({
	data,
	handleUpdateSelectedTable,
	selectedTable,
	userId,
	handleNewRow,
	handleDeleteTable,
	handleDeleteRow,
	handleEditRow,
}: MainPanelProps) {
	const [graphType, setGraphType] = useState("line");
	const [sortType, setSortType] = useState("date");

	function handleSortType(sortType: SortType | string) {
		setSortType(sortType);
	}

	function handleGraphType(switchVal: GraphType | string) {
		setGraphType(switchVal);
	}

	return (
		<div className="flex flex-col gap-12 mt-8">
			<div>
				<Select
					onValueChange={(e: any) => {
						handleUpdateSelectedTable(e);
					}}
				>
					<SelectTrigger className="w-full min-w-full border-none">
						<SelectValue placeholder={selectedTable.tablename} />
					</SelectTrigger>
					<SelectContent className="min-h-[726px] max-w-[320px] w-[320px] shadow-std rounded bg-black">
						{data.map((x: { id: string; tablename: string }) => (
							<SelectItem key={x.id} value={String(x.id)}>
								<div className="flex max-w-[300px] w-[300px] justify-between">
									{x.tablename}
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className=" flex flex-1">
				<ResizablePanelGroup
					direction="vertical"
					className="min-h-[1272px] max-h-[1272px] flex-1 rounded border bg-black shadow-std"
				>
					<ResizablePanel defaultSize={60}>
						<div className="flex h-full items-center justify-center flex-col">
							<div className="pr-8 pt-8 flex-1 w-full">
								<Graph
									graphType={graphType}
									selectedTable={selectedTable}
									sortType={sortType}
								></Graph>
							</div>
							<Separator
								orientation="horizontal"
								className="w-full"
							></Separator>
							<div className="flex justify-between py-4 w-full px-4">
								<div className="h-1"></div>
								<div className="flex w-full flex-col item-between justify-between gap-2">
									<SortTypeSwitch handleSortType={handleSortType} />
									<GraphTypeSwitchAndDelete
										handleDeleteTable={handleDeleteTable}
										handleGraphType={handleGraphType}
									/>
								</div>
							</div>
							<Separator
								orientation="horizontal"
								className="w-full"
							></Separator>
							<TableInputForm
								selectedTable={selectedTable}
								userId={userId}
								handleNewRow={handleNewRow}
							></TableInputForm>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={40}>
						<div className="flex h-full items-center justify-center">
							<TablePanel
								handleEditRow={handleEditRow}
								selectedTable={selectedTable}
								handleDeleteRow={handleDeleteRow}
							/>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>{" "}
			</div>
		</div>
	);
}
