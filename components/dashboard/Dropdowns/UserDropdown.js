import React from "react";
import { createPopper } from "@popperjs/core";
import Link from "next/link";

const UserDropdown = () => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    return (
        <>
            <a
                className="cursor-pointer text-blue-500 block"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <span className="p-2 text-white bg-indigo-400 flex items-center justify-center rounded">
                        {/* <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src="/img/team-1-800x800.jpg"
                        /> */}
                        İsmail Can
                    </span>
                </div>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                }
            >
                <Link href="/profile">
                    <a
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blue-700"
                        }
                        onClick={(e) => e.preventDefault()}
                    >
                        Ayarlar
                    </a>
                </Link>
            </div>
        </>
    );
};

export default UserDropdown;
