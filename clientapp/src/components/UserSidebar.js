import React, { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  HandIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import {getUserLevel} from "../Authentication/Auth"

function UserSidebar({ handleSidebar, isOpened, selected }) {
  return (
    <div
      className={` sm:flex sm:opacity-100   w-60 h-screen shadow-md bg-lime-100    pt-20 transition-all ${
        isOpened ? "flex" : "opacity-0 hidden"
      }`}
    >
      <ul class="relative">
        <ArrowLeftIcon
          className="w-10 mx-4  sm:hidden"
          onClick={() => {
            handleSidebar();
          }}
        />

        <li
          class={`relative w-60 mt-4 ${selected == 'offers' ? "bg-lime-200 " : null}`}
        >
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-lime-300 transition duration-300 ease-in-out"
            href={getUserLevel()== "Seller" ? "offers" :"offersBuyer"}
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <HandIcon className="w-8 mx-2" />
            Offers
          </a>
        </li>
        <li
          class={`relative w-60 mt-4 ${selected == 'bids' ? "bg-lime-200 " : null}`}
        >
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-lime-300 transition duration-300 ease-in-out"
            href="/bids"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <ShoppingBagIcon className="w-8 mx-2" />
            Bids
          </a>
        </li>
      
      </ul>
    </div>
  );
}

export default UserSidebar;
