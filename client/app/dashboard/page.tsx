"use client";

import Nav from "../App-Components/Nav";
import MainPanel from "../App-Components/MainPanel";
import { Ovo } from "next/font/google";
import CreateNewTable from "../App-Components/CreateNewTable";
import { useEffect, useState } from "react";
import defaultData from "../../defaultData.json";
import { Payload, UserTables } from "@/types/types";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });


export const userIdJWT = "1";

export default function Dashboard() {
	const [data, setData] = useState<any>(defaultData.data.data.userTables);
	const [selectedTable, setSelectedTable] = useState<UserTables>(data[0]);
	const [userId, setUserId] = useState<string>(userIdJWT);

	async function fetchUserObject() {
		try {
			let fetchUserObject = await fetch(
				`http://localhost:8080/tables/${userId}`
			);

			let userObject = await fetchUserObject.json();
			console.log(userObject);
			if (userObject) {
				setData(await userObject[0].userTables);
				setSelectedTable(await data[0]);
			}
		} catch (error) {
			console.log(error);
		}
	}
	console.log(selectedTable);

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
		setData([...data, tableData.tableData]);
		await fetch(`http://localhost:8080/tables/${userId}`, {
			method: "POST",
			mode: "cors",
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

	async function handleEditRow(
		entryId: string,
		updateObject: {
			entryid: string;
			entryname: string;
			x: number;
			y: number;
		}
	) {
		console.log(updateObject);
		try {
			await fetch(
				`http://localhost:8080/tables/${userId}/${selectedTable.id}/${entryId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateObject),
				}
			);
			let updatedPayload: any = selectedTable.payload;

			for (let i = 0; i < updatedPayload.length; i++) {
				if (updatedPayload[i].entryid === entryId) {
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
			}
		);
	}

	return (
		<>
			<Nav></Nav>
			<main className="px-16 pt-16 w-full">
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
				<div className="pt-4">
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
		</>
	);
}
