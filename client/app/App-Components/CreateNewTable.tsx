import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function CreateNewTable() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-4 w-[320px] rounded shadow-std">
            Create New Table
            <Image
              alt="add icon"
              width={20}
              height={20}
              src="/images/plus-icon.png"
            ></Image>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-black">
          <DialogHeader>
            <DialogTitle>Create New Table</DialogTitle>
            <DialogDescription>
              Create a new table to start visualising your data. Input a table
              name as well as axis and entry labels below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col ">
            <div className="grid flex-1 gap-2">
              <div className="w-full mb-2">
                <Label htmlFor="tablename">Table Name</Label>
                <Input type="text" id="tablename" placeholder="Table Name" />
              </div>

              <Separator />

              <div className="w-full">
                <Label htmlFor="entryname">Entry Name</Label>
                <Input type="text" id="entryname" placeholder="Entry Name" />
              </div>

              <div className="w-full">
                <Label htmlFor="xaxis">X Axis</Label>
                <Input type="text" id="xaxis" placeholder="X Axis" />
              </div>

              <div className="w-full mb-4 ">
                <Label htmlFor="yaxis">Y Axis</Label>
                <Input type="text" id="yaxis" placeholder="Y Axis" />
              </div>
            </div>
            <Button type="submit" className="px-3 self-center w-full">
              <span>Submit</span>
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
