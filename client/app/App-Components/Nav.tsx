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
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

export default function Nav() {
	const router = useRouter();
	const [username, setUserName] = useState("");

	useEffect(() => {
		const username = getCookie("username");
		setUserName(String(username));
	}, []);

	const logout = async () => {
		await fetch("http://localhost:8080/users/logout");
		deleteCookie("username");
		deleteCookie("userId");
		router.push("/");
	};

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
				<div className="flex gap-4 justify-between items-center">
					<p
						className={`text-[#FFF5EE] text-[32px] max-w-[400px] truncate ${ovo.className}`}
					>
						{username}
					</p>
					<DropdownMenu>
						<DropdownMenuTrigger className="text-[#FFF5EE]" asChild>
							<Button variant="outline" className="rounded">
								Menu
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="mr-[62px] rounded">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href="/account-settings">Account Settings</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
			<Separator orientation="horizontal" className="bg-[#262626] "></Separator>
		</div>
	);
}
