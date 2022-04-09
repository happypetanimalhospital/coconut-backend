import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import ListItemAd from "../components/ListItemAd";
import ListItemAdSellers from "../components/ListItemAdSeller";
import ListItemBuyer from "../components/ListItemBuyer";

function AdminAds() {
  const [isOpened, setIsOpened] = useState(false);
  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div className="h-screen flex">
      <AdminSidebar
        handleSidebar={handleSidebar}
        isOpened={isOpened}
        selected="ads"
      />
      <div className="flex-1 flex overflow-hidden pt-10 ">
        <div class="flex-1 overflow-y-scroll">
          <ArrowRightIcon
            className={`w-10 ml-4 ${isOpened ? "hidden" : " md:hidden"}`}
            onClick={handleSidebar}
          />
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 p-4">
            <div class="inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <ul
                  class=" nav nav-tabs nav-justified flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0  fixed w-3/4 bg-white z-20"
                  id="tabs-tabJustify"
                  role="tablist"
                >
                  <li
                    class="nav-item flex-grow text-center"
                    role="presentation"
                  >
                    <a
                      href="#tabs-homeJustify"
                      class=" nav-link w-full block font-semibold text-base leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                      id="tabs-home-tabJustify"
                      data-bs-toggle="pill"
                      data-bs-target="#tabs-homeJustify"
                      role="tab"
                      aria-controls="tabs-homeJustify"
                      aria-selected="true"
                    >
                      Buyer Ads
                    </a>
                  </li>
                  <li
                    class="nav-item flex-grow text-center"
                    role="presentation"
                  >
                    <a
                      href="#tabs-profileJustify"
                      class=" nav-link w-full block font-semibold text-base leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent                           "
                      id="tabs-profile-tabJustify"
                      data-bs-toggle="pill"
                      data-bs-target="#tabs-profileJustify"
                      role="tab"
                      aria-controls="tabs-profileJustify"
                      aria-selected="false"
                    >
                      Seller Ads
                    </a>
                  </li>
                </ul>
                <div class="tab-content mt-20" id="tabs-tabContentJustify">
                  <div
                    class="tab-pane fade show active"
                    id="tabs-homeJustify"
                    role="tabpanel"
                    aria-labelledby="tabs-home-tabJustify"
                  >
                    <div className="items-start">
                      <ListItemAd
                        name={"Kasun Fernando"}
                        district={"Colombo"}
                        scale={"Large"}
                        rating={5}
                      />
                      <ListItemAd
                        name={"Kasun Fernando"}
                        district={"Colombo"}
                        scale={"Large"}
                        rating={5}
                      />
                      <ListItemAd
                        name={"Kasun Fernando"}
                        district={"Colombo"}
                        scale={"Large"}
                        rating={5}
                      />
                      <ListItemAd
                        name={"Kasun Fernando"}
                        district={"Colombo"}
                        scale={"Large"}
                        rating={5}
                      />
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="tabs-profileJustify"
                    role="tabpanel"
                    aria-labelledby="tabs-profile-tabJustify"
                  >
                    <div className="items-start">
                      <ListItemAdSellers
                        name={"Nimal Fernando"}
                        district={"Colombo"}
                        scale={"Large"}
                        rating={5}
                      />
                      <ListItemAdSellers
                        name={"Nimal Fernando"}
                        district={"Colombo"}
                        scale={"Large"}
                        rating={5}
                      />
                      <ListItemAdSellers
                        name={"Nimal Fernando"}
                        district={"Colombo"}
                        scale={"Large"}
                        rating={5}
                      />
                      <ListItemAdSellers
                        name={"Nimal Fernando"}
                        district={"Colombo"}
                        scale={"Large"}
                        rating={5}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAds;
