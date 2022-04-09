import React, { useState, useEffect } from "react";
import AdvertistmentCarousel from "../components/AdvertistmentCarousel";

import DataTable from "react-data-table-component";
import { ArrowRightIcon } from "@heroicons/react/solid";
import UserSidebar from "../components/UserSidebar";
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

function MyOffersBuyer() {

  const [isOpened, setIsOpened] = useState(true);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState([]);


  const acceptHandler = (row) => {
    console.log("clicked accepted");
    console.log(row.target.id);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/offers/accept-offer-buyer`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ id: row.target.id}),
    })
      .then((res) => res.json())
      .then((response) => {
        setError(response);
        loadBuyersOffers();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const declineHandler = (state) => {
    console.log("clicked decline");
    console.log(state.target.id);

    fetch(`http://localhost:5000/api/offers/cancel`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ id: state.target.id }),
    })
      .then((res) => res.json())
      .then((response) => {
        setError(response);
        loadBuyersOffers();
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const loadBuyersOffers = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/offers/offers-buyer`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ id: Auth.getUserId() }),
    })
      .then((res) => res.json())
      .then((response) => {
        setOffers(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };

  const columns = [
    {
      name: "Price",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Name",
      cell: (row) => (
        <a
          className=" text-black cursor-pointer "
          onClick={acceptHandler}
          href={`viewBuyer${row.buyerId}`}
        >
          {row.buyerName}
        </a>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <h4
          className={
            row.status == "pending"
              ? "text-yellow-600 capitalize font-semibold"
              : row.status == "canceled"
              ? "text-red-600 capitalize font-semibold"
              : row.status == "confirmed"
              ? "text-green-600 capitalize font-semibold"
              : "capitalize"
          }
        >
          {row.status}
        </h4>
      ),
    },
    {
      name: "Harvest Date",
      selector: (row) => row.date,
      sortable: true,
    },
    // {
    //   name: "Scale",
    //   selector: (row) => row.scale,
    //   sortable: true,
    // },
    // {
    //   name: "District",
    //   selector: (row) => row.district,
    //   sortable: true,
    // },
    {
      name: "Actions",
      cell: (row) =>
        row.status == "pending" ? (
          <button
            className="bg-green-600 p-2 rounded-2xl text-white "
            onClick={acceptHandler}
            id={row._id}
          >
            Accept
          </button>
        ) : (
          <h1> N/A</h1>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) =>
        row.status == "pending" ? (
          <button
            className="bg-red-600 p-2 rounded-2xl text-white "
            onClick={declineHandler}
            id={row._id}
          >
            Decline
          </button>
        ) : (
          <h1> </h1>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    loadBuyersOffers();
  }, []);

  return (
    <div className="h-screen flex">
      <UserSidebar
        handleSidebar={handleSidebar}
        isOpened={isOpened}
        selected="offers"
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
              My Offers
            </h3>
            <div className="w-4/5 mx-auto ">
              <DataTable
                columns={columns}
                data={offers}
                customStyles={customStyles}
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default MyOffersBuyer;
