import { ScaleIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import AdminSidebar from "../components/AdminSidebar";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@heroicons/react/solid";

import { useParams } from "react-router";

const styles = {
  detailName: "text-xl font-medium col-span-3",
  detailValue: "text-lg col-span-2 text-gray-600",
};

function SellerAccount() {
  const [isOpened, setIsOpened] = useState(false);
  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };
  const [sellerDetails, setSellerDetails] = useState(false);
  const [status, setStatus] = useState(null);

  const { id } = useParams();

  const loadSellerDetails = () => {
    console.log(id);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/sellerDetails`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((response) => {
        setSellerDetails(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const activateSellerAccount = () => {
    if (status == null || status == "Select") {
      alert("Select Status to Continue!");
    } else {
      console.log(id);
      fetch(`http://localhost:5000/api/users/sellersAccountStatus`, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ id: id, status: status }),
      })
        .then((res) => res.json())
        .then((response) => {
          setSellerDetails(response);
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    loadSellerDetails();
  }, []);

  return (
    <div className="h-screen flex">
      <AdminSidebar
        handleSidebar={handleSidebar}
        isOpened={isOpened}
        selected="sellers"
      />
      <div className="flex-1 flex overflow-hidden pt-20 ">
        <div class="flex-1 overflow-y-scroll">
          <ArrowRightIcon
            className={`w-10 ml-4 ${isOpened ? "hidden" : " md:hidden"}`}
            onClick={handleSidebar}
          />
          <h3 className="ml-8 text-xl font-semibold mb-4">
            Activate Seller Account
          </h3>
          {sellerDetails ? (
            <main class="flex flex-col items-start  sm:px-0 w-full bg-white ml-8">
              <div class="border-t border-b  grid lg:grid-cols-5 md:grid-cols-1 gap-8">
                <div class="flex flex-col col-span-4">
                  <div class="flex flex-col gap-2 mt-4">
                    <div className="grid grid-cols-5 gap-2 ml-2">
                      <div className={styles.detailName}>
                        <span>Name</span>
                      </div>
                      <div className={styles.detailValue}>
                        {sellerDetails.name ? sellerDetails.name : "---"}
                      </div>

                      <div className={styles.detailName}>Email</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.email ? sellerDetails.email : "---"}
                      </div>

                      <div className={styles.detailName}>province</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.state ? sellerDetails.state : "---"}
                      </div>

                      <div className={styles.detailName}>Mobile</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.mobile1 ? sellerDetails.mobile1 : "---"}
                      </div>

                      <div className={styles.detailName}>Alt Mobile</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.mobile2 ? sellerDetails.mobile2 : "---"}
                      </div>

                      <div className={styles.detailName}>Landline</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.landLine
                          ? sellerDetails.landLine
                          : "---"}
                      </div>

                      <div className={styles.detailName}>
                        Scale Of Plantation
                      </div>
                      <div className={styles.detailValue}>
                        {sellerDetails.scaleOfBusiness
                          ? sellerDetails.scaleOfBusiness
                          : "---"}
                      </div>

                      {/* <div className={styles.detailName}>District</div>
                      <div className={styles.detailValue}>Colombo</div> */}

                      <div className={styles.detailName}>
                        Interval Between Harvest
                      </div>
                      <div className={styles.detailValue}>
                        {sellerDetails.intervalBetweenHarvest
                          ? sellerDetails.intervalBetweenHarvest
                          : "---"}
                      </div>

                      <div className={styles.detailName}> Total Land</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.totalHarvest
                          ? sellerDetails.totalHarvest
                          : "---"}{" "}
                        Acres
                      </div>

                      <div className={styles.detailName}>
                        {" "}
                        Yield Per Harvest
                      </div>
                      <div className={styles.detailValue}>
                        {sellerDetails.yieldPerHarvest
                          ? sellerDetails.yieldPerHarvest
                          : "---"}
                      </div>

                      <div className={styles.detailName}>
                        Total Number of Trees
                      </div>
                      <div className={styles.detailValue}>
                        {sellerDetails.noOfTrees
                          ? sellerDetails.noOfTrees
                          : "---"}
                      </div>

                      <div className={styles.detailName}>Inheritor Name</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.inheritorName
                          ? sellerDetails.inheritorName
                          : "---"}
                      </div>

                      <div className={styles.detailName}>Inheritor Mobile</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.inheritorMobile
                          ? sellerDetails.inheritorMobile
                          : "---"}
                      </div>

                      <div className={styles.detailName}>Nearest City</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.nearestCity
                          ? sellerDetails.nearestCity
                          : "---"}
                      </div>

                      <div className={styles.detailName}>
                        Areas to Collecting{" "}
                      </div>
                      <div className={styles.detailValue}>
                        {sellerDetails.areasToCollect
                          ? sellerDetails.areasToCollect
                          : "---"}
                      </div>
                      <div className={styles.detailName}>Receive Calls</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.recieveCalls
                          ? sellerDetails.recieveCalls
                          : "false"}
                      </div>
                      <div className={styles.detailName}>Receive Emails</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.recieveEmails
                          ? sellerDetails.recieveEmails
                          : "false"}
                      </div>
                      <div className={styles.detailName}>Aditional Info</div>
                      <div className={styles.detailValue}>
                        {sellerDetails.aditionalInfo
                          ? sellerDetails.aditionalInfo
                          : "---"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          ) : (
            <center>
              <div class="flex justify-center items-center mt-32">
                <div
                  class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <h1 className="text-2xl mt-10">Please Wait....</h1>
            </center>
          )}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-4 bg-green-100 mt-5 rounded-xl shadow-sm  ml-8 w-2/3 items-start">
            <div className="text-xl mt-1 col-span-2">Status</div>
            <select
              className="block col-span-3 appearance-none w-48 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
              id="grid-state"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Select">Select</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Published">Published</option>
              <option value="Rejected">Rejected</option>
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
                onClick={() => activateSellerAccount()}
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

export default SellerAccount;
