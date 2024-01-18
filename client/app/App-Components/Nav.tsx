import Image from "next/image";
import { Ovo } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

export default function Nav() {
	return (
		<div>
			<nav className="w-full flex h-[95px] bg-black px-[64px] p-[32px] items-center justify-between z-50 shadow-std">
				<div className="flex items-center justify-center gap-[10px]">
					<Image
						alt="visualise logo"
						height={45}
						width={45}
						src="/images/visualise-logo.png"
						className="h-[45px] w-[45px] pb-[5px]"
					/>
					<h1 className={`text-[#FFF5EE] text-[40px] ${ovo.className}`}>
						Visualise
					</h1>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className="text-[#FFF5EE]" asChild>
						<Button variant="outline">Menu</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mr-[62px]">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Account Settings</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/">Sign Out</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>
			<Separator orientation="horizontal" className="bg-[#262626] "></Separator>
		</div>
	);
}
