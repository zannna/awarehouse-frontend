import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserWarehouses from "./component/UserWarehouses/UserWarehouses";
import Products from "./component/Products/ProductsPage";
import ProductsInWarehouse from './component/Products/ProductsInWarehouse/ProductsInWarehouse'
import Warehouse from "./component/Warehouse/Warehouse";
import FreePlace from "./component/FreePlace/FreePlace";
import Group from "./component/Group/Group";
import Login from "./component/Register/Register";
import PrivateRoutes from './PrivateRoutes';
import Register from './component/Register/Register';
import Options from './component/Options/Options';
import WarehouseCreation from './component/WarehouseCreation/WarehouseCreation';
import Token from './component/Token/Token';
import Join from './component/Join/Join'
import WarehouseSelection from './component/WarehouseSelection/WarehouseSelection'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <PrivateRoutes>
              <Warehouse />
            </PrivateRoutes>

          }
        />
        <Route
          path={'/t'}
          element={
            <PrivateRoutes>
              <Token />
            </PrivateRoutes>

          }
        />
        {/* <Route path="/" element={<Warehouse />} /> */}
        <Route path="/p" element={
          <PrivateRoutes>
            <Products />
          </PrivateRoutes>
        } />
        <Route
          path={'/pw'}
          element={
            <PrivateRoutes>
              <ProductsInWarehouse />
            </PrivateRoutes>

          }
        />
        <Route path="/f" element={<FreePlace />} />
        <Route path="/g" element={
          <PrivateRoutes>
            <Group />
          </PrivateRoutes>
        } />
        <Route path="/r" element={<Register />} />
        <Route path="/o" element={<Options />} />
        <Route
          path={'/wc'}
          element={
            <PrivateRoutes>
              <WarehouseCreation />
            </PrivateRoutes>

          }
        />
        <Route
          path={'/j'}
          element={
            <PrivateRoutes>
              <Join />
            </PrivateRoutes>

          }
        />
        <Route
          path={'/ws'}
          element={
            <PrivateRoutes>
              <WarehouseSelection />
            </PrivateRoutes>

          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
