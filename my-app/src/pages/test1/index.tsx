// import { useEffect, useState } from 'react';
// import axios from 'axios';

// //'http://127.0.0.1:8000/orderlist'

// type ResponseData = number[][];

// function MyComponent() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get('http://127.0.0.1:8000/orderlist');
//       setOrders(response.data);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {orders.map(order => (
//         <div key={order.id}>
//           <p>Order ID: {order.id}</p>
//           <p>Total Price: {order.totalprice}</p>
//           <p>Date Start: {order.date_start}</p>
//           <p>Date Pickup: {order.date_pickup}</p>
//           <p>Status ID: {order.status_id}</p>
//           <p>Customer ID: {order.cus_id}</p>
//           <p>Payment: {order.payment}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyComponent;

import axios from "axios";
import { useEffect, useState } from "react";

 export default function calculatePrice (productid:any,amount:any) {
    const productID = productid; 
    const [product, setProduct] = useState({
      id: '',
      name: '',
      price: '',
      product_type_id: '',
      description: ''
  
    });
  
    useEffect(() => {
      async function fetchOrderDetail() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/product/{productID}');
          console.log(response.data);
          setProduct(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchOrderDetail();
    }, []);
    const amountproduct = amount;
    //const priceproduct = Integer.parseInt(product.price);
    const totalprice =  amountproduct * priceproduct;
    //const datepickup = 
    //Step 1 Find date is tmr in table "Order" 
    //Step 2 summry manday of Step 1
    //Step 3 check manday >= 8 
    //Step 4 if = 8 : today + 1 **Check 1-3 / else startdate = today
    //Step 5 pickupdate = startdate + 1 
  
    return(

      <div>
        Product : {product.name}
        Price of Product : {product.price}
        Total Price : {totalprice}
      </div>
    
    )

  };