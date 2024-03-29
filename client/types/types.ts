import { GraphType, SortType } from "./enums";

export type UserObject = {
	userId: string;
	userTables: UserTables;
	map: (arg1: any) => any;
};

export type UserTables = {
	length(length: any): unknown;
	id: string;
	tablename: string | undefined;
	entryrowname: string | undefined;
	xaxisname: string | undefined;
	yaxisname: string | undefined;
	payload: Payload[] | Payload | [];
	tableData?: UserTables;
};

export type Payload = {
	entryid?: number;
	entryname?: string;
	x?: number;
	y?: number;
	length?: () => number;
	map: () => any;
	sort?: () => any;
	filter: () => any;
};

export type MainPanelProps = {
	data: UserObject;
	handleUpdateSelectedTable: any;
	selectedTable: UserTables;
	userId: string;
	handleNewRow: (rowData: any, userId: string, tableId: string) => void;
	handleDeleteTable: () => void;
	handleDeleteRow: (rowId: string) => void;
	handleEditRow: (updateObject: {
		entryid: number;
		entryname: string;
		x: number;
		y: number;
	}) => Promise<void>;
};

export type CreateNewTableProps = {
	userId: string;
	data: UserTables;
	handleNewTable: (data: UserTables, tableObject: any, userId: string) => void;
};

export type GraphProps = {
	selectedTable: any;
	graphType: GraphType | string;
	sortType: SortType | string;
};

export type GraphTypeSwitchAndDeleteProps = {
	handleGraphType: (switchVal: GraphType | string) => void;
	handleDeleteTable: () => void;
};

export type SortTypeSwitchProps = {
	handleSortType: (sortType: SortType | string) => void;
};

export type TableInputFormProps = {
	userId: string;
	handleNewRow: (rowData: any, userId: string, tableId: string) => void;
	selectedTable: UserTables;
};

export type TablePanelProps = {
	selectedTable: UserTables;
	handleDeleteRow: (rowId: string) => void;
	handleEditRow: (
		entryId: string,
		updateObject: {
			entryid: string;
			entryname: string;
			x: number;
			y: number;
		}
	) => void;
};

export type HeaderProps = {
	rowName: string | undefined;
	xAxisName: string | undefined;
	yAxisName: string | undefined;
};

export type RowProps = {
	entryId: any;
	entryName: any;
	xAxisRow: any;
	yAxisRow: any;
	handleDeleteRow: (rowId: string) => void;
	selectedTable: UserTables;
	handleEditRow: any;
};
