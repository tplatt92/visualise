"use client";
import { GraphProps, Payload } from "@/types/types";
import {
	BarChart,
	Bar,
	Rectangle,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { SortType, GraphType } from "@/types/enums";

export default function Graph({
	selectedTable,
	graphType,
	sortType,
}: GraphProps) {
	if (sortType === SortType.Date) {
		selectedTable.payload = [
			...selectedTable.payload.sort((a: any, b: any) => a.entryid - b.entryid),
		];
	} else if (sortType === SortType.Asc) {
		selectedTable.payload = [
			...selectedTable.payload.sort((a: any, b: any) => a.y - b.y),
		];
	} else if (sortType === SortType.Desc) {
		selectedTable.payload = [
			...selectedTable.payload.sort((a: any, b: any) => b.y - a.y),
		];
	}

	return (
		<ResponsiveContainer width="100%" height="100%">
			{graphType === GraphType.Bar ? (
				<BarChart
					width={500}
					height={300}
					data={selectedTable.payload}
					margin={{
						top: 10,
						right: 10,
						left: 10,
						bottom: 10,
					}}
				>
					<XAxis dataKey="x" />
					<YAxis />
					{/* <Tooltip
						wrapperStyle={{
							padding: "5px",
							width: 120,
							backgroundColor: "grey",
							color: "#DC2626",
							opacity: "0.80",
							borderRadius: "5px",
						}}
					/> */}
					<Bar
						dataKey="y"
						fill="#DC2626"
						activeBar={<Rectangle fill="#771515" stroke="#771515" />}
					/>
				</BarChart>
			) : (
				<LineChart
					width={500}
					height={300}
					data={selectedTable.payload}
					margin={{
						top: 10,
						right: 10,
						left: 10,
						bottom: 10,
					}}
				>
					<XAxis dataKey="x" />
					<YAxis dataKey="y" />
					{/* <Tooltip
						wrapperStyle={{
							padding: "5px",
							width: 120,
							backgroundColor: "grey",
							color: "#DC2626",
							opacity: "0.80",
							borderRadius: "5px",
						}}
					/> */}

					<Line
						type="monotone"
						dataKey="y"
						stroke="#DC2626"
						activeDot={{ r: 8 }}
						strokeWidth={3}
					/>
				</LineChart>
			)}
		</ResponsiveContainer>
	);
}
