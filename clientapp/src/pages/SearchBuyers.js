import React, { useEffect, useState } from "react";
import AdvertistmentCarousel from "../components/AdvertistmentCarousel";
import ListItemBuyer from "../components/ListItemBuyer";

import SelectBox from "../components/SelectBox";

import { districts } from "../common/districts";

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

function SearchBuyers() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [selectedScale, setSelectedScale] = useState(scale[0]);
  const [selectedSorting, setSelectedSorting] = useState(sortings[0]);

  const [buyers, setBuyers] = useState(null);

  const loadBuyers = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/buyers`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setBuyers(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadBuyers();
  }, []);

  return (
    <div>
      <AdvertistmentCarousel />
      <div className="container mx-auto ">
        {/* <h1 class="text-3xl font-normal leading-normal mx-auto text-center lg:mx-72 mt-28 lg:text-left">
          Search Sellers
        </h1> */}
        <h1 className="align self-center text-center w-auto text-3xl mt-24">
          Search Coconut Buyers
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

        <div className="container py-4 mt-4">
          {buyers ? (
            buyers.map((e, i) => {
              return (
                <ListItemBuyer
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

export default SearchBuyers;
