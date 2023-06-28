import React from "react";
import Login from "./login"
import Product from "./product/index"
import ProductCreate from "./product/create/index"
import ProductId from "./product/_id/index"
import ProductEditId from "./product/_id/edit"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/product/create' element={<ProductCreate />}></Route>
        <Route path='/product/:id' element={<ProductId />}></Route>
        <Route path='/product/edit/:id' element={<ProductEditId />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App