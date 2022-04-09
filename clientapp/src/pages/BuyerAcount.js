import { ScaleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import AdminSidebar from "../components/AdminSidebar";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@heroicons/react/solid";

const styles = {
  detailName: "text-xl font-medium col-span-3",
  detailValue: "text-lg col-span-2 text-gray-600",
};

function BuyerAccount() {
  const [isOpened, setIsOpened] = useState(false);
  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div className="h-screen flex">
      <AdminSidebar
        handleSidebar={handleSidebar}
        isOpened={isOpened}
        selected="users"
      />
      <div className="flex-1 flex overflow-hidden pt-20 ">
        <div class="flex-1 overflow-y-scroll">
          <ArrowRightIcon
            className={`w-10 ml-4 ${isOpened ? "hidden" : " md:hidden"}`}
            onClick={handleSidebar}
          />
          <h3 className="ml-8 text-xl font-semibold mb-4">
            Activate Buyer Account
          </h3>
          <main class="flex flex-col items-start  sm:px-0 w-full bg-white ml-8">
            <div class="border-t border-b  grid lg:grid-cols-5 md:grid-cols-1 gap-8">
              <div class="flex flex-col col-span-4">
                <div class="flex flex-col gap-2 mt-4">
                  <div className="grid grid-cols-5 gap-2 ml-2">
                    <div className={styles.detailName}>
                      <span>Name</span>
                    </div>
                    <div className={styles.detailValue}>Nimal Fernando</div>

                    <div className={styles.detailName}>Email</div>
                    <div className={styles.detailValue}>nimal@jjj@.vom</div>

                    <div className={styles.detailName}>province</div>
                    <div className={styles.detailValue}>Western</div>

                    <div className={styles.detailName}>Mobile</div>
                    <div className={styles.detailValue}>078 5624 5314</div>

                    <div className={styles.detailName}>Alt Mobile</div>
                    <div className={styles.detailValue}>078 5624 5314</div>

                    <div className={styles.detailName}>Landline</div>
                    <div className={styles.detailValue}>011 672 56423</div>

                    <div className={styles.detailName}>Scale Of Plantation</div>
                    <div className={styles.detailValue}>Medium</div>

                    <div className={styles.detailName}>Business Name</div>
                    <div className={styles.detailValue}>PolMure</div>

                    <div className={styles.detailName}>Alt Mobile 2</div>
                    <div className={styles.detailValue}>078 5624 5314</div>

                    <div className={styles.detailName}>Nearest City</div>
                    <div className={styles.detailValue}>Pamunuwa</div>

                    <div className={styles.detailName}>Inheritor Name</div>
                    <div className={styles.detailValue}>Nimal Silva</div>

                    <div className={styles.detailName}>Inheritor Mobile</div>
                    <div className={styles.detailValue}>076 687 6289</div>

                    <div className={styles.detailName}>Aditional Info</div>
                    <div className={styles.detailValue}>
                      lorem sadsada sadsdad
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-4 bg-green-100 mt-5 rounded-xl shadow-sm  ml-8 w-2/3 items-start">
            <div className="text-xl mt-1 col-span-2">Status</div>
            <select
              className="block col-span-3 appearance-none w-48 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
              id="grid-state"
            >
              <option>Select</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Published</option>
              <option>Rejected</option>
            </select>

            <div className="text-xl mt-1 col-span-2">Duration</div>
            <input
              type="number"
              name="fname"
              id="floating_first_name"
              class="col-span-3 block py-2.5 px-2 w-48 text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none bg-slate-200 mb-6"
              placeholder="0-90"
            />
            <div className="col-span-4">
              <button
                type="button"
                className="w-48 mr-5 inline-block p-2 bg-green-400 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
              >
                Confirm
              </button>
              <button
                type="button"
                className="w-48 inline-block p-2 bg-red-400 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerAccount;
