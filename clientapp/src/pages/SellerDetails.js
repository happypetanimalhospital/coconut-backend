import { ScaleIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import Auth from "../Authentication/Auth";

const styles = {
  detailName: "text-xl font-semibold col-span-3",
  detailValue: "text-xl col-span-2",
};

function SellerDetails() {
  const [sellerDetails, setSellerDetails] = useState({});
  const { id } = useParams();
  const [errorMessage, setErrors] = useState({});
  const [successMessage, setSuccess] = useState(null);
  const [bidAmount, setBidAmount] = useState({});
  const [userType, setUserType] = useState(Auth.getUserLevel())


  useEffect(() => {
    loadSellerDetails();
  }, []);

  const loadSellerDetails = () => {
    console.log(id);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/sellerDetails`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((response) => {
        setSellerDetails(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyerName: Auth.getUserName(),
            buyerId: Auth.getUserId(),
            sellerId: sellerDetails._id,
            sellerName: sellerDetails.name,
            amount:bidAmount,
          }),
        };
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/bids/add`, requestOptions).then(function (response) {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          if(res.errors!=null || res.errors!=undefined){
            setErrors(res.errors);
          }else{
            const msg={
              success: "Bid Successfully Placed",
            }
            setErrors(msg);
            setBidAmount("");
          }
        })
        
      } catch (e) {
        console.log(e);
      }
    
  };

  return (
    <div className="container px-0 lg:px-40 sm:px-10 md:px-20 ">
      <main class="flex items-center p-10 sm:px-0 w-full h-full bg-white">
        <div class="border-t border-b pt-16 grid lg:grid-cols-5 md:grid-cols-1 gap-8">
          <div class="flex flex-col col-span-3">
            {sellerDetails ? (
              <div class="flex flex-col gap-4">
                <h1 class="capitalize text-4xl font-extrabold mb-5 ">
                 {sellerDetails.name}
                </h1>
                <div className="grid grid-cols-5 gap-2 ml-2">
                  <div className={styles.detailName}>
                    <span>Scale</span>
                  </div>
                  <div className={styles.detailValue}>  {sellerDetails.scaleOfBusiness}</div>
                  <div className={styles.detailName}>
                    Average Yeld per Harvest
                  </div>
                  <div className={styles.detailValue}>{sellerDetails.yieldPerHarvest}</div>

                  <div className={styles.detailName}>District</div>
                  <div className={styles.detailValue}>{sellerDetails.dirstrict}</div>

                  <div className={styles.detailName}>City</div>
                  <div className={styles.detailValue}>{sellerDetails.nearestCity}</div>

                  <div className={styles.detailName}>
                    Interval During Harvest
                  </div>
                  <div className={styles.detailValue}>{sellerDetails.intervalBetweenHarvest} month</div>

                  <div className={styles.detailName}>Last Harvest</div>
                  <div className={styles.detailValue}>---</div>

                  <div className={styles.detailName}>Seller Rating</div>
                  <div className={styles.detailValue}>
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      edit={false}
                      value={sellerDetails.rating?sellerDetails.rating:0}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>

                  <div className={styles.detailName}>Availability Status</div>
                  <div className={styles.detailValue}>{sellerDetails.availability?sellerDetails.availability:"---"}</div>
                </div>
                {errorMessage.amount!=null ?<strong className="text-red-500 text-sm">{errorMessage.amount}</strong>:null}
              {errorMessage.bid!=null ?<strong className="text-red-500 text-sm">{errorMessage.bid}</strong>:null}
              {errorMessage.success!=null ?<strong className="text-green-500 text-sm">{errorMessage.success}</strong>:null}
                <div className="grid grid-cols-5 gap-2 p-4 bg-green-100 mt-5 rounded-xl shadow-sm">
                  <div className={styles.detailName}>Highest Bid</div>
                  <div className={styles.detailValue + " font-bold"}>
                  {sellerDetails.highestBid?sellerDetails.highestBid:"---"}
                  </div>

                  <div className={styles.detailName}>Contact Number</div>
                  <div className={styles.detailValue + " font-bold"}>
                  {sellerDetails.mobile1?sellerDetails.mobile1:0}
                  </div>
                  <div className={styles.detailName + " mt-5"}>
                    Place Your Bid
                  </div>

                  <input
                    type="number"
                    className="
                    -ml-2
                    mt-2
        form-control
        block
        w-32
        h-10
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-yellow-50 bg-clip-padding
        border border-solid border-gray-300
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                    id="exampleNumber0"
                    placeholder="0,00"
                    disabled={userType==="Buyer"?false:true}
                  />
                  <button
                  onClick={(e) => onSubmit(e)}
                    type="button"
                    className="inline-block px-2 py-1.0 bg-green-400 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Bid
                  </button>
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

export default SellerDetails;
