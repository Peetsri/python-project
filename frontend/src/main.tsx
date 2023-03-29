import { Box } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App'
import HeaderToolbar from './component/HeaderToolbar'
import ResponsiveAppBar from './feature/MainMenu'
import StickyHeadTable from './feature/OrderList'
import './index.css'
import Container from '@mui/material/Container';
import { display } from '@mui/system'
import BasicTextFields, { InitialFunctionlist } from './feature/OrderInput'
import { InitialFunctionlistTest } from './feature/test'
import { OrderDetaillist } from './feature/OrderDetail'
import  OrderList  from './feature/OrderList'
import DesignDetail from './feature/DesignDetail'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(


  <Container fixed>
    <Box sx={{ height: "100vh", width: 1420  }}>
    <React.StrictMode>
        <HeaderToolbar />
         <BrowserRouter>
              <Routes>
                <Route path='/' element={<OrderList />} />
                <Route path='/design-detail/' element={<DesignDetail />} />
                <Route path='/order-detail/' element={<OrderDetaillist />} />
              </Routes>
            </BrowserRouter> 
       
        {/* <DesignDetail /> */}
    </React.StrictMode>
    </Box>
  </Container>

)
