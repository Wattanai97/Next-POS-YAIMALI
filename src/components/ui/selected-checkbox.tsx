import React from "react";
import { Checkbox } from "./checkbox";
interface Prop {
  checkboxitem: { id: string; label: string }[];
  handleCheckboxChange: (id: string, checked: boolean) => void;
  selectedItems: string[];
}
const labelClass =
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
const SelectedCheckbox: React.FC<Prop> = ({
  checkboxitem,
  selectedItems,
  handleCheckboxChange,
}) => {
  return (
    <div className="grid xxs:grid-cols-1 sm:grid-cols-4 gap-x-1 gap-y-0.5 my-2">
      {checkboxitem.map((item, index) => (
        <div key={index} className="flex items-center space-x-1 mx-0.5 my-2">
          <Checkbox
            id={item.id}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(item.id, Boolean(checked))
            }
          />
          <label htmlFor={item.id} className={labelClass}>
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SelectedCheckbox;
