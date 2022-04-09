import { ScaleIcon } from "@heroicons/react/solid";
import React from "react";
import ReactStars from "react-rating-stars-component";

const styles = {
  detailName: "text-xl  col-span-3",
  detailValue: "text-xl col-span-2",
};

function OfferDetails() {
  return (
    <div className="container px-0 lg:px-40 sm:px-10 md:px-20 ">
      <main class="flex items-center p-10 sm:px-0 w-full h-full bg-white">
        <div class="border-t border-b pt-16 grid lg:grid-cols-5 md:grid-cols-1 gap-8">
          <div class="flex flex-col col-span-3">
            <div class="flex flex-col gap-2">
              <h1 class="capitalize text-4xl font-extrabold ">
                Buyer Name Here
              </h1>
              <h1 class="capitalize text-xl font-semibold mt-4 ml-2 ">
                Offered Price : 220.00 Rs
              </h1>
              <h1 class="capitalize text-xl font-semibold mb-5 ml-2 ">
                Best Offer Price : 250.00 Rs
              </h1>
              <h1 class="capitalize text-xl font-semibold mb-5 ml-2 ">
                Counter Price : 250.00 Rs
              </h1>
              <h1 class="capitalize text-xl font-semibold ml-2 ">Buyer Ratings</h1>
              <div className="grid grid-cols-5 gap-2 ml-2">
                <div className={styles.detailName}>
                  <span>Price</span>
                </div>
                <div className={styles.detailValue}>
                  <ReactStars
                    count={5}
                    // onChange={ratingChanged}
                    edit={false}
                    value={4}
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
                    value={3}
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
                    value={5}
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
                    value={1}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 p-4 bg-green-100 mt-5 rounded-xl shadow-sm">
              
                <div className={styles.detailName+ " font-semibold"}>Contact Number</div>
                <div className={styles.detailValue + " font-bold"}>
                  076 7678 389
                </div>
              
                <button
                  type="button"
                  className="mt-4 col inline-block px-2 py-3 bg-green-400 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Confirm Offer
                </button>
                <div className="col-span-2"></div>
                <button
                  type="button"
                  className="mt-4 inline-block px-2 py-3 bg-orange-400 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Counter Offer
                </button>
              </div>
            </div>
          </div>
       
        </div>
      </main>
    </div>
  );
}

export default OfferDetails;
