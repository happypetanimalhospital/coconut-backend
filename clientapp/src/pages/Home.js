import React from "react";
import CountUp from "react-countup";
import ListItemBuyer from "../components/ListItemBuyer";
import Logo from "../assets/logo.jpg";
import { isAuthenticated } from "../Authentication/Auth";

function Home() {
  return (
    <div className="w-screen h-screen ">
      <div className="h-20"></div>
      <div class="relative z-0 h-2/3  self-center object-cover  justify-items-start border rounded-3xl shadow-lg overflow-hidden mx-2 sm:mx-20 ">
        <div class="absolute inset-0 flex flex-col justify-items-center justify-center  z-10 h-auto  bg-slate-700/50 ">
          {/* <p class="text-6xl font-bold text-white text-center">පොල් මුරේ</p> */}

          <img
            className="h-48 w-64 object-cover mx-auto rounded-2xl shadow-lg"
            src={Logo}
          ></img>
          <h3 class="text-3xl font-bold text-gray-200 text-center mt-5">
            Online Platform for buy and sell coconuts in Sri Lanka
          </h3>

          {isAuthenticated() ? (
            // <div className="flex flex-col sm:flex-row mx-auto">
            //   <a
            //     href="/logout"
            //     className="sm:ml-4 mt-5 text-center inline-block px-2 py-4 w-60 bg-blue-500 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
            //   >
            //     Logout
            //   </a>
            // </div>
            null
          ) : (
            <div className="flex flex-col sm:flex-row mx-auto">
              <a
                type="button"
                className=" mt-5 text-center inline-block px-2 py-4 w-60 bg-green-500 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
                href="/register"
              >
                Register Now
              </a>
              <a
                type="button"
                className="sm:ml-4 mt-5 text-center inline-block px-2 py-4 w-60 bg-blue-500 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                href="/login"
              >
                Login
              </a>
            </div>
          )}
        </div>
        <img
          className="w-full h-full object-cover "
          src="https://images.unsplash.com/photo-1639555970484-b56343b9c234?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt="nike shoes"
        />
      </div>
      {/* <div class="absolute inset-y-2 flex justify-center items-center z-10 h-2/3 mt-5 bg-orange-400 mx-20">
        <p class="text-6xl font-bold text-white">පොල් මුරේ</p>
      </div>
      <div class="absolute inset-0 flex justify-center items-center h-2/3 z-10 mt-32">
        <h3 class="text-3xl font-bold text-gray-200">Online Platform for buy and sell coconuts in Sri Lanka</h3>
      </div> */}
      <div className="flex flex-col sm:flex-row p-4 justify-center items-center mt-10">
        <div className="flex flex-col items-center mx-auto">
          <div className="text-4xl font-semibold text-transparent  bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
            <CountUp end={124} duration={3} />
          </div>
          <h3 className="text-2xl sm:mr-4 sm:mb-0 mb-6"> Number of Buyers </h3>
        </div>
        <div className="flex flex-col items-center ml-20 mx-auto">
          <div className=" font-semibold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
            <CountUp end={224} duration={3} />
          </div>
          <h3 className="text-2xl sm:mr-4 sm:mb-0 mb-6"> Number of Sellers </h3>
        </div>
        <div className="flex flex-col items-center ml-20 mx-auto">
          <div className=" font-semibold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
            <CountUp end={27000} duration={3} /> Rs
          </div>
          <h3 className="text-2xl sm:mr-4 "> Maximum Asking Price </h3>
        </div>
      </div>
      <h3 className="text-2xl w-screen text-center mt-20 font-semibold text-lime-700">
        {" "}
        Premium Buyers{" "}
      </h3>
      <div
        id="carouselExampleControls"
        class="carousel slide relative sm:mx-40 mt-6 mb-20"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner relative w-full overflow-hidden pt-4 bg-lime-50">
          <div class="carousel-item active relative float-left w-full">
            <ListItemBuyer
              name={"Nimal Fernando"}
              district={"Colombo"}
              scale={"Large"}
              rating={5}
            />
          </div>
          <div class="carousel-item relative float-left w-full">
            <ListItemBuyer
              name={"Sunil Fernando"}
              district={"Colombo"}
              scale={"Large"}
              rating={5}
            />
          </div>
          <div class="carousel-item relative float-left w-full ">
            <ListItemBuyer
              name={"Kamal Fernando"}
              district={"Colombo"}
              scale={"Large"}
              rating={5}
            />
          </div>
        </div>
        <button
          class="sm:bg-lime-500 carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon inline-block bg-no-repeat "
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="sm:bg-lime-500 carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
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
      <h3 className="text-2xl w-screen text-center mt-20 font-semibold text-lime-700">
        {" "}
        Premium Sellers{" "}
      </h3>
      <div
        id="carouselExampleControls2"
        class="carousel slide relative sm:mx-40 mt-6 mb-20"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner relative w-full overflow-hidden pt-4 bg-lime-50">
          <div class="carousel-item active relative float-left w-full">
            <ListItemBuyer
              name={"Nimal Fernando"}
              district={"Colombo"}
              scale={"Large"}
              rating={5}
            />
          </div>
          <div class="carousel-item relative float-left w-full">
            <ListItemBuyer
              name={"Sunil Fernando"}
              district={"Colombo"}
              scale={"Large"}
              rating={5}
            />
          </div>
          <div class="carousel-item relative float-left w-full ">
            <ListItemBuyer
              name={"Kamal Fernando"}
              district={"Colombo"}
              scale={"Large"}
              rating={5}
            />
          </div>
        </div>
        <button
          class="sm:bg-lime-500 carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleControls2"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon inline-block bg-no-repeat "
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="sm:bg-lime-500 carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleControls2"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className="h-20"></div>
    </div>
  );
}

export default Home;
