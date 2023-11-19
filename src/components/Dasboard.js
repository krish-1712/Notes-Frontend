import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from "../App";
import './Dasboard.css'
import "react-toastify/dist/ReactToastify.css";
import Navabar from './Navbar';

const userSchemaValidation = yup.object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
    dob: yup.string().required("Date of Birth is required"),
});

const Dasboard = () => {

    const navigate = useNavigate();

    const { handleSubmit, handleChange, errors, touched, values } = useFormik({
        initialValues: {
            title: "",
            content: "",
            dob: "",
        },
        validationSchema: userSchemaValidation,
        onSubmit: async (values) => {
            try {
                let res = await axios.post(`${url}/users/notes  `, values)
                console.log(res)


                toast.success("Content added successfully");


                navigate("/details");

            } catch (error) {

                toast.error("An error occurred while adding user");
            }
        },



    });
    return (
        <Navabar>
            <div className="new">
                <Form onSubmit={handleSubmit}>
                    <h1 style={{ "textAlign": "center", color: "black" }}>Create Notes</h1>
                    <Form.Group className="mb-3">
                        <Form.Label className="right" >Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Title"
                            name="title"
                            className="title"
                            value={values.title}
                            onChange={handleChange}

                        />
                        {touched.title && errors.title && <p style={{ color: "crimson" }}>{errors.title}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="right" >Content</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Content"
                            name="content"
                            className="content"
                            value={values.content}
                            onChange={handleChange}
                            as="textarea"
                            rows={3}
                        />
                        {touched.content && errors.content && <p style={{ color: "crimson" }}>{errors.content}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="right" >Date of Birth</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="DD/MM/YYYY"
                            name="dob"
                            className="dob"
                            value={values.dob}
                            onChange={handleChange}
                        />
                        {touched.dob && errors.dob && <p style={{ color: "crimson" }}>{errors.dob}</p>}
                    </Form.Group>

                    <br></br>

                    <Button
                        type="submit"
                        variant="primary"
                        className="add-button1"
                    >
                        Save
                    </Button>
                </Form>
            </div>
        </Navabar>
    )
}

export default Dasboard