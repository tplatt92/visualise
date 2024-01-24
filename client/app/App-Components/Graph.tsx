"use client";
import React from "react";
import {
	BarChart,
	Bar,
	Rectangle,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

type Data = {
	id: string;
	tableName: string;
	name: string;
	x: number;
	y: number;
	options: any;
	payload: object[];
};

export default function Graph({ data, switchValue }) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			{switchValue === "bar" ? (
				<BarChart
					width={500}
					height={300}
					data={data.payload}
					margin={{
						top: 10,
						right: 10,
						left: 10,
						bottom: 10,
					}}
				>
					<XAxis dataKey="x" />
					<YAxis />
					<Tooltip
						wrapperStyle={{
							padding: "5px",
							width: 120,
							backgroundColor: "grey",
							color: "#DC2626",
							opacity: "0.80",
							borderRadius: "5px",
						}}
					/>
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
					data={data.payload}
					margin={{
						top: 10,
						right: 10,
						left: 10,
						bottom: 10,
					}}
				>
					<XAxis dataKey="x" />
					<YAxis dataKey="y" />
					<Tooltip
						wrapperStyle={{
							padding: "5px",
							width: 120,
							backgroundColor: "grey",
							color: "#DC2626",
							opacity: "0.80",
							borderRadius: "5px",
						}}
					/>

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
