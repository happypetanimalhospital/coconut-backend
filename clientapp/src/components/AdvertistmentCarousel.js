import React from "react";
import ReactCaroussel from "react-caroussel";
// import "react-caroussel/dist/index.css";

function AdvertistmentCarousel() {
  return (
    <div className="w-2/4 h-20 mx-auto  ">
      <div className="h-16"></div>
      <div
        id="carouselExampleControls"
        class="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner relative w-full overflow-hidden">
          <div class="carousel-item active relative float-left w-full ">
            <div className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-center">
              <h3 className="justify-center text-xl font-semibold text-white p-8">
                Next Ad Goes Here
              </h3>
            </div>
          </div>
          <div class="carousel-item relative float-left w-full">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center">
              <h3 className="justify-center text-xl font-semibold text-white p-8">
                Another Ad Goes Here
              </h3>
            </div>
          </div>
          <div class="carousel-item relative float-left w-full">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-center">
              <h3 className="justify-center text-xl font-semibold text-white p-8">
                Ad Goes Here
              </h3>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default AdvertistmentCarousel;
