import React, { useState, Fragment,useEffect } from "react";

import DataTable from "react-data-table-component";
import { ArrowRightIcon } from "@heroicons/react/solid";
import UserSidebar from "../components/UserSidebar";
import AdvertistmentCarousel from "../components/AdvertistmentCarousel";
import Auth from "../Authentication/Auth";

const acceptHandler = (state) => {
  console.log("clicked accepted");
  console.log(state.target.id);
};

const declineHandler = (state) => {
  console.log("clicked decline");
  console.log(state.target.id);
};

const columns = [
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Scale",
    selector: (row) => row.scale,
    sortable: true,
  },
  {
    name: "District",
    selector: (row) => row.district,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <button
        className="bg-green-600 p-2 rounded-2xl text-white "
        onClick={acceptHandler}
        id={row.id}
      >
        Accept
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    cell: (row) => (
      <button
        className="bg-red-500 p-2 rounded-2xl text-white "
        onClick={declineHandler}
        id={row.id}
      >
        Decline
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      backgroundColor: "#effce0",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      backgroundColor: "#effce0",
    },
  },
};

const data = [
  {
    id: 1,
    price: 200,
    name: "Jayantha Perera",
    scale: "Large",
    district: "Colombo",
  },
  {
    id: 3,
    price: 220,
    name: "Nimal Perera",
    scale: "Large",
    district: "Colombo",
  },
];

function MyBids() {
  const [isOpened, setIsOpened] = useState(false);
  const [userType, setUserType] = useState(Auth.getUserLevel())
  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };
  useEffect(() => {
    
  }, [])
  
  return (
    <div className="h-screen flex">
      <UserSidebar
        handleSidebar={handleSidebar}
        isOpened={isOpened}
        selected="bids"
      />
      <div className="flex-1 flex overflow-hidden pt-16 ">
        <div class="flex-1 overflow-y-scroll">
          <ArrowRightIcon
            className={`w-10 ml-4 ${isOpened ? "hidden" : " md:hidden"}`}
            onClick={handleSidebar}
          />
          <div className="-mt-16">
            <AdvertistmentCarousel />
          </div>
          <br/>
          <div>
            <h3 className=" text-2xl font-semibold mb-4 mt-20 w-full justify-center  text-center">My Bids</h3>
            <div className="w-4/5 mx-auto ">
              <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
              />
            </div>
          </div>

          {/*         
            <center>
              <div class="flex justify-center items-center mt-32">
                <div
                  class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </center> */}
        </div>
      </div>
    </div>
  );
}

export default MyBids;
