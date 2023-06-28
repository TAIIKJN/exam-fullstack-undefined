import React, { useState } from 'react';
import { Card, Form, Button } from 'bootstrap-4-react';
import Axios from "axios"
import { useNavigate } from 'react-router-dom';

function Login() {
  const router = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const login = () => {
    Axios.post("http://localhost:3306/user", {
      email: email,
      password: password
    }).then((request, response) => {
      if (request.data.length > 0) {
        router("/product")
      }
    })
  }
  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <Form.Group>
        <label htmlFor="exampleInputEmail1">Email</label>
        <Form.Input type="email" id="exampleInputEmail1" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputPassword1">Password</label>
        <Form.Input type="password" id="exampleInputPassword1" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
      </Form.Group>
      <Button primary type="submit" onClick={login}>Submit</Button>
    </Card>
  );
}

export default Login;