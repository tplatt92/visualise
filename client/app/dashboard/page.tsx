"use client";

import Nav from "../App-Components/Nav";
import Image from "next/image";
import MainPanel from "../App-Components/MainPanel";
import { Ovo } from "next/font/google";
import { Button } from "@/components/ui/button";
import data from "@/mockData.json";
import CreateNewTable from "../App-Components/CreateNewTable";
import { useState } from "react";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

type Data = {
	id: string;
	tableName: string;
	entryRowName: string;
	xAxisName: string;
	yAxisName: string;
	payload: { entryName: string; x: number; y: number }[];
};

export default function Dashboard() {
	const [selectedTable, setSelectedTable] = useState<Data>(data[2]);
	// const [tableId, setTableId] = useState<string>("0");

	function handleUpdateTable(tableId: string) {
		console.log(tableId);
		setSelectedTable(data.find((x) => x.id === tableId) || data[0]);
	}

	return (
		<>
			<Nav></Nav>
			{/* <div className="shadow-std w-full h-[1px]"></div> */}
			<main className="px-16 pt-16 w-full">
				<div className="flex items-center justify-between">
					<h1 className={`text-[#FFF5EE] text-6xl ${ovo.className}`}>
						{selectedTable.tableName}
					</h1>
					<CreateNewTable />
				</div>
				<div className="pt-4">
					<MainPanel
						data={data}
						handleUpdateTable={handleUpdateTable}
						selectedTable={selectedTable}
					></MainPanel>
				</div>
			</main>
			<footer className="h-8" />
		</>
	);
}
