import React, { useState, Fragment, useEffect } from "react";

import DataTable from "react-data-table-component";
import { ArrowRightIcon } from "@heroicons/react/solid";
import UserSidebar from "../components/UserSidebar";
import AdvertistmentCarousel from "../components/AdvertistmentCarousel";
import Auth from "../Authentication/Auth";
import { Dialog } from "@headlessui/react";

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
  const [harvestDate, setHarvestDate] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [userType, setUserType] = useState(Auth.getUserLevel());
  const [bids, setBids] = useState([]);
  const [error, setError] = useState([]);
  const [errorBox, setErrorBox] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [row, setRow] = useState(null);
  const [status, setStatus] = useState('');
  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };

  const columns = [
    {
      name: "Price",
      selector: (row) => row.amount + " /=",
      sortable: true,
    },
    {
      name: `${userType == "Buyer" ? "Seller" : "Buyer"}`,
      selector: (row) => {
        if (userType == "Buyer") {
          return row.sellerName;
        } else {
          return row.buyerName;
        }
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <h4
          className={
            row.status == "pending"
              ? "text-yellow-600 capitalize font-semibold"
              : "text-green-500 capitalize font-semibold"
          }
        >
          {row.status}
        </h4>
      ),
      sortable: true,
    },
    {
      name: "Harvest Date",
      selector: (row) => row.harvestDate !== '' && row.harvestDate != null? row.harvestDate : '-',
      sortable: true,
    },
    {
      name: "See more",
      selector: (row) => <a href={`viewSeller${row.sellerId}`}>View</a>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) =>
        userType !== "Buyer" && row.status === "pending" ? (
          <button
            className="bg-green-400 p-2 rounded-2xl text-white "
            onClick={(e) => handleAccept(row._id, "confirmed", e)}
            id={row._id}
          >
            Confirm
          </button>
        ) : userType != "Buyer" && row.status != "pending" ? (
          <button
            className="bg-orange-300 p-2 rounded-2xl text-white "
              onClick={(e) => handleAccept(row._id, "pending", e)}
            id={row._id}
          >
            Pending
          </button>
        ) : (
          <h1> N/A</h1>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    loadBids();
  }, []);
  const handleAccept = (id, status, e) => {
    e.preventDefault();
    setIsOpen(true);
    setRow(id);
    setStatus(status);
  };
  const acceptHandler = () => {
    // e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/bids/confirm`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ id: row, status: status,harvestDate:harvestDate }),
    })
      .then((res) => res.json())
      .then((response) => {
        setError(response);
        console.log(response);
        loadBids();
        setIsOpen(false);
        setHarvestDate(null);
        setRow(null);
      })
      .catch((error) => {
      console.log(error);
        setHarvestDate(null);
        setRow(null);
        setErrorBox("");
    });
  };

  const loadBids = () => {
    fetch(
      `http://localhost:5000/api/bids/${
        userType == "Buyer" ? "bids-buyer" : "bids-seller"
      }?id=${Auth.getUserId()}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        // body: JSON.stringify({ id: id }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setBids(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

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
          <br />
          <div>
            <h3 className=" text-2xl font-semibold mb-4 mt-20 w-full justify-center  text-center">
              My Bids
            </h3>
            <div className="w-4/5 mx-auto ">
              <DataTable
                columns={columns}
                data={bids}
                customStyles={customStyles}
              />
            </div>
          </div>

          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed z-10 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

              <div className="relative bg-white rounded max-w-sm mx-auto p-10">
                <Dialog.Title className="font-semibold">
                  Select Harvest Date
                </Dialog.Title>
                <Dialog.Description>
                  <input
                    className="my-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="date"
                    name="registered_business"
                    id="inlineRadio1"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}

                  // value={values.inlineRadioOptions2}
                  />
                  {errorBox != "" ? (
                    <h1 className="text-red-600">{errorBox}</h1>
                  ) : (
                    ""
                  )}
                  <div>
                    <button
                      className="bg-green-300 m-3 px-4 py-2"
                      onClick={acceptHandler}
                    >
                      OK
                    </button>
                    <button
                      className="bg-red-300 m-3 mt-4 px-4 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Description>
              </div>
            </div>
          </Dialog>

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
