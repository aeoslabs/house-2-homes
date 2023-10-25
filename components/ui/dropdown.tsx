import { cormorant, poppins } from "@/app/fonts";
import { selectionDB } from "@/utils/data";
import { classNames } from "@/utils/helpers";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Fragment, useState } from "react";

type DropDownProps = {
  state: string;
  setState: (newState: string) => void;
  image?: string;
  selectedImg?: string;
  itemList: string[] | null;
  imageList?: string[];
  pallete?: any | null;
  palleteList?: any[] | null;
  onClick?: (item: string) => void;
};

function DropDown({
  state,
  selectedImg,
  setState,
  itemList,
  imageList,
  palleteList = null,
  pallete = null,
  onClick = () => {},
}: DropDownProps) {
  return (
    <Menu
      as="div"
      className={`${poppins.className} relative block text-left font-thin`}
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          <div className="flex gap-2 items-center">
            {pallete ? (
              pallete
            ) : (
              <img
                src={selectedImg ?? "/base.png"}
                className="w-10 h-10 object-cover rounded-sm"
              />
            )}{" "}
            {state}
          </div>
          {true ? (
            <ChevronUpIcon
              className="mr-3 ml-2 h-6 w-6 text-thin"
              aria-hidden="true"
              strokeWidth={1}
            />
          ) : (
            <ChevronDownIcon
              className="mr-3 ml-2 h-6 w-6"
              aria-hidden="true"
              strokeWidth={1}
            />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute max-h-60 overflow-y-scroll left-0 z-10 mt-2 w-full origin-top-right  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={state}
        >
          <div className="">
            {itemList?.map((themeItem, index) => (
              <Menu.Item key={themeItem}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setState(themeItem);
                      onClick(themeItem);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      themeItem === state ? "bg-gray-200" : "",
                      "p-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <div className="flex gap-2 items-center">
                      {palleteList?.[index] ? (
                        palleteList[index]
                      ) : (
                        <img
                          src={
                            imageList?.[index] ? imageList[index] : "/base.png"
                          }
                          className="w-10 h-10 object-cover rounded-sm"
                        />
                      )}
                      <span>{themeItem}</span>
                    </div>

                    {themeItem === state ? (
                      <CheckIcon className="w-8 h-8 pr-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropDown;
