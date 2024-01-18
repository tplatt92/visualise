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

type Data = {
	name: string;
	x: number;
	y: number;
	options: any;
};

type MainPanelProps = {
	data: Data[];
};

export default function MainPanel({ data }: MainPanelProps) {
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
								<Graph></Graph>
							</div>
							<Separator
								orientation="horizontal"
								className="w-full"
							></Separator>
							<TableInputform></TableInputform>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={40}>
						<div className="flex h-full items-center justify-center">
							<DataTable columns={columns} data={data}></DataTable>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>{" "}
			</div>
			<div>
				<Select>
					<SelectTrigger className="w-[320px] border-none">
						<SelectValue placeholder="Select Table" />
					</SelectTrigger>
					<SelectContent className="min-h-[726px] shadow-std rounded bg-black">
						<SelectItem value="light">Table 1</SelectItem>
						<SelectItem value="dark">Table 2</SelectItem>
						<SelectItem value="3">Table 3</SelectItem>
						<SelectItem value="4">Table 4</SelectItem>
						<SelectItem value="5">Table 5</SelectItem>
						<SelectItem value="6">Table 6</SelectItem>
						<SelectItem value="7">Table 7</SelectItem>
						<SelectItem value="8">Table 8</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
