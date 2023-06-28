import React, {useEffect, useState} from 'react';
import {Card, Row, Col, Container} from 'bootstrap-4-react';
import Axios from "axios"
import {format} from 'date-fns'
import {Button} from 'bootstrap-4-react/lib/components';

import {useNavigate, useParams} from 'react-router-dom';

function Product() {
    const router = useNavigate()
    const params = useParams()
    const [data, setData] = useState([])
    const showData = () => {
        Axios.get(`http://localhost:3306/product/${params.id}`).then((request, response) => {
            setData(request.data[0])
        })
    }
    useEffect(() => {
        showData()
    }, [params.id])

  const editProduct = () => {
    router(`/product/edit/${data.id}`)
  }

    const deleteProduct = () => {
        Axios.delete(`http://localhost:3306/product/${params.id}`)
    }
    return (
        <Container>
            <Row style={{display: "flex", justifyContent: "flex-end"}}>
                <Button primary type="submit" style={{margin: '10px', padding: '10px'}}
            onClick={editProduct}>แก้ไขสินค้า</Button>
          <Button type="submit" style={{ margin: '10px', padding: '10px', backgroundColor: "red", borderColor: "red", color: "white" }}
                        onClick={deleteProduct}>ลบสินค้า</Button>
            </Row>
            <Col>
                <Card display="inline-block" align="top" style={{width: '18rem', margin: "20px"}}>
                    <Card.Image src={`http://localhost:3306/${data.image}`}
                                style={{height: '250px', objectFit: 'cover'}}/>
                    <Card.Body>
                        <Card.Title>
                            {data.name}
                        </Card.Title>
                        <div>รหัสสินค้า: #{data.code}</div>
                        <div>จำนวนสินค้า: {data.amount} ชิ้น</div>
                        <div>ราคาสินค้า: {data.price} บาท</div>
                        {/*<div>วันที่สร้างสินค้า: {format(new Date(data.created_at), "dd-MM-yyyy")}</div>*/}
                    </Card.Body>
                </Card>
            </Col>
        </Container>

    )
}

export default Product;