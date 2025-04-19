import React, { useState } from "react";
import { FilterType } from "@/lib/store/useProductFilterTypeStore";
import { useFilterProductByType } from "@/lib/store/useProductFilterTypeStore";
const Selectbuttontype = () => {
  const [activeButton, setActiveButton] = useState<FilterType>("All");
  const { setFilterType } = useFilterProductByType();
  const handleClickActiveButton = (type: FilterType) => {
    setActiveButton(type);
    setFilterType(type);
  };
  return (
    <>
      <div className="xxs:container xxs:mx-auto mt-2.5 mx-2.5">
        {(["All", "Foods", "Drinks"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleClickActiveButton(type)}
            className={`xxs:px-2 xxs:py-0.5 py mx-0.5 py-1 bg-slate-700 text-white dark:bg-slate-950 dark:text-white rounded-md transition-all
            ${
              activeButton === type
                ? "bg-opacity-10 dark:bg-opacity-50 shadow-inner text-slate-900 dark:text-white shadow-cyan-500/100 dark:shadow-cyan-200/100 underline decoration-black dark:decoration-white"
                : "bg-opacity-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </>
  );
};

export default Selectbuttontype;
