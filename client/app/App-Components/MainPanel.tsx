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
    <div className="flex gap-28">
      <div className="flex-1">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[572px] max-h-[572px] flex-1 rounded border bg-black shadow-std"
        >
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Graph</span>
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
          <SelectTrigger className="w-[180px] border-none">
            <SelectValue placeholder="Select Table" />
          </SelectTrigger>
          <SelectContent className="min-h-[526px] shadow-std rounded bg-black">
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
