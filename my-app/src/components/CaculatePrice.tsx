import axios from "axios";
import { useEffect, useState } from "react";

 export default function calculatePrice (productid:any,amount:any) {
    const productID = productid; 
    //---Product-----
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

    //-----Order Detail---------
    const [order, setOrder] = useState({

        id: '',
        cus_id: '',
        status_id: '',
        date_start: '',
        date_pickup: '',
        totalprice: '',
        amount: '',
        delivery_id: '',
        payment: '',
        itemprice: '',
        product_id: '',
        amount_char: '',
        amount_icon: '',
        handle: '',
        picture_original: '',
        picture_led: '',
        picture_name: ''
    
      });
    
      useEffect(() => {
        async function fetchOrderDetail() {
          try {
            const response = await axios.get('http://127.0.0.1:8000/orderlist/');
            console.log(response.data);
            setOrder(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        fetchOrderDetail();
      }, []);
   
    //--Calculate Price-----
    // const amountproduct = amount;
    // const priceproduct = Integer.parseInt(product.price);
    // const totalprice =  amountproduct * priceproduct;

    //--Find Date Pickup-----
    // const datepickup = Date();
    //Step 1 Find date is tmr in table "Order" 
    //Step 2 summry manday of Step 1
    //Step 3 check manday >= 8 
    //Step 4 if = 8 : today + 1 **Check 1-3 / else startdate = today
    //Step 5 pickupdate = startdate + 1 

  
    return(

      <div>
        Product : {product.name}
        Price of Product : {product.price}
        {/* Total Price : {totalprice} */}
      </div>
    
    )

  };