import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  p: 4,
  borderRadius: '8px',
  background: 'linear-gradient(145deg, #f0f0f3, #c8c8cc)',
};

const ListCreater = ({ onCreateList }) => {
  const initialValues = {
    list: "",
  };

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const newList = { name: values.list }; // Add a unique identifier to each list
    onCreateList(newList);
    navigate("/movies");
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant='h5' className='text-center text-black' mb={2}>
            Name
          </Typography>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                as={TextField}
                name="list"
                label="List Name"
                fullWidth
                variant="outlined"
                margin="normal"
              />

              <Button
                sx={{ mt: 2, padding: "1rem" }}
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >
                Create
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

export default ListCreater;
