import Nav from "../App-Components/Nav";
import Image from "next/image";
import MainPanel from "../App-Components/MainPanel";
import { Ovo } from "next/font/google";
import { Button } from "@/components/ui/button";
import data from "@/data.json";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

type Data = {
	name: string;
	x: number;
	y: number;
	options: any;
};

export default function Dashboard() {
	return (
		<>
			<Nav></Nav>
			{/* <div className="shadow-std w-full h-[1px]"></div> */}
			<main className="px-16 pt-16 w-full">
				<div className="flex items-center justify-between">
					<h1 className={`text-6xl ${ovo.className}`}>Table Name</h1>
					<Button className="flex gap-4 w-[320px] rounded shadow-std">
						Create New Table
						<Image
							alt="add icon"
							width={20}
							height={20}
							src="/images/plus-icon.png"
						></Image>
					</Button>
				</div>
				<div className="pt-4">
					<MainPanel data={data}></MainPanel>
				</div>
			</main>
		</>
	);
}
