import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline:"none",
    boxShadow: 24,
    p: 4,
  };


const Auth = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const handleonClose=()=>{
        navigate("/")
    }
      
  return (
    <div>
        <Modal onClose={handleonClose} open={
            location.pathname==="/register" || location.pathname==="/login"
        } >
            <Box sx={style}>
                {location.pathname==="/register"?<RegisterForm/>:<LoginForm/>}
            </Box>

        </Modal>
    </div>
  )
}

export default Auth