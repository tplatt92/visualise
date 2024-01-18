"use client";
import React, { PureComponent } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import data from "@/data.json";

export default class Graph extends PureComponent {
	render() {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 10,
						right: 10,
						left: 10,
						bottom: 10,
					}}
				>
					{/* <CartesianGrid strokeDasharray="3 3" /> */}
					<XAxis dataKey="x" />
					<YAxis />
					<Tooltip />

					<Line
						type="monotone"
						dataKey="y"
						stroke="#DC2626"
						activeDot={{ r: 8 }}
						strokeWidth={3}
					/>
				</LineChart>
			</ResponsiveContainer>
		);
	}
}
