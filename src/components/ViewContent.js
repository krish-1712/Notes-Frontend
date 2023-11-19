
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { useParams } from 'react-router-dom';
import Navabar from './Navbar';
import './ViewContent.css';

const ViewContent = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${url}/users/teacher/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <Navabar>
      <div className="square-container">
        {user && (
          <div className="square-content">
            <p className='lime'>Title: {user.title} </p>
            <p className='lime'>Content: {user.content}</p>
            <p className='lime'>DOB: {user.dob}</p>
          </div>
        )}
      </div>
    </Navabar>
  );
};

export default ViewContent;
