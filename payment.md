# cerate account on razorpay

# generate key_id and key_secret

# from documantation

https://razorpay.com/docs/partners/technology-partners/onboard-businesses/integrate-oauth/integration-steps?search-string=build%20integration


- cerate a file
  const Razorpay = require("razorpay");

  var instance = new Razorpay({ //build integration
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  module.exports=instance


- create a Schema
  const mongoose = require("mongoose");

  const paymentSchema =new mongoose.Schema(
  {
  userId: {
  type: mongoose.Types.ObjectId,
  ref: "User",
  required: true,
  },
  paymentId: {
  type: String,
  },
  orderId: {
  type: String,
  required: true,
  },

  status: {
  type: String,
  required: true,
  },

  amount: {
  type: Number,
  required: true,
  },
  currency: {
  type: String,
  required: true,
  },

  receipt: {
  type: String,
  required: true,
  },

  notes: {
  firstName: {
  type: String,
  },
  lastName: {
  type: String,
  },
  memberShipType: {
  type: String,
  },
  },
  },{ timestamps: true }
  );

  module.exports=mongoose.model("Payment", paymentSchema)


- create routing

    const order= instance.orders.create({ //instance from 1
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
        firstName,
        lastName,
        emailId,
        memberShipType: memberShipType,
        }
    })
    
    create new instance of schema
    save()   
    res.json({
    success: true,
    order: savedPayment.toJSON(),
    keyId: process.env.RAZORPAY_KEY_ID
    });



 --- Now on frontend  ---

- API call 
  fetch data commnig from beckend

- add in html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

- use it in after API
var options = {
        "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits. 
        "currency": "INR",
        "name": "Acme Corp", //your business name
        "description": "Test Transaction",
        "order_id": "order_9A33XWu170gUtm", // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);

    rzp1.open();   


- now check payment successful or not use webhook URL(only for live API -> use ngrok)