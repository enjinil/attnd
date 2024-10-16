import { clsx } from "clsx";
import { useCombobox } from "downshift";
import { useFormContext } from "react-hook-form";

type SelectProps = {
  items: { value: string; text: string }[];
  name: string;
  placeholder?: string;
};

const Select = ({ items, placeholder, name }: SelectProps) => {
  const { watch, register } = useFormContext();
  const value = watch(name).toString();
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
  } = useCombobox({
    items,
    itemToString: (item) => (item ? item.value : ""),
    initialInputValue: value,
    initialSelectedItem: items.find((item) => item.value === value),
  });

  return (
    <div className="relative">
      <div className="flex items-center justify-between cursor-pointer text-gray-700">
        <input
          placeholder={placeholder || ""}
          className="w-full pl-3 bg-white border h-8 mb-1 border-gray-300 focus:ring-2"
          {...getInputProps({ ...register(name) })}
          readOnly
        />
        <div className="absolute pl-3 leading-[30px] bg-white top-[1px] right-[1px] left-[1px] h-[30px] pointer-events-none">
          {selectedItem?.text}
        </div>
        <span
          className="absolute right-0 top-0 h-8 px-2 flex items-center"
          {...getToggleButtonProps()}
        >
          {isOpen ? <>&#8593;</> : <>&#8595;</>}
        </span>
      </div>
      <ul
        className={clsx(
          `absolute w-full bg-white mt-1 border border-slate-200 shadow-sm max-h-80 overflow-scroll p-1 z-10 rounded overflow-hidden`,
          !isOpen && "hidden"
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={clsx(
                highlightedIndex === index
                  ? "bg-blue-200 text-slate-900"
                  : "text-slate-800",
                selectedItem === item && "font-bold",
                selectedItem === item &&
                  highlightedIndex !== index &&
                  "bg-slate-100",
                "py-1 px-2 flex flex-col rounded cursor-pointer"
              )}
              key={item.value}
              {...getItemProps({ item, index })}
            >
              <span>{item.text || item.value}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Select };
