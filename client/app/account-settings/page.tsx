"use client";

import Image from "next/image";
import Link from "next/link";
import { Ovo } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
const ovo = Ovo({ subsets: ["latin"], weight: "400" });

export default function Home() {
	const router = useRouter();
	const [username, setUserName] = useState("");
	const [passwordInput, setPasswordInput] = useState();
	const [newPasswordInput, setNewPasswordInput] = useState();
	const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState();
	const [deleteDialog, setDeleteDialog] = useState(false);

	useEffect(() => {
		const username = getCookie("username");
		setUserName(String(username));
	}, []);

	async function updatePassword() {
		if (newPasswordInput != confirmNewPasswordInput) {
			return toast("New passwords do not match");
		}

		try {
			await fetch("http://localhost:8080/users/updatePassword", {
				method: "POST",
				mode: "cors",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				body: JSON.stringify({
					username: username,
					currentPassword: passwordInput,
					newPassword: newPasswordInput,
				}),
			});

			toast("Password updated successfully");
			setPasswordInput(undefined);
			setNewPasswordInput(undefined);
			setConfirmNewPasswordInput(undefined);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteAccount() {
		try {
			await fetch("http://localhost:8080/users/deleteAccount", {
				method: "POST",
				mode: "cors",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				body: JSON.stringify({
					username: username,
				}),
			});

			toast("Account deleted successfully");
			router.replace("/");
		} catch (error) {
			console.log(error);
		}
	}

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
				<div className="absolute w-[50%] flex gap-8 flex-col bottom-[22.5px] left-[64px]">
					<p className={`w-4/5 text-[#FFF5EE] text-[25px] ${ovo.className}`}>
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
					<Link href="/dashboard">
						<Button variant="outline" className="flex-end" className="rounded">
							Back to Dashboard
						</Button>
					</Link>
				</div>
				<div className="h-screen w-full ">
					<div className="flex mt-[20%] gap-4 flex-col justify-center items-center">
						<h2 className={`text-[#FFF5EE] text-[48px] ${ovo.className}`}>
							Account Settings
						</h2>
						<p className="text-[#FFF5EE] text-[16px] brightness-50 mb-8">
							Update password below.
						</p>
						<div>
							<Label className="pl-3">Current Password</Label>
							<Input
								type="password"
								className="rounded w-[400px]"
								placeholder="Current Password"
								value={passwordInput}
								onChange={(e) => setPasswordInput(e.target.value)}
							></Input>
						</div>
						<div>
							<Label className="pl-3">New Password</Label>
							<Input
								type="password"
								className="rounded w-[400px]"
								placeholder="New Password"
								value={newPasswordInput}
								onChange={(e) => setNewPasswordInput(e.target.value)}
							></Input>
						</div>
						<div>
							<Label className="pl-3">Confirm New Password</Label>
							<Input
								type="password"
								className="rounded w-[400px] mb-8"
								placeholder="Confirm Password"
								value={confirmNewPasswordInput}
								onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
							></Input>
						</div>

						<Button className="rounded w-[400px] " onClick={updatePassword}>
							Update Password
						</Button>
						<h2 className={`text-[#FFF5EE] text-[48px] mt-20 ${ovo.className}`}>
							Delete Account
						</h2>

						<Dialog open={deleteDialog}>
							<DialogTrigger asChild>
								<Button
									className="rounded w-[400px] "
									variant="destructive"
									onClick={() => setDeleteDialog(true)}
								>
									Delete Account
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px] bg-black">
								<DialogHeader className="flex justify-center items-center">
									<DialogTitle>Are you sure?</DialogTitle>
									<DialogDescription>This cannot be undone.</DialogDescription>
								</DialogHeader>

								<DialogFooter>
									<div className="flex w-full flex-col gap-4 mt-8">
										<Button
											type="submit"
											variant="destructive"
											onClick={deleteAccount}
											className="rounded"
										>
											Confirm
										</Button>
										<Button
											type="submit"
											variant="ghost"
											onClick={() => setDeleteDialog(false)}
											className="rounded"
										>
											Cancel
										</Button>
									</div>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</main>
	);
}
