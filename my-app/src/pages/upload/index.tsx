import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import ImageUpload from "../../components/ImageUpload";
import { Box, Button } from '@mui/material';

export default function Upload() {
    const [count, setCount] = useState(0)
    const [cats, setCat] = useState([])
    const [test, setTest] = useState([])

    const onAddNumber = () => {
        const result = count + 1
        //const result1 
        //console.log("Peet")
        callService()
     
    }

    const addOrder = async () => {

        const formData = new FormData();
        
        if (file) {
            formData.append('file', file);
            console.log('form : ',formData)
          }
       

        const response = await fetch("http://127.0.0.1:8000/upload-file/", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload file: ${response.status}`);
        }

        const data = await response.json();
        return data.base64;
       
      }
    


    const callService = async () => {
        //const Value = 1;
        const response: any = await axios.post(`http://127.0.0.1:8000/upload-file/`)
        console.log(response)

    }


    // const callTest = async () => { 
    //     const response: any = await axios.get('http://127.0.0.1:8000/test')
    //     console.log(response)
    //     setTest(response)
    //     //console.log("data:",test.)
    //     //console.log(data.name)

    //   };

    // const callServiceUpload = async () => { 

    //     const bodyFormData = new FormData()
    //     bodyFormData.append('image' image)
    //     const response: any = await axios.post('url', bodyFormData, {  headers : { 'Content-type' : 'multipart/form-data'} })
    // }

    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: handle file upload

        // const response = await fetch("http://127.0.0.1:8000/upload-file/", {
        //     method: "POST",
        //     body: formData,
        // });

        // if (!response.ok) {
        //     throw new Error(`Failed to upload file: ${response.status}`);
        // }

        // const data = await response.json();
        // return data.base64;

    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            //console.log("File:", file)
        }
    }

    return (
        <>

            <div>
                count : {count}
                {/* data : {test.map(test => <div>{test.data}</div>)} */}
            </div>
            <button onClick={onAddNumber}>
                Upload page
            </button>
            {/* { 
                cats.map((cat: any) => { 
                    return (<div>
                        <img src={cat.url}/>
                    </div>)
                })
            } */}
            {/* {
                test.map((testty: any) => { 
                    return ( <div>
                        data : { testty }
                        </div>)
                })
            } */}

            <Box sx={{ width: "100%", mt: -5, ml: 0, mr: 5 }}>
                {/* // Form Upload image // */}
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit" >Upload แบบป้าย</button>
                </form>

            </Box>
            <Button
                variant="contained"
                onClick={addOrder}
                sx={{
                    ml: 2,
                    bgcolor: "#5E35B1"
                }}>
                บันทึก
            </Button>



            <Image src="/flowers/flower.jpg" alt="flower" width={100} height={100} />
            <Link href={"/"}> Link to </Link>

        </>

    )
}