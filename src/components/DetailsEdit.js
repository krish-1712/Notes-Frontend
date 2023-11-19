import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";
import './DetailsEdit.css'
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navabar from "./Navbar";



const notesSchemaValidation = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  dob: yup.string().required("Date of Birth is required"),
});

const DetailsEdit = ({ user, setUser }) => {


  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { User } = location.state;

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue
  } = useFormik({
    initialValues: {
      title: "",
      content: "",
      dob: "",


    },
    validationSchema: notesSchemaValidation,
    onSubmit: async (values) => {
      try {
        let res = await axios.put(`${url}/users/notes/${id}`, values)
        console.log(res)

        toast.success("Notes details updated successfully");

        navigate("/details");
      } catch (error) {
        toast.error("An error occurred while updating Notes details");
      }
    },
  });
  useEffect(() => {


    const TeacherUser = User;



    setFieldValue('title', TeacherUser?.title)
    setFieldValue('content', TeacherUser?.content)
    setFieldValue('dob', TeacherUser?.dob)
  }, [id, setFieldValue, User])


  return (
    <Navabar>
      <div className="new">
        <Form onSubmit={handleSubmit} className="loots">
          <h1 style={{ "textAlign": "center", color: "black" }}>Edit Notes </h1>
          <Form.Group className="mb-3">
            <Form.Label className="lid" style={{ "margin-right": "530px" }}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Title"
              name="title"
              className="title"
              value={values.title}
              onChange={handleChange}
            />
            {touched.title && errors.title && (
              <p style={{ color: "crimson" }}>{errors.title}</p>
            )}
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "540px" }}>Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Content"
              name="content"
              value={values.content}
              onChange={handleChange}
              as="textarea"
              rows={3}
              style={{ width: "93%", height: "100px" }}
            />
            {touched.content && errors.content && <p style={{ color: "crimson" }}>{errors.content}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "130px" }}>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              placeholder="DD/MM/YY"
              name="dob"
              value={values.dob}
              onChange={handleChange}
              style={{ width: "93%", height: "30px" }}
            />
            {touched.dob && errors.dob && <p style={{ color: "crimson" }}>{errors.dob}</p>}
          </Form.Group>


          <br></br>
          <Button type="submit" variant="primary" className="edit-button1" >
            Edit
          </Button>
        </Form>
      </div>
    </Navabar>
  )
}

export default DetailsEdit