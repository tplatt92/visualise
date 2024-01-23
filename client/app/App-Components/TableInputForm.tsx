import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function TableInputform({ data }) {
	return (
		<div className="flex flex-col w-full place-self-end p-8">
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="entryname">{data.entryRowName}</Label>
				<Input
					type="text"
					id="entryname"
					placeholder={`${data.entryRowName}`}
				/>
			</div>

			<div className="flex gap-4 py-4 w-full">
				<div className="w-full">
					<Label htmlFor="xaxis">{data.xAxisName}</Label>
					<Input type="text" id="xaxis" placeholder={`${data.xAxisName}`} />
				</div>

				<div className="w-full">
					<Label htmlFor="yaxis">{data.yAxisName}</Label>
					<Input type="text" id="yaxis" placeholder={`${data.yAxisName}`} />
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
