import clsx from "clsx";
import Downshift, { DownshiftProps } from "downshift";
import { Spinner } from "@/components/ui/spinner";

interface SelectProps extends DownshiftProps<any> {
  items: {
    value: string;
    label: string;
  }[];
  label?: string;
  isPending?: boolean;
}

export function Select({
  items,
  isPending,
  selectedItem,
  id,
  label,
  initialSelectedItem,
  onChange,
  itemToString,
}: SelectProps) {
  return (
    <Downshift
      id={id}
      selectedItem={selectedItem}
      initialSelectedItem={initialSelectedItem}
      onChange={onChange}
      itemToString={itemToString}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        toggleMenu,
      }) => (
        <div className="flex flex-col justify-end relative">
          <label
            className="mb-2 block subpixel-antialiased text-small group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5 group-data-[invalid=true]:text-danger w-full text-foreground"
            {...getLabelProps()}
          >
            {label}
          </label>
          <div
            className="flex"
            {...getRootProps({}, { suppressRefError: true })}
          >
            <input
              placeholder="Selecione a rodada"
              className={clsx(
                "placeholder-text-foreground-500 rounded-l-md  text-black font-normal w-full text-start text-small truncate group-data-[has-value=true]:text-default-foreground relative px-3 gap-3 inline-flex",
                "flex-row items-center tap-highlight-transparent group-data-[focus=true]:bg-default-50 h-10 min-h-10 bg-white border border-zinc-200 border-r-0 data-[hover=true]:bg-default-50 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
              )}
              onFocus={() => toggleMenu()}
              {...getInputProps()}
            />
            <button
              className="w-5 h-10 flex items-center justify-center bg-white border border-l-0 border-zinc-200 rounded-r-md"
              onClick={() => toggleMenu()}
            >
              {isPending ? (
                <Spinner className="!h-3 !w-3  mr-3" />
              ) : (
                <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  role="presentation"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="1em"
                  data-slot="selectorIcon"
                  data-open={isOpen}
                  className={clsx({
                    "absolute end-3 w-4 h-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180":
                      true,
                  })}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              )}
            </button>
          </div>
          <ul
            className={clsx({
              "absolute top-[86px] p-2 w-full bg-white shadow-lg rounded-2xl z-20 max-h-80 overflow-y-scroll duration-250":
                true,
              "invisible opacity-0 pointer-events-none -translate-y-2": !isOpen,
              "visible opacity-1 pointer-events-auto translate-y-0": isOpen,
            })}
            {...getMenuProps()}
          >
            {items.map((item, index) => (
              <li
                {...getItemProps({
                  key: item.value,
                  index,
                  item,
                })}
                key={item.value}
                className={clsx({
                  "hover:bg-gray-100 text-zinc-900 flex group gap-2 items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-small subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 data-[hover=true]:transition-colors data-[hover=true]:bg-default data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-default data-[selectable=true]:focus:text-default-foreground flex-1 text-small font-normal":
                    true,
                  "bg-gray-200": item.value === selectedItem?.value,
                })}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
}
