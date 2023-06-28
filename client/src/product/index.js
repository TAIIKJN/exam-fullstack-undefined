import React, {useEffect, useState} from 'react';
import {Card, Row, Col, Container} from 'bootstrap-4-react';
import Axios from "axios"
import {format} from 'date-fns'
import {Button} from 'bootstrap-4-react/lib/components';
import {useNavigate} from 'react-router-dom';

function Product() {
    const router = useNavigate()
    const [data, setData] = useState([])
    const showData = () => {
        Axios.get("http://localhost:3306/product").then((request, response) => {
            setData(request.data)
        })
    }
    useEffect(() => {
        showData()
    }, [])
    const addProduct = () => {
        router("/product/create")
    }
    return (
        <Container>
            <Button primary type="submit" style={{margin: '10px', padding: '10px'}}
                    onClick={addProduct}>สร้างสินค้าใหม่</Button>
            <Row>
                {data.map((item, key) => {
                    return (<Col sx="4" lg="4" key={key}>
                        <Card display="inline-block" align="top" mr="3" style={{width: '18rem', margin: "20px"}}>
                            <Card.Image src={`http://localhost:3306/${item.image}`}
                                        style={{height: '250px', objectFit: 'cover'}}/>
                            <Card.Body>
                                <a href={`/product/${item.id}`}>
                                    {item.name}
                                </a>
                                <div>รหัสสินค้า: #{item.code}</div>
                                <div>จำนวนสินค้า: {item.amount} ชิ้น</div>
                                <div>ราคาสินค้า: {item.price} บาท</div>
                            </Card.Body>
                        </Card>
                    </Col>)
                })}

            </Row>
        </Container>

    )
}

export default Product;