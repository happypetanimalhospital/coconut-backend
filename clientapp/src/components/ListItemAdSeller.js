import React from "react";
import ReactStars from "react-rating-stars-component";

function ListItemAdSellers({ name, district, scale, price, rating }) {
  return (
    <a href="/viewBuyer">
      <div className="flex justify-start mb-4 hover:cursor-pointer ">
        <div class="flex flex-col p-4 sm:p-0 sm:flex-row w-screen sm:w-3/4 rounded-lg  shadow-lg lg:h-auto md:h-40 bg-lime-100">
          <img
            class="h-56 lg:h-36 md:h-auto object-cover  sm:w-36 rounded-t-lg md:rounded-lg m-4"
            src="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <div class="p-4 flex flex-col justify-start w-3/5 ">
            <h5 class="text-gray-900 text-lg font-semibold ">{name}</h5>
            <h5 class="text-gray-900 text-base font-medium ">{price}</h5>
            <div className="flex flex-col md:flex-col sm:flex-col lg:flex-row">
              <h5 class="text-gray-900 text-base  font-medium flex">
                <span className="font-semibold">District:</span> {district}
              </h5>
              <h5 class="text-gray-900 text-base  font-medium flex lg:ml-4">
                <span className="font-semibold">Scale : </span> {scale}
              </h5>
            </div>
            <div className="-mt-2">
              <ReactStars
                count={5}
                // onChange={ratingChanged}
                value={rating}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
            </div>

            <div className="mt-2  mb-4">
              <a
                className="bg-blue-500 p-2 text-white rounded-xl "
                href="/buyerDetails"
              >
                View Details
              </a>
              <a
                className="bg-green-500 p-2 text-white rounded-xl ml-4"
                href="/sellerAccount"
              >
                Approve
              </a>
              <a
                className="bg-red-500 p-2 text-white rounded-xl ml-4"
                href="/sellerAccount"
              >
                Discard
              </a>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default ListItemAdSellers;
