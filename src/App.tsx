import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserWarehouses from "./component/UserWarehouses/UserWarehouses";
import Products from "./component/Products/ProductsPage";
import ProductsInWarehouse from './component/Products/ProductsInWarehouse/ProductsInWarehouse'
import Warehouse from "./component/Warehouse/Warehouse";
import Group from "./component/Group/Group";
import Login from "./component/Register/Register";
import PrivateRoutes from './PrivateRoutes';
import Register from './component/Register/Register';
import Options from './component/Options/Options';
import WarehouseCreation from './component/WarehouseCreation/WarehouseCreation';
import Token from './component/Token/Token';
import Join from './component/Join/Join'
import WarehouseSelection from './component/WarehouseSelection/WarehouseSelection'
import Report from './component/Report/Report'
import Description from './component/Description/Description'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/warehouse'}
          element={
            <PrivateRoutes>
              <Warehouse />
            </PrivateRoutes>
          }
        />
        <Route
          path={'/token'}
          element={
            <PrivateRoutes>
              <Token />
            </PrivateRoutes>

          }
        />
        <Route path="/product" element={
          <PrivateRoutes>
            <Products />
          </PrivateRoutes>
        } />
        <Route
          path={'/warehouse/product'}
          element={
            <PrivateRoutes>
              <ProductsInWarehouse />
            </PrivateRoutes>

          }
        />
        <Route path="/group" element={
          <PrivateRoutes>
            <Group />
          </PrivateRoutes>
        } />
        <Route path="/report" element={
          <PrivateRoutes>
            <Report />
          </PrivateRoutes>} />
        <Route path="/option" element={
          <PrivateRoutes>
            <Options/>
          </PrivateRoutes>} />
        <Route
          path={'/warehouse/creation'}
          element={
            <PrivateRoutes>
              <WarehouseCreation />
            </PrivateRoutes>

          }
        />
        <Route
          path={'/join'}
          element={
            <PrivateRoutes>
              <Join />
            </PrivateRoutes>

          }
        />
        <Route
          path={'/warehouse/selection'}
          element={
            <PrivateRoutes>
              <WarehouseSelection />
            </PrivateRoutes>

          }
        />
        <Route
          path={'/report'}
          element={
            <PrivateRoutes>
              <Report />
            </PrivateRoutes>

          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path={'/'}
          element={
              <Description />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
