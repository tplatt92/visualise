import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TablePanelProps, HeaderProps, RowProps, Payload } from "@/types/types";

export default function TablePanel({
	selectedTable,
	handleDeleteRow,
	handleEditRow,
}: TablePanelProps) {
	return (
		<div className="flex-col w-full h-full items-start justify-start">
			<Header
				rowName={selectedTable.entryrowname}
				xAxisName={selectedTable.xaxisname}
				yAxisName={selectedTable.yaxisname}
			/>
			<Separator />
			<ScrollArea className=" h-[732px]  rounded-md border">
				{selectedTable.payload.map(({ entryid, entryname, x, y }) => (
					<Row
						key={entryid}
						entryId={entryid}
						entryName={entryname}
						xAxisRow={x}
						yAxisRow={y}
						handleDeleteRow={handleDeleteRow}
						selectedTable={selectedTable}
						handleEditRow={handleEditRow}
					/>
				))}
			</ScrollArea>
		</div>
	);
}

function Header({ rowName, xAxisName, yAxisName }: HeaderProps) {
	return (
		<div className="flex w-full h-8 mx-4 my-2 items-center justify-center brightness-[.6]">
			<p className="w-[40%]">{rowName}</p>
			<p className="w-[25%]">{xAxisName}</p>
			<p className="w-[25%]">{yAxisName}</p>
			<div className="w-[10%]"></div>
		</div>
	);
}

function Row({
	entryId,
	entryName,
	xAxisRow,
	yAxisRow,
	handleDeleteRow,
	selectedTable,
	handleEditRow,
}: RowProps) {
	const [triggerEditDeleteInfo, setTriggerEditDeleteInfo] = useState<string>();
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [editEntryNameValue, setEditEntryNameValue] =
		useState<string>(entryName);
	const [editXAxisValue, setEditXAxisValue] = useState<string>(xAxisRow);
	const [editYAxisValue, setEditYAxisValue] = useState<string>(yAxisRow);

	const [updateObject, setUpdateObject] = useState({
		entryid: entryId,
		entryname: editEntryNameValue,
		x: Number(editXAxisValue),
		y: Number(editYAxisValue),
	});

	useEffect(() => {
		setEditEntryNameValue(entryName);
		setEditXAxisValue(xAxisRow);
		setEditYAxisValue(yAxisRow);
		setUpdateObject({
			entryid: entryId,
			entryname: editEntryNameValue,
			x: Number(editXAxisValue),
			y: Number(editYAxisValue),
		});
	}, [selectedTable]);

	useEffect(() => {
		setUpdateObject({
			entryid: entryId,
			entryname: editEntryNameValue,
			x: Number(editXAxisValue),
			y: Number(editYAxisValue),
		});
	}, [editEntryNameValue, editXAxisValue, editYAxisValue]);

	return (
		<div key={entryId} className="hover:bg-neutral-900 h-full">
			<div className="flex flex-row w-full h-8 font-[200] justify-center items-center m-4">
				<p className="w-[40%]">{entryName}</p>
				<p className="w-[25%]">{xAxisRow}</p>
				<p className="w-[25%]">{yAxisRow}</p>
				<div className="w-[10%] min-w-8">
					<Dialog open={menuOpen}>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-4 w-4 p-0">
									<span className="sr-only">Open menu</span>
									<DotsHorizontalIcon className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="rounded">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DialogTrigger asChild>
									<DropdownMenuItem
										onClick={() => {
											setTriggerEditDeleteInfo("edit"), setMenuOpen(true);
										}}
									>
										<div className="flex flex-row w-full justify-between items-center">
											Edit
											<Image
												alt="x"
												width={15}
												height={15}
												className="h-4 w-4"
												src="/images/edit-icon.png"
											/>
										</div>
									</DropdownMenuItem>
								</DialogTrigger>
								<DialogTrigger asChild>
									<DropdownMenuItem
										onClick={() => {
											setTriggerEditDeleteInfo("delete"), setMenuOpen(true);
										}}
									>
										<div className="flex flex-row w-full justify-between items-center">
											Delete
											<Image
												alt="x"
												width={15}
												height={15}
												className="h-4 w-4"
												src="/images/delete-icon.png"
											/>
										</div>
									</DropdownMenuItem>
								</DialogTrigger>
							</DropdownMenuContent>
						</DropdownMenu>
						{triggerEditDeleteInfo === "edit" ? (
							<DialogContent className="bg-black rounded max-w-[400px]">
								<DialogHeader>
									<DialogTitle>Edit</DialogTitle>
									<DialogDescription>Edit row entry below.</DialogDescription>
								</DialogHeader>
								<div className="flex flex-col gap-4">
									<div className="w-full">
										<Label htmlFor="entryname">
											{selectedTable.entryrowname}
										</Label>
										<Input
											type="text"
											id="entryname"
											placeholder={`${selectedTable.entryrowname}`}
											value={editEntryNameValue}
											onChange={(e) => setEditEntryNameValue(e.target.value)}
											className="rounded"
										/>
									</div>
									<div className="w-full">
										<Label htmlFor="xAxis">{selectedTable.xaxisname}</Label>
										<Input
											type="number"
											id="xAxis"
											placeholder={`${selectedTable.xaxisname}`}
											value={editXAxisValue}
											onChange={(e: React.FormEvent<HTMLInputElement>) =>
												setEditXAxisValue(e.currentTarget.value)
											}
											className="rounded"
										/>
									</div>
									<div className="w-full">
										<Label htmlFor="yAxis">{selectedTable.yaxisname}</Label>
										<Input
											type="number"
											id="yAxis"
											placeholder={`${selectedTable.yaxisname}`}
											value={editYAxisValue}
											onChange={(e: React.FormEvent<HTMLInputElement>) =>
												setEditYAxisValue(e.currentTarget.value)
											}
											className="rounded"
										/>
									</div>
								</div>
								<DialogFooter className="w-full">
									<div className="flex flex-col w-full gap-4">
										<Button
											type="submit"
											className="rounded"
											onClick={() => {
												handleEditRow(entryId, updateObject),
													setMenuOpen(false);
											}}
										>
											Confirm
										</Button>
										<Button
											variant="ghost"
											type="submit"
											className="rounded w-full"
											onClick={() => {
												setMenuOpen(false);
											}}
										>
											Cancel
										</Button>
									</div>
								</DialogFooter>
							</DialogContent>
						) : (
							<DialogContent className="bg-black rounded w-[300px] flex flex-col">
								<DialogHeader>
									<DialogTitle>Are you sure?</DialogTitle>
									<DialogDescription>
										This action cannot be undone.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter className="w-full">
									<div className="w-full flex flex-col gap-4">
										<Button
											type="submit"
											className="rounded w-full"
											onClick={() => {
												handleDeleteRow(entryId), setMenuOpen(false);
											}}
										>
											Delete Row
										</Button>
										<Button
											variant="ghost"
											type="submit"
											className="rounded w-full"
											onClick={() => {
												setMenuOpen(false);
											}}
										>
											Cancel
										</Button>
									</div>
								</DialogFooter>
							</DialogContent>
						)}
					</Dialog>
				</div>
			</div>
		</div>
	);
}
