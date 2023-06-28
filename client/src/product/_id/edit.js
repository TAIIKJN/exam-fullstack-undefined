import React, { useEffect, useState } from 'react';
import { Card, Form } from 'bootstrap-4-react';
import Axios from "axios"
import { Button } from 'bootstrap-4-react/lib/components';
import { useNavigate, useParams } from 'react-router-dom';

function CreateProduct() {
  const router = useNavigate()
  const params = useParams()
  const [data, setData] = useState([])
  const [name, setName] = useState(data.name)
  const [price, setPrice] = useState(0)
  const [amount, setAmount] = useState(0)
  const [code, setCode] = useState("")
  const [image, setImage] = useState(null)

  const showData = () => {
    Axios.get(`http://localhost:3306/product/${params.id}`).then((request, response) => {
      setData(request.data[0])
      setName(request.data[0].name)
      setPrice(request.data[0].price)
      setAmount(request.data[0].amount)
      setCode(request.data[0].code)
      setImage(request.data[0].image)
    })
  }
  useEffect(() => {
    showData()
  }, [params.id])
  const editProduct = () => {
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

    Axios.patch(`http://localhost:3306/product/${params.id}`, formData).then((request, response) => {
      if (request.data.length > 0) {
        router(`/product/${params.id}`)
      }
    })
  }
  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <Card.Title>ข้อมูลสินค้า</Card.Title>
        <Form.Group>
          <label htmlFor="exampleInputName">ชื่อสินค้า</label>
        <Form.Input type="text" id="exampleInputName" value={name} onChange={(e) => { setName(e.target.value) }} />
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputPrice">ราคาสินค้า</label>
        <Form.Input type="number" id="exampleInputPrice" value={price}  onChange={(e) => { setPrice(e.target.value) }} />
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputAmount">จำนวนสินค้า</label>
        <Form.Input type="number" id="exampleInputAmount" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputCode">รหัสสินค้า</label>
        <Form.Input type="text" id="exampleInputCode" value={code}  onChange={(e) => { setCode(e.target.value) }} />
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputImage">รหัสสินค้า</label>
          <Form.Input type="file" id="exampleInputImage" onChange={(e) => { setImage(e.target.files[0]) }} />
        </Form.Group>
        <Button primary type="submit" onClick={editProduct}>บันทึก</Button>
    </Card>
  );
}


export default CreateProduct;