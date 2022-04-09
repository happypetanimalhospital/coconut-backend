import React from "react";
import ReactStars from "react-rating-stars-component";

function ListItemBuyer({ name, district, scale, price, rating, id }) {
  return (
    <a href={"/viewBuyer" + id}>
      <div className="flex justify-center mb-4 hover:cursor-pointer">
        <div class="flex flex-col p-4 sm:p-0 sm:flex-row w-screen sm:w-2/4 rounded-lg  shadow-lg lg:h-32 md:h-40">
          <img
            class="h-56 lg:h-auto md:h-auto object-cover  sm:w-32 rounded-t-lg md:rounded-none md:rounded-l-lg"
            src="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <div class="p-4 flex flex-col justify-start w-3/5 ">
            <h5 class="text-gray-900 text-lg font-semibold ">{name}</h5>
            <h5 class="text-gray-900 text-base font-medium ">{price}</h5>

            {district? <h5 class="text-gray-900 text-base  font-medium flex">
              <span className="font-semibold">District:</span> &nbsp;{district}
            </h5>:null}
            
            <h5 class="text-gray-900 text-base  font-medium flex ">
              <span className="font-semibold">Scale : </span> &nbsp; {scale}
            </h5>

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

export default ListItemBuyer;
