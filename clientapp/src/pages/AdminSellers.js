import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";

function AdminSellers() {
  const [isOpened, setIsOpened] = useState(false);
  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };

  const [sellers, setSellers] = useState(null);
  const [error, setError] = useState(null);

  const loadSellers = () => {
    fetch(`http://localhost:5000/api/users/sellersAdmin`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      // .then((res)=>console.log(res))
      .then((res) => res.json())
      .then((response) => {
        setSellers(response);
        console.log(response);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("Server Error");
      });
  };

  useEffect(() => {
    loadSellers();
  }, []);
  if (!error)
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

            <h3 className="ml-8 text-xl font-semibold mb-4">Manage Sellers</h3>
            <div className="hidden flex-row justify-between  mx-20 md:flex ">
              <div className="relative z-0 mb-2 w-72 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_first_name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <span className="flex flex-row">
                    Search <SearchIcon className="w-5 ml-4" />
                  </span>
                </label>
              </div>

              <div className="relative z-0 mb-4 w-72 group">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                  id="grid-state"
                >
                  <option>Filter By Scale</option>
                  <option>Small Scale</option>
                  <option>Medium Scale</option>
                  <option>Large Scale</option>
                </select>
              </div>

              <div className="relative z-0 mb-4 w-72 group">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                  id="grid-state"
                >
                  <option>Filter By Status</option>
                  <option>Small Scale</option>
                  <option>Medium Scale</option>
                  <option>Large Scale</option>
                </select>
              </div>
            </div>
            {sellers && sellers.length != 0 ? (
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 p-4">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead class="border-b">
                        <tr>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Name
                          </th>

                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Scale
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sellers.map((e, i) => {
                          return (
                            <tr class="border-b">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {i + 1}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {e.name}
                              </td>

                              {e.accountStatus ? (
                                <td
                                  class={`text-sm  px-6 py-4 whitespace-nowrap font-bold ${
                                    e.accountStatus == "published"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {e.accountStatus}
                                </td>
                              ) : (
                                <td class="text-sm  px-6 py-4 whitespace-nowrap font-bold text-blue-600">
                                  Pending
                                </td>
                              )}
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {e.scaleOfBusiness}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <a
                                  className="bg-red-500 p-2 text-white rounded-xl"
                                  href={"/sellerAccount"+e._id}
                                >
                                  Change Status
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
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
              </center>
            )}
          </div>
        </div>
      </div>
    );
  else {
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
          </div>
        </div>
        <h3 className="ml-8 text-xl font-semibold mb-4">Manage Sellers</h3>
        <h3 className="ml-8 text-xl font-semibold mt-48">{error}</h3>
      </div>
    );
  }
}

export default AdminSellers;
