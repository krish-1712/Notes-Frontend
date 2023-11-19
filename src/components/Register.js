import React from 'react'

import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { url } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from "formik";
import './Register.css'




const userSchemaValidation = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(8),
  name: yup.string().required(" name is required"),
})

const Register = () => {
  let navigate = useNavigate()
  useEffect(() => {
    sessionStorage.clear()
  }, [])

  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",

    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        let res = await axios.post(`${url}/users/signup`, values)
        console.log(res)
        toast.success(res.data.message)
        sessionStorage.setItem('token', res.data.token)
        navigate('/')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  })
  return (
    <div className='register-wrapper'>
      <h1 style={{ "textAlign": "center", color: "black" }}>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" id='wid'>
          <Form.Label style={{ color: "black", fontSize: "19px", marginLeft: "160px" }}> Name</Form.Label>
          <Form.Control type="text" placeholder="Enter the  Name" className="name1" name="name" value={values.name}
            onChange={handleChange} />
          {touched.name && errors.name ? <p style={{ color: "crimson" }}>{errors.name}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "black", fontSize: "19px", marginLeft: "160px" }}>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email address" className="email1" name="email" value={values.email}
            onChange={handleChange} />
          {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "black", fontSize: "19px", marginLeft: "160px" }}>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter the Password" className="password1" name="password" value={values.password}
            onChange={handleChange} />
          {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}
        </Form.Group>
        <Button variant="primary" type='submit' className='mind' style={{ marginLeft: "320px", backgroundColor: "#007bff", color: "white" }}>
          Signup
        </Button>
      </Form>

    </div>
  )
}

export default Register