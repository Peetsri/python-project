import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel, Link, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";
import SimpleBottomNavigation from "../../../components/Footer";
import { Button } from "@mui/material";
import HeaderToolbar from "@/components/HeaderToolbar";
import axios from "axios";
import { useEffect, useState } from 'react';
import { type } from "os";
//import { parse } from "date-fns";


export default function OrderDetaillist() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const [order, setOrder] = useState({

  //   id: '',
  //   cus_id: '',
  //   status_id: '',
  //   date_start: '',
  //   date_pickup: '',
  //   totalprice: '',
  //   amount: '',
  //   delivery_id: '',
  //   payment: '',
  //   itemprice: '',
  //   product_id: '',
  //   amount_char: '',
  //   amount_icon: '',
  //   handle: '',
  //   picture_original: '',
  //   picture_led: '',
  //   picture_name: ''

  // });


  const [inputProduct, setInputProduct] = useState<string>("");
  const [inputType, setInputType] = useState<string>("");
  const [inputChar, setInputChar] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputIcon, setInputIcon] = useState<string>("");
  const [inputDelivery, setInputDelivery] = useState<string>("");
  const [inputDatePickup, setInputDatePickup] = useState<string>("");
  const [inputDateStart, setInputDateStart] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputTel, setInputTel] = useState<string>("");
  const [inputCustomer, setInputCustomer] = useState<string>("");
  const [inputTotalPrice, setInputTotalPrice] = useState<string>("");


  const [stockItem, setStockItem] = useState({
    id: '',
    name: '',
    priceperitem: '',
    amount: '',
    booking: '',
  });
  const [productItem, setProductItem] = useState([]);
  const [isSaveButton, setIsSaveButton] = useState(false);

  useEffect(() => {
    async function fetchItemStock() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/item');
        console.log(response.data);
        setStockItem(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItemStock();
  }, []);



  interface selectMenuItem {
    id: string;
    name: string;
  }
  const [checked, setChecked] = useState<string>("non-check");
  const [ischecked, setIsChecked] = useState<boolean>(false);
  const TypeData: selectMenuItem[] = [
    {
      id: '1',
      name: 'ป้ายถือ',

    },
    {
      id: '2',
      name: 'ที่คาดผม',
    },
    {
      id: '3',
      name: 'ห้อยคอ',
    },
  ]
  const DeliveryData: selectMenuItem[] = [
    {
      id: '1',
      name: 'ส่งธรรมดา',

    },
    {
      id: '2',
      name: 'ส่งด่วนพิเศษ(EMS)',
    },
    {
      id: '3',
      name: 'รับด้วยตนเอง',
    },
  ]

  const ProductData: selectMenuItem[] = [

    {
      id: '1',
      name: 'ป้าย 15*21 cm(A5)',
    },
    {
      id: '2',
      name: 'ป้าย 30*21 cm(A4)',
    },
    {
      id: '3',
      name: 'รับด้ป้าย 35 cm',
    },
    {
      id: '4',
      name: 'ป้าย 40 cm',
    },
    {
      id: '5',
      name: 'ป้าย 45 cm',
    },
    {
      id: '6',
      name: 'ป้าย 50 cm',
    },
    {
      id: '7',
      name: 'ที่คาดผม',
    },
    {
      id: '8',
      name: 'ป้ายห้อยคอ 10*15 cm',
    },
    {
      id: '9',
      name: 'ป้ายห้อยคอ 10*20 cm',
    },
    {
      id: '10',
      name: 'ป้ายห้อยคอ 12*22 cm',
    },

  ];
  const getIso8601Date = (date?: Date): string => {
    if (date == null) {
      date = new Date();
    }

    const year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return year + '-' + month + '-' + day;
  };


  const handleIsCheck = (event: any) => {
    console.log(event)
  }
  const handleCheckboxChange = (event: any) => {
    if (event.target.checked) {
      setChecked("check");
    }
    else {
      setChecked("non-check")
    }
  };

  const handleCancel = (event: any) => {
    setIsSaveButton(false);
    setInputProduct("");
    setInputType("");
    setInputChar("");
    setInputAmount("");
    setInputIcon("");
    setInputDelivery("");
    //setInputHandle("");
    setInputDatePickup("");
    setInputDateStart("");
    setFile(null);
    setTotalPrice(0.0);
    setIsChecked(false);
    setProductPrice({
      id: '',
      name: '',
      price: '',
      product_type_id: '',
      description: '',
      manday: '',
    });
    setInputName("");
    setInputAddress("");
    setInputEmail("");
    setInputTel("");

  }

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: handle file upload
    //   const response = await fetch("http://127.0.0.1:8000/upload-file/", {
    //     method: "POST",
    //     body: 'picture_original',
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Failed to upload file: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   return data.base64;

  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log("File:", file)
    }
  }

  const handleTypeChange = (e: any) => {
    setInputType(e.target.value);

  };

  const handleProductChanged = (e: any) => {
    setInputProduct(e.target.value);
  };

  const handleDeliveryChanged = (e: any) => {
    setInputDelivery(e.target.value);
  };

  const handleAmountValue = (e: any) => {
    setInputAmount(e.target.value);
  };

  const handleAmountCharValue = (e: any) => {
    setInputChar(e.target.value);
  };

  const handleAmountIconChange = (e: any) => {
    setInputIcon(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setInputName(e.target.value);
  };

  const handleAddressChange = (e: any) => {
    setInputAddress(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setInputEmail(e.target.value);
  };

  const handleTelChange = (e: any) => {
    setInputTel(e.target.value);
  };




  const [ProductPrice, setProductPrice] = useState({
    id: '',
    name: '',
    price: '',
    product_type_id: '',
    description: '',
    manday: '',
  });

  const [TotalPrice, setTotalPrice] = useState<number>(0.0);

  const estimation = async () => {
    //Calculate Total Price
    await loadItemPrice();
    await loadPickupDate();
    await loadProductItem();
    setIsSaveButton(true);
    // console.log("Product Price :",ProductPrice.price);
    // const calculatedTotal = Number(ProductPrice.price) * Number(inputAmount) ;
    // setTotalPrice (calculatedTotal);
    //console.log("TotalPrice :",TotalPrice)


  };

  const loadItemPrice = async () => {
    //find price of product
    let test = inputProduct;
    // const response1: any = await axios.get(`http://127.0.0.1:8000/product-item/${inputProduct}`);
    // console.log("Stock booking",response1.data);
    const response: any = await axios.get(`http://127.0.0.1:8000/product/${test}`);
    console.log("Product Price :", response.data.price);
    setProductPrice(response.data);
    // const response1: any = await axios.get(`http://127.0.0.1:8000/product-item/${inputProduct}`);
    // console.log("Stock booking",response1.data);

    let calculatedTotal: number = Number(response.data.price) * Number(inputAmount);
    //let check = 30;
    if (ischecked) {

      calculatedTotal = calculatedTotal + 30;

    }

    setTotalPrice(calculatedTotal);
    let total_price = String(calculatedTotal);
    setInputTotalPrice(total_price);
    console.log("Total Price :", calculatedTotal);
  };

  const loadProductItem = async () => {
    //find avaliable stock if not enough return "cannot add order"
    const response: any = await axios.get(`http://127.0.0.1:8000/product-item/${inputProduct}`);
    console.log("Stock booking", response.data);
    setProductItem(response.data);
    // for (let i = 0; i <= response.data.length; i++) {
    //   for (let j=0; j <= stockItem.length ;j++){
    //     if(response.data.item_id == stockItem.id){
    //         //check enought stock
    //         if(let total = (Number(stockItem.amount - response.data.amount) >=0){
    //           const res = 
    //           setBooking
    //         }
    //         else 
    //         {
    //           break
    //         }
    //     }
    //   }
    // }
  }


  const loadPickupDate = async () => {
    //find date pickup of product
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const dateTranform = getIso8601Date(date);
    console.log("Date :", dateTranform);
    const response = await axios.get(`http://127.0.0.1:8000/orderlist/pickup/${dateTranform
  
  }`);
    console.log(response.data);
    let sum: number = 0.0;

    // response.data.forEach((a: { manday: number }) => sum += a.manday);
    response.data.forEach(function (value:any) {
      sum += value.totalmanday
    });
    console.log("Manday :", sum);
    const totalManProduct = Number(ProductPrice.manday)* Number(inputAmount);

    if (sum + totalManProduct <= 8) {
      
      setInputDateStart(dateTranform);
      let datePick = new Date(dateTranform)
      datePick.setDate(date.getDate() + 1);
      const dateTranform2 = getIso8601Date(datePick);
      console.log('DateStart:',dateTranform)

      setInputDatePickup(dateTranform2);
      console.log('DatePickup:',dateTranform2)

    } else {

      let datePick = new Date(dateTranform)
      datePick.setDate(date.getDate() + 1);
      const dateTranform3 = getIso8601Date(datePick);
      setInputDateStart(dateTranform3);
      console.log('DateStart:',dateTranform3)

      let datePick2 = new Date(dateTranform)
      datePick2.setDate(date.getDate() + 2);
      const dateTranform4 = getIso8601Date(datePick2);
      setInputDatePickup(dateTranform4);
      console.log('DatePickup:',dateTranform4)
      
    }
  };



  const addCusOrder = async () => {
    let formData = new FormData()
    formData.append('name', inputName);
    formData.append('address', inputAddress);
    formData.append('email', inputEmail);
    formData.append('tel', inputTel);
    const response = await axios.post('http://127.0.0.1:8000/create_customer', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    //let cus_id = response.data.id;
    setInputCustomer(response.data.id);
    console.log("Cus_id: ", response.data.id)
    await addOrder(response.data.id);

  }
  const [ledCount,setLedCount]= useState()
  const addOrder = async (cus_id:any) => {

    let formData = new FormData();
    if (file) {
      formData.append('file', file);
      console.log('form : ',formData)
    }
    const response1 = await fetch("http://127.0.0.1:8000/upload-file1/", {
      method: "POST",
      body: formData,
  });
    if (!response1.ok) {
    throw new Error(`Failed to upload file: ${response1.status}`);
}
    const data = await response1.json();
    console.log("dataBase64",data.base64)
    console.log("data Led ",data.ledCount)
    setLedCount(data.ledCount);
    formData.append('picture_led',"data:image/png;base64,"+data.base64);
    //formData.append('picture_original',"data:image/png;base64,"+data.base64);
    //formData.append('handle', String(ischecked) );
    formData.append('date_start', inputDateStart);
    formData.append('date_pickup', inputDatePickup);
    formData.append('delivery_id', inputDelivery);
    formData.append('product_id', inputProduct);
    formData.append('amount_char', inputChar);
    formData.append('amount_icon', inputIcon);
    formData.append('amount', inputAmount);
    formData.append('totalprice', inputTotalPrice);
    formData.append('cus_id', cus_id);

    const response = await axios.post('http://127.0.0.1:8000/create_order', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response)
    //window.location.href = '/order-list';
    return data.base64;

  }



  return (

    <div>

      <HeaderToolbar></HeaderToolbar>
      <Box sx={{ display: { xs: "block", md: "flex", ml: 5 } }}>
        <Box sx={{ width: "50%", ml: 5 }}>
          <Box sx={{ width: "98%", display: "flex" }}>
            <h4>สถานะ </h4>
            <br />
            <h4>: คำสั่งทำป้ายไฟใหม่</h4>
          </Box>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }}>
            <FormLabel id="type">ประเภทป้าย *</FormLabel>
            <RadioGroup
              row
              aria-labelledby="type"
              name="type"
              sx={{ mt: 2, minWidth: 120, width: "75%" }}
              onChange={handleTypeChange} value={inputType}
            //value={type}
            >
              <FormControlLabel
                value="sign"
                control={<Radio />}
                label="ป้ายถือ"
                id='1'
              />
              <FormControlLabel
                value="headband"
                control={<Radio />}
                label="ที่คาดผม"
                id='2'
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="ห้อยคอ"
                id='3'
              />
            </RadioGroup>
          </FormControl>
          <h4>จำนวนตัวอักษร *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              onChange={handleAmountCharValue} value={inputChar}
              label=""
              id="amount_char"
              size="small"
            />
          </FormControl>
          <h4>จำนวนป้าย *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              onChange={handleAmountValue} value={inputAmount}
              label=""
              id="amount"
              size="small"
            />
          </FormControl>
          <h4>วิธีการส่ง *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <InputLabel id="delivery">เลือก</InputLabel>
            <Select
              labelId="delivery"
              id="delivery"
              label="เลือก"
              onChange={handleDeliveryChanged} value={inputDelivery}
            >

              {DeliveryData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ width: "98%", mt: 0, display: "flex" }}>
            <h4>ราคาต่อสินค้า(บาท) : {ProductPrice.price}  </h4>
          </Box>
          <Box sx={{ width: "98%", mt: -2, display: "flex" }}>
            <h4>ราคาทั้งหมดไม่รวมค่าส่ง(บาท) :{TotalPrice}  </h4>
          </Box>
          <Box sx={{ width: "98%", mt: -2, display: "flex" }}>
            <h4>วันที่คาดว่าจะได้รับป้าย : {inputDatePickup} </h4>
          </Box>
        </Box>

        <Box sx={{ width: "50%", mt: 3, ml: 8, mr: 5 }}>
          <Box
            sx={{
              width: "98%",
              m: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <h4>รหัสคำสั่งจัดทำ : - </h4>
          </Box>

          <h4>ขนาดป้าย *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <InputLabel id="size">เลือก</InputLabel>
            <Select
              labelId="product"
              id="product"
              label="เลือก"
              onChange={handleProductChanged}
              value={inputProduct}
            >

              {ProductData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h4>จำนวนสัญลักษณ์(icon) *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              label=""
              id="outlined-size-small"
              size="small"
              onChange={handleAmountIconChange}
              value={inputIcon}
            />
          </FormControl>
          {/* <h4>วันที่รับป้าย *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={handleDateChange} />

            </LocalizationProvider>
          </FormControl> */}

          <Box sx={{ width: "100%", mt: 0, ml: 0, mr: 5 }}>
            <h4>เพิ่มเติมด้ามจับ</h4>
          </Box>

          <FormControl sx={{ mt: -7, ml: -3, md: 5, minWidth: 50, width: "50%" }} size="small">

            <Checkbox checked={ischecked} onChange={(event) => {
              setIsChecked(event.target.checked)
            }} />
          </FormControl>
          {isSaveButton && <Box sx={{ width: "100%", mt: -5, ml: 0, mr: 5 }}>
            <h4>แบบป้าย </h4>
            {/* // Form Upload image // */}
            {<form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload แบบป้าย</button>
            </form>}
            {
              <Box sx={{ width: "98%", m: 1, display: "flex" }}>
              
              </Box>
            }

            <Box sx={{ width: "100%", mt: 0, ml: 0, mr: 5 }}>
              <h4> ชื่อ-นามสกุล </h4>
              <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                <TextField
                  label=""
                  id="outlined-size-small"
                  size="small"
                  onChange={handleNameChange}
                  value={inputName}
                />
              </FormControl>
              <h4>ที่อยู่</h4>
              <FormControl sx={{ mt: -1, minWidth: 120, width: "75%" }} size="small">
                <TextField
                  label=""
                  id="outlined-size-small"
                  size="small"
                  onChange={handleAddressChange}
                  value={inputAddress}
                />
              </FormControl>
              <h4>เบอร์โทร</h4>
              <FormControl sx={{ mt: -1, minWidth: 120, width: "75%" }} size="small">
                <TextField
                  label=""
                  id="outlined-size-small"
                  size="small"
                  onChange={handleTelChange}
                  value={inputTel}
                />
              </FormControl>
              <h4>อีเมล์</h4>
              <FormControl sx={{ mt: -1, minWidth: 120, width: "75%" }} size="small">
                <TextField
                  label=""
                  id="outlined-size-small"
                  size="small"
                  onChange={handleEmailChange}
                  value={inputEmail}
                />
              </FormControl>
            </Box>
          </Box>}
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", mt: 3, display: { xs: "inline-flex", md: "flex" } }}
      >
        {!isSaveButton && <Button
          variant="contained"
          onClick={estimation}
          sx={{
            mr: 2,
            bgcolor: "#5E35B1"
          }}>
          ประเมินราคา
        </Button>}
        <Button variant="contained" sx={{ bgcolor: "#5E35B1" }} onClick={handleCancel}>
          ยกเลิก
        </Button>
        {isSaveButton && <Button
          variant="contained"
          onClick={addCusOrder}
          sx={{
            ml: 2,
            bgcolor: "#5E35B1"
          }}>
          บันทึก
        </Button>}
      </Box>

      <Box sx={{ width: "98%", m: 1, display: "flex" }}>
        <Link href={"/order-list"}> Back </Link>
      </Box>

      <Box sx={{ m: -3, mr: 3, mt: -2 }}>
        <SimpleBottomNavigation />
      </Box>
    </div>
  );
}

