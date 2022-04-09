import { ScaleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

import { useParams } from "react-router";
import { getUserLevel } from "../Authentication/Auth";
import Auth from "../Authentication/Auth";

const styles = {
  detailName: "text-xl  col-span-3",
  detailValue: "text-xl col-span-2",
};

function BuyerDetails() {
  const { id } = useParams();

  const [buyerDetails, setBuyerDetails] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [errorMessage, setErrors] = useState({});

  const loadBuyerDetails = () => {
    console.log(id);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/buyerDetails`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((response) => {
        setBuyerDetails(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadBuyerDetails();
  }, []);

  const onSubmit = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: buyerDetails.buyerName,
          buyerId: id,
          sellerId: Auth.getUserId(),
          sellerName: Auth.getUserName(),
          amount: offerAmount,
        }),
      };
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/offers/add`,
        requestOptions
      )
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          if (res.errors != null || res.errors != undefined) {
            setErrors(res.errors);
          } else {
            const msg = {
              success: "Offer Successfully Send",
            };
            setErrors(msg);
            setOfferAmount("");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container px-0 lg:px-40 sm:px-10 md:px-20 ">
      <main class="flex items-center p-10 sm:px-0 w-full h-full bg-white">
        <div class="border-t border-b pt-16 grid lg:grid-cols-5 md:grid-cols-1 gap-8">
          <div class="flex flex-col col-span-3">
            {buyerDetails ? (
              <div class="flex flex-col gap-2">
                <h1 class="capitalize text-3xl font-bold ">
                  {buyerDetails.buyerName}
                </h1>
                <h1 class="capitalize text-xl font-semibold mt-4 ml-2 ">
                  Asking Price :{" "}
                  {buyerDetails.ratings && buyerDetails.ratings.askingPrice
                    ? buyerDetails.ratings.askingPrice
                    : "Not Mentioned"}
                </h1>
                <h1 class="capitalize text-xl font-semibold mb-5 ml-2 ">
                  Offer Price &nbsp;&nbsp;&nbsp;: 250.00 Rs
                </h1>
                <h1 class="capitalize text-xl font-semibold ml-2 ">Ratings</h1>
                <div className="grid grid-cols-5 gap-2 ml-2">
                  <div className={styles.detailName}>
                    <span>Price</span>
                  </div>
                  <div className={styles.detailValue}>
                    {" "}
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      edit={false}
                      value={
                        buyerDetails.ratings && buyerDetails.ratings.priceRating
                          ? buyerDetails.ratings.priceRating
                          : 0
                      }
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>

                  <div className={styles.detailName}>Selection</div>
                  <div className={styles.detailValue}>
                    {" "}
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      edit={false}
                      value={
                        buyerDetails.ratings &&
                        buyerDetails.ratings.selectionRating
                          ? buyerDetails.ratings.selectionRating
                          : 0
                      }
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>

                  <div className={styles.detailName}>Punctuality</div>
                  <div className={styles.detailValue}>
                    {" "}
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      edit={false}
                      value={
                        buyerDetails.ratings &&
                        buyerDetails.ratings.punctualityRating
                          ? buyerDetails.ratings.punctualityRating
                          : 0
                      }
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>

                  <div className={styles.detailName}>Professionalism</div>
                  <div className={styles.detailValue}>
                    {" "}
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      edit={false}
                      value={
                        buyerDetails.professionalisRating &&
                        buyerDetails.ratings.professionalisRating
                          ? buyerDetails.ratings.professionalisRating
                          : 0
                      }
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 p-4 bg-green-100 mt-5 rounded-xl shadow-sm">
                  <div className={styles.detailName + " font-semibold"}>
                    Contact Number
                  </div>
                  <div className={styles.detailValue + " font-bold"}>
                    {buyerDetails.phone}
                  </div>

                  {getUserLevel() == "Seller" ? (
                    <>
                      <div
                        className={styles.detailName + " mt-5 font-semibold"}
                      >
                        Offer
                      </div>
                      <input
                        type="number"
                        className="-ml-2 mt-2 form-controlblock w-32 h-10 px-3 py-1.5 text-base font-normal text-gray-700 bg-yellow-50 bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleNumber0"
                        placeholder="0,00"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                      />
                      <button
                        type="button"
                        className="inline-block px-2 py-1.0 bg-green-400 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => onSubmit()}
                      >
                        Confirm
                      </button>{" "}
                    </>
                  ) : null}
                </div>
                <div className="ml-2 mb-2">
                  {errorMessage.amount != null ? (
                    <strong className="text-red-500 text-sm">
                      {errorMessage.amount}
                    </strong>
                  ) : null}
                  {errorMessage.offer != null ? (
                    <strong className="text-red-500 text-sm">
                      {errorMessage.offer}
                    </strong>
                  ) : null}
                  {errorMessage.success != null ? (
                    <strong className="text-green-500 text-sm">
                      {errorMessage.success}
                    </strong>
                  ) : null}
                </div>
              </div>
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
          </div>
          <div class="flex flex-col col-span-2 justify-start order-first lg:order-last md:order-first mt-10 ml-10 md:mx-auto">
            <div
              class="flex flex-col  object-cover w-full justify-items-start border rounded-3xl shadow-lg overflow-hidden"
              style={{ minHeight: 320 }}
            >
              <img
                className="w-full h-full object-cover "
                src="https://images.unsplash.com/photo-1537191072641-5e19cc173c6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="nike shoes"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BuyerDetails;
