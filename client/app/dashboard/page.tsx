"use client";

import Nav from "../App-Components/Nav";
import MainPanel from "../App-Components/MainPanel";
import { Ovo } from "next/font/google";
import CreateNewTable from "../App-Components/CreateNewTable";
import { useEffect, useState } from "react";
import defaultData from "../../defaultData.json";
import { Payload, UserTables } from "@/types/types";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import MainPanelMob from "../App-Components/MainPanelMob";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

export const userIdJWT: string | (() => string) = getCookie("userId") || "";

export default function Dashboard() {
	const router = useRouter();
	const [data, setData] = useState<any>(defaultData.data.data.userTables);
	const [selectedTable, setSelectedTable] = useState<UserTables>(data[0]);
	const [userId, setUserId] = useState<string | undefined>(userIdJWT || "1");

	async function fetchUserObject() {
		setUserId(getCookie("userId"));
		try {
			let fetchUserObject = await fetch(
				`http://localhost:8080/tables/${userId}`,
				{
					credentials: "include",
				}
			);

			let userObject = await fetchUserObject.json();

			if (userObject) {
				setData(await userObject[0].userTables);
				setSelectedTable(await data[0]);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchUserObject();
	}, []);

	useEffect(() => {
		setSelectedTable(data[data.length - 1]);
	}, [data]);

	async function handleNewTable(
		tableData: any,
		tableObject: any,
		userId: string
	) {
		console.log(userId);
		setData([...data, tableData.tableData]);
		await fetch(`http://localhost:8080/tables/${userId}`, {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(tableObject),
		});
	}

	async function handleNewRow(rowData: any, userId: string, tableId: string) {
		await fetch(`http://localhost:8080/tables/${userId}/${tableId}`, {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(rowData),
		});

		setSelectedTable({
			...selectedTable,
			payload: [...selectedTable.payload, rowData],
		});
	}

	async function handleUpdateSelectedTable(tableId: string) {
		const foundTable = data.find((x: any) => x.id === tableId);
		setSelectedTable(foundTable || data[data.length - 1]);
	}

	async function handleEditRow(updateObject: {
		entryid: number;
		entryname: string;
		x: number;
		y: number;
	}) {
		try {
			console.log(JSON.stringify(updateObject));
			console.log(userId + " " + selectedTable.id + " " + updateObject.entryid);
			await fetch(
				`http://localhost:8080/tables/${userId}/${selectedTable.id}/${updateObject.entryid}`,
				{
					method: "PUT",
					mode: "cors",
					credentials: "include",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json;charset=UTF-8",
					},
					body: JSON.stringify(updateObject),
				}
			);

			let updatedPayload: any = selectedTable.payload;

			for (let i = 0; i < updatedPayload.length; i++) {
				if (updatedPayload[i].entryid === updateObject.entryid) {
					updatedPayload[i] = updateObject;
				}
			}

			setSelectedTable({
				...selectedTable,
				payload: updatedPayload,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDeleteTable() {
		await fetch(`http://localhost:8080/tables/${userId}/${selectedTable.id}`, {
			method: "DELETE",
			credentials: "include",
		});
		setData(data.filter((x: any) => x.id !== selectedTable.id));
		setSelectedTable(data[0]);
	}

	async function handleDeleteRow(rowId: string) {
		let updatedPayload = selectedTable.payload.filter(
			(x: any) => x.entryid != rowId
		);

		setSelectedTable({
			...selectedTable,
			payload: [...updatedPayload],
		});

		await fetch(
			`http://localhost:8080/tables/${userId}/${selectedTable.id}/${rowId}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);
	}

	return (
		<div className="flex flex-col">
			<Nav></Nav>
			<main className="px-4 pt-4 md:px-16 md:pt-16 w-full lg:block flex-col">
				<div className="pt-4 block lg:hidden flex-col">
					<div className="flex flex-col items-center justify-between gap-16">
						<CreateNewTable
							userId={userId}
							data={data}
							handleNewTable={handleNewTable}
						/>
						<h1 className={`text-[#FFF5EE] text-4xl ${ovo.className}`}>
							{selectedTable?.tablename}
						</h1>
					</div>

					<MainPanelMob
						data={data}
						handleUpdateSelectedTable={handleUpdateSelectedTable}
						selectedTable={selectedTable}
						userId={userId}
						handleNewRow={handleNewRow}
						handleDeleteTable={handleDeleteTable}
						handleDeleteRow={handleDeleteRow}
						handleEditRow={handleEditRow}
					></MainPanelMob>
				</div>
				<div className="pt-4 hidden lg:block">
					<div className="flex items-center justify-between">
						<h1 className={`text-[#FFF5EE] text-6xl ${ovo.className}`}>
							{selectedTable?.tablename}
						</h1>
						<CreateNewTable
							userId={userId}
							data={data}
							handleNewTable={handleNewTable}
						/>
					</div>

					<MainPanel
						data={data}
						handleUpdateSelectedTable={handleUpdateSelectedTable}
						selectedTable={selectedTable}
						userId={userId}
						handleNewRow={handleNewRow}
						handleDeleteTable={handleDeleteTable}
						handleDeleteRow={handleDeleteRow}
						handleEditRow={handleEditRow}
					></MainPanel>
				</div>
			</main>
			<footer className="h-8" />
		</div>
	);
}
