import React from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { url } from '../App';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { useFormik } from "formik";
import './Forgot.css';



const userSchemaValidation = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
})


const Forgot = () => {
  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${url}/users/reset`, { values });
        if (response.status === 200) {
          toast.success(response.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  })
  return (
    <div className='forgot-wrapper'>
      <h1 style={{ "textAlign": "center", color: "black" }}>Forgot Password</h1>
      <h4 className='for' style={{ "textAlign": "center", fontSize: "19px" }}>Enter The Email Address Associate With your Account<br></br>
        and we will Send you a Link to Reset your Password </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className='rid' style={{ fontSize: "19px", marginRight: "160px" }}>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email address" className="email" id='email' name="email" value={values.email}
            onChange={handleChange} style={{ color: "black" }} />
          {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}
        </Form.Group>
        <Button variant="primary" type="submit" className='continue-button' style={{ backgroundColor: "#007bff", borderRadius: "5px", color: "white", marginTop: "20px" }}>
          Continue
        </Button>
      </Form>
    </div>
  )
}

export default Forgot