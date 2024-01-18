import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function TableInputform() {
	return (
		<div className="flex flex-col w-full place-self-end p-8">
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="entryname">Entry Name</Label>
				<Input type="text" id="entryname" placeholder="Entry Name" />
			</div>

			<div className="flex gap-4 py-4 w-full">
				<div className="w-full">
					<Label htmlFor="xaxis">X Axis</Label>
					<Input type="text" id="xaxis" placeholder="X Axis" />
				</div>

				<div className="w-full">
					<Label htmlFor="yaxis">Y Axis</Label>
					<Input type="text" id="yaxis" placeholder="Y Axis" />
				</div>
			</div>
			<Button className="flex self-center gap-4 rounded w-1/2">
				Create New Item
				<Image
					alt="add icon"
					width={20}
					height={20}
					src="/images/plus-icon.png"
				></Image>
			</Button>
		</div>
	);
}
