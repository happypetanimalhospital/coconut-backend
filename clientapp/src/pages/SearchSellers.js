import React, { useState, useEffect } from "react";
import AdvertistmentCarousel from "../components/AdvertistmentCarousel";
import ListItemSeller from "../components/ListItemSeller";

import SelectBox from "../components/SelectBox";

const districts = [
  { id: 1, name: "Colombo", unavailable: false },
  { id: 2, name: "Gampaha", unavailable: false },
  { id: 3, name: "Kalutara", unavailable: false },
  { id: 4, name: "Kandy", unavailable: false },
  { id: 5, name: "Matale", unavailable: false },
  { id: 6, name: "Nuwara Eliya", unavailable: false },
  { id: 7, name: "Galle", unavailable: false },
  { id: 8, name: "Hambantota", unavailable: false },
  { id: 9, name: "Jaffna", unavailable: false },
  { id: 10, name: "Kilinochchi", unavailable: false },
  { id: 12, name: "Vavuniya", unavailable: false },
  { id: 13, name: "Mullaitivu", unavailable: false },
  { id: 14, name: "Batticaloa", unavailable: false },
  { id: 15, name: "Trincomalee", unavailable: false },
  { id: 16, name: "Kurunegala", unavailable: false },
  { id: 17, name: "Puttalam", unavailable: false },
  { id: 18, name: "Anuradhapura", unavailable: false },
  { id: 19, name: "Polonnaruwa", unavailable: false },
  { id: 20, name: "Badulla", unavailable: false },
  { id: 21, name: "Moneragala", unavailable: false },
  { id: 22, name: "Ratnapura", unavailable: false },
  { id: 23, name: "Kegalle", unavailable: false },
];

const scale = [
  { id: 1, name: "Small", unavailable: false },
  { id: 2, name: "Medium", unavailable: false },
  { id: 3, name: "Large", unavailable: false },
  { id: 4, name: "Any", unavailable: false },
];

const sortings = [
  { id: 0, name: "Select Criteria", unavailable: false },
  { id: 1, name: "Highest Price", unavailable: false },
  { id: 2, name: "Overall Highest Rating", unavailable: false },
  { id: 3, name: "Highest Price and Rating", unavailable: false },
  { id: 4, name: "Punctually Rating Highest", unavailable: false },
];

function Search() {
  const [sellers, setSellers] = useState(null);

  const loadSellers = () => {
    fetch(`http://localhost:5000/api/users/sellers`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setSellers(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadSellers();
  }, []);

  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [selectedScale, setSelectedScale] = useState(scale[0]);
  const [selectedSorting, setSelectedSorting] = useState(districts[0]);


  return (
    <div>
      <AdvertistmentCarousel />
      <div className="container mx-auto ">
        {/* <h1 class="text-3xl font-normal leading-normal mx-auto text-center lg:mx-72 mt-28 lg:text-left">
          Search Sellers
        </h1> */}
        <h1 className="align self-center text-center w-auto text-3xl mt-24">
          Search Coconut Sellers
        </h1>
        <div className="flex flex-wrap mt-5 mx-10 justify-center">
          <div className="flex  mt-2">
            <SelectBox
              list={districts}
              selected={selectedDistrict}
              setSelected={setSelectedDistrict}
              title={"District"}
            />
          </div>

          <div className="flex mt-2">
            <SelectBox
              list={scale}
              selected={selectedScale}
              setSelected={setSelectedScale}
              title={"Scale"}
            />
          </div>
          <div className="flex  mt-2">
            <SelectBox
              list={sortings}
              selected={selectedSorting}
              setSelected={setSelectedSorting}
              title={"Sort By "}
            />
          </div>
        </div>

        {/* <div className="container py-4 mt-4">
          <ListItemSeller name={"John Fernando"} price={"120.00 Rs"} district={"Colombo"} scale={"Large"} rating={3}/>
          <ListItemSeller name={"Nimal Fernando"} price={"120.00 Rs"} district={"Colombo"} scale={"Large"} rating={4}/>
          <ListItemSeller name={"Kasun Fernando"} price={"120.00 Rs"} district={"Colombo"} scale={"Large"} rating={5}/>
          <ListItemSeller name={"Dinith Fernando"} price={"120.00 Rs"} district={"Colombo"} scale={"Large"} rating={2}/>
        </div> */}
        <div className="container py-4 mt-4">
          {sellers ? (
            sellers.map((e, i) => {
              return (
                <ListItemSeller
                  name={e.name}
                  district={e.district}
                  scale={e.scaleOfBusiness}
                  rating={i}
                  id={e._id}
                />
              );
            })
          ) : (
            <center>
              <div class="flex justify-center items-center">
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
}

export default Search;
