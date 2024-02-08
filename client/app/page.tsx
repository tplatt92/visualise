"use client";

import Image from "next/image";
import Link from "next/link";
import { Ovo } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { toast } from "sonner";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

export default function Home() {
	const router = useRouter();
	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const login = async () => {
		try {
			const response = await fetch("http://localhost:8080/users/login", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: usernameInput,
					password: passwordInput,
				}),
			});

			const userData = await response.json();

			console.log(userData);

			if (userData) {
				setCookie("userId", userData.userId, {
					expires: new Date(
						new Date().setFullYear(new Date().getFullYear() + 1)
					),
				});

				setCookie("username", userData.username, {
					expires: new Date(
						new Date().setFullYear(new Date().getFullYear() + 1)
					),
				});

				router.replace("/dashboard");
			} else {
				toast("Error logging in");
			}
		} catch (error) {
			toast("Error logging in", {
				description: `${error}`,
			});
		}
	};

	return (
		<main className="bg-[#090909] h-screen w-full flex">
			<div className="h-full w-1/2 bg-black">
				<Image
					alt="Background image"
					src="/images/login-bg.jpg"
					width={0}
					height={0}
					sizes="50vw"
					className="brightness-50"
					style={{
						width: "100%",
						height: "100%",
						display: "absolute",
						top: "0",
						left: "0",
						zIndex: "100",
					}}
				/>
				<div className="flex items-center justify-center gap-[10px] absolute top-[18px] left-[64px] pb-[5px]">
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
				<div className="absolute flex gap-8 flex-col bottom-[22.5px] left-[64px]">
					<p className={`w-2/5 text-[#FFF5EE] text-[25px] ${ovo.className}`}>
						A graphic representation of data abstracted from the banks of every
						computer in the human system. Unthinkable complexity. Lines of light
						ranged in the nonspace of the mind, clusters and constellations of
						data. Like city lights, receding.
					</p>
					<p className={`text-[#FFF5EE] text-[35px] ${ovo.className}`}>
						William Gibson.
					</p>
				</div>
			</div>
			<Separator orientation="vertical" className="h-screen z-50 shadow-std" />
			<div className="w-1/2 h-screen">
				<div className="absolute right-[64px] top-[36px]">
					<Link href="/create-account">
						<Button variant="outline" className="flex-end rounded">
							Create Account
						</Button>
					</Link>
				</div>
				<div className="h-screen w-full ">
					<div className="flex mt-[30%] gap-4 flex-col justify-center items-center">
						<h2 className={`text-[#FFF5EE] text-[48px] ${ovo.className}`}>
							Log In
						</h2>
						<p className="text-[#FFF5EE] text-[16px] brightness-50 mb-8">
							Enter details below to log in.
						</p>
						<Input
							type="text"
							className="rounded w-[400px]"
							placeholder="Username"
							value={usernameInput}
							onChange={(e) => setUsernameInput(e.target.value)}
						></Input>
						<Input
							type="password"
							className="rounded w-[400px] mb-8"
							placeholder="Password"
							value={passwordInput}
							onChange={(e) => setPasswordInput(e.target.value)}
						></Input>
						{/* <Link href="/dashboard"> */}
						<Button className="rounded w-[400px]" onClick={login}>
							Log In
						</Button>
						{/* </Link> */}
					</div>
				</div>
			</div>
		</main>
	);
}
