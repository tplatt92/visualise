import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SortType } from "@/types/enums";
import { SortTypeSwitchProps } from "@/types/types";

export default function SortTypeSwitch({ handleSortType }: SortTypeSwitchProps) {
	return (
		<ToggleGroup
			onValueChange={(e) => handleSortType(e)}
			defaultValue={SortType.Date}
			type="single"
		>
			<ToggleGroupItem
				value={SortType.Asc}
				aria-label="Toggle line chart"
				className="rounded"
			>
				ASC
			</ToggleGroupItem>
			<ToggleGroupItem
				value={SortType.Desc}
				aria-label="Toggle line chart"
				className="rounded"
			>
				DESC
			</ToggleGroupItem>
			<ToggleGroupItem
				value={SortType.Date}
				aria-label="Toggle line chart"
				className="rounded"
			>
				DATE
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
