import React from "react";
import ReactStars from "react-rating-stars-component";

function ListItemOffer({ name, district, scale, price, rating }) {
  return (
    <a href="/viewOffer">
      <div className="flex justify-center mb-4  hover:cursor-pointer ">
        <div class="flex flex-col p-4 sm:p-0 sm:flex-row w-screen sm:w-2/4 rounded-lg  shadow-lg lg:h-32 md:h-40 hover:shadow-xl">
          <img
            class="h-56 lg:h-auto md:h-auto object-cover  sm:w-32 rounded-t-lg md:rounded-none md:rounded-l-lg"
            src="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <div class="p-4 flex flex-col justify-start w-3/5 ">
            <h5 class="text-gray-900 text-lg font-semibold ">{price}</h5>
            <h5 class="text-gray-900 text-base font-medium ">{name}</h5>
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
          </div>
        </div>
      </div>
    </a>
  );
}

export default ListItemOffer;
