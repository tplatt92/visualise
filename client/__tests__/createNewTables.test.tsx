import "@testing-library/jest-dom";
import { Screen, render, screen } from "@testing-library/react";
import CreateNewTable from "@/app/App-Components/CreateNewTable";
import { UserTables } from "@/types/types";

describe('Create New Table', () => {
    it('renders without error', () => {
      render(<CreateNewTable userId={""} data={{
          length: function (length: any): unknown {
              throw new Error("Function not implemented.");
          },
          id: "",
          tableName: undefined,
          entryRowName: undefined,
          xAxisName: undefined,
          yAxisName: undefined,
          payload: [],
          tableData: undefined
      }} handleNewTable={function (data: UserTables, tableObject: any, userId: string): void {
          throw new Error("Function not implemented.");
      } } />)
   
      const heading = screen;
   
      expect(heading).toBeInTheDocument()
    })
  })


