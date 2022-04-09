import React, { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";



function AdminSidebar({ handleSidebar, isOpened, selected }) {
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
          class={`relative w-60 mt-4 ${selected == 'users' ? "bg-lime-200 " : null}`}
        >
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-lime-300 transition duration-300 ease-in-out"
            href="/admin"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <UserGroupIcon className="w-8 mx-2" />
            Buyers
          </a>
        </li>
        <li
          class={`relative w-60 mt-4 ${selected == 'sellers' ? "bg-lime-200 " : null}`}
        >
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-lime-300 transition duration-300 ease-in-out"
            href="/adminSellers"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <ShoppingBagIcon className="w-8 mx-2" />
            Sellers
          </a>
        </li>
        <li class={`relative w-60 mt-4 ${selected == 'ads' ? "bg-lime-200" : null}`}>
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-lime-300 transition duration-300 ease-in-out"
            href="/adminAds"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <BadgeCheckIcon className="w-8 mx-2" />
            Advertisements
          </a>
        </li>
        <li class={`relative w-60 mt-4 ${selected == 'reports' ? "bg-lime-200" : null}`}>
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-lime-300 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <QuestionMarkCircleIcon className="w-8 mx-2" />
            Reports
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
