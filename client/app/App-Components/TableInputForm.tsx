import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableInputFormProps } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function TableInputForm({
	userId,
	handleNewRow,
	selectedTable,
}: TableInputFormProps) {
	const [entryInput, setEntryInput] = useState<string>();
	const [xInput, setXInput] = useState<string>();
	const [yInput, setYInput] = useState<string>();

	function handleEntryInput(e: any) {
		setEntryInput(e.target.value);
	}

	function handleXInput(e: any) {
		setXInput(e.target.value);
	}

	function handleYInput(e: any) {
		setYInput(e.target.value);
	}

	async function createRow() {
		let rowData = {
			entryid: Number(selectedTable.payload.length),
			entryname: entryInput,
			x: Number(xInput),
			y: Number(yInput),
		};

		if (entryInput == undefined) {
			return toast("Error", {
				description: "Please input an entry name",
			});
		}

		if (xInput == undefined) {
			return toast("Error", {
				description: "Please enter a valid input into the x-axis",
			});
		}

		if (yInput == undefined) {
			return toast("Error", {
				description: "Please enter a valid input into the y-axis",
			});
		}

		try {
			handleNewRow(rowData, userId, selectedTable.id);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="flex flex-col w-full place-self-end p-8">
			<div className="grid w-full items-center gap-1.5">
				<Label className="ml-3" htmlFor="entryname">
					{selectedTable.entryrowname}
				</Label>
				<Input
					type="text"
					id="entryname"
					placeholder={`${selectedTable.entryrowname}`}
					value={entryInput}
					onChange={handleEntryInput}
					className="rounded"
				/>
			</div>

			<div className="flex gap-4 py-4 w-full">
				<div className="w-full">
					<Label className="ml-3" htmlFor="xaxis">
						{selectedTable?.xaxisname}
					</Label>
					<Input
						type="number"
						id="xaxis"
						placeholder={`${selectedTable.xaxisname}`}
						value={xInput}
						onChange={handleXInput}
						className="rounded"
					/>
				</div>

				<div className="w-full">
					<Label className="ml-3" htmlFor="yaxis">
						{selectedTable?.yaxisname}
					</Label>
					<Input
						type="number"
						id="yaxis"
						placeholder={`${selectedTable.yaxisname}`}
						value={yInput}
						onChange={handleYInput}
						className="rounded"
					/>
				</div>
			</div>
			<Button
				className="flex self-center gap-4 rounded w-1/2 min-w-[160px] mb-4"
				onClick={() => createRow()}
			>
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
