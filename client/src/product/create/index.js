import React, { useState } from 'react';
import { Card,Form } from 'bootstrap-4-react';
import Axios from "axios"
import { Button } from 'bootstrap-4-react/lib/components';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const router = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [code, setCode] = useState("");
  const [image, setImage] = useState('');

  const addProduct = () => {
    const formData = new FormData()
      formData.append("image", image);

    const form = {
      name: name,
      price: price,
      amount: amount,
      code: code,
    }
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value)
    })

    Axios.post("http://localhost:3306/product", formData).then((request, response) => {
      if (request.data.length > 0) {
        router("/product")
      }
    })
  }
  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <Form.Group>
        <label htmlFor="exampleInputName">ชื่อสินค้า</label>
        <Form.Input type="text" id="exampleInputName" onChange={(e) => { setName(e.target.value) }} />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputPrice">ราคาสินค้า</label>
        <Form.Input type="number" id="exampleInputPrice" onChange={(e) => { setPrice(e.target.value) }} />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputAmount">จำนวนสินค้า</label>
        <Form.Input type="number" id="exampleInputAmount" onChange={(e) => { setAmount(e.target.value) }} />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputCode">รหัสสินค้า</label>
        <Form.Input type="text" id="exampleInputCode" onChange={(e) => { setCode(e.target.value) }} />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputImage">รหัสสินค้า</label>
        <Form.Input type="file" id="exampleInputImage" onChange={(e) => { setImage(e.target.files[0]) }} />
      </Form.Group>
      <Button primary type="submit" onClick={addProduct}>บันทึก</Button>
    </Card>
  );
}


export default CreateProduct;