import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../App";
import Navabar from "./Navbar";
import './Details.css';


const Details = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseAll = await axios.get(`${url}/users/getallnotes`);
      setAllUsers(responseAll.data.teacher);
      toast.success("Notes Data Fetched successfully");
    } catch (error) {
      console.error("Error fetching Notes:", error);
      toast.error("An error occurred while fetching Notes");
    }
  };




  const handleEdit = async (User) => {


    navigate(`/detailsedit/${User._id}`, { state: { User } });


  };

  const handleDelete = async (user) => {
    try {
      await axios.delete(`${url}/users/users/${user._id}`);
      toast.success("Notes deleted successfully");

      const updatedUserList = allUsers.filter((u) => u._id !== user._id);
      setAllUsers(updatedUserList);
    } catch (error) {
      toast.error("An error occurred while deleting Notes");
    }
  };


  const handleView = (user) => {
    navigate(`/viewcontent/${user._id}`, { state: { user } });
  };


  return (
    <Navabar>
      <div className="user-details-content">
        <div className="all-users-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>DOB</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.title}</td>
                  <td>{user.content}</td>
                  <td>{user.dob}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(user)}>
                        Edit
                      </button>
                      <button className="delete-button" onClick={() => handleView(user)}>
                        View
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(user)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Navabar>
  )
}

export default Details