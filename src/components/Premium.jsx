import axios  from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {

  const [isUserPremium, setIsUserPremium]=useState(false)

/*  useEffect(()=>{ //call only when page laods
    varifyPremiumUser()
  }, [])

  const varifyPremiumUser = async ()=>{
    const res=await axios.get(BASE_URL + "/premium/verify", {withCredentials:true})
    if(res.data.isUserPremium){
      setIsUserPremium(true)
    }

  }
*/

  
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {  memberShipType: type },
      { withCredentials: true }
    );
 
    const {keyId}=order.data
    const { amount,  currency, notes, orderId } = order.data.order;

    var options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developer",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "+919876543210",
      },
      theme: {
        color: "#3399cc",
      },
     // handle:varifyPremiumUser //call when payment done
    };

    var rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ?(
    "You are already a premium user"
  ): (
  <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
          <h1>Silver MemeberShip</h1>
          <ul>
            <li> - Chat with other people</li>
            <li>- 100 connections request per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-primary"
          >
            Buy Now
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
          <h1>Gold MemeberShip</h1>
          <ul>
            <li> - Chat with other people</li>
            <li>- infinite connections request per day</li>
            <li>- Gold Tick</li>
            <li>- 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-active btn-warning"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>)
  
};

export default Premium;
