import React, { useState } from 'react';
import '../App.css';
import { Box, Button, FormLabel, List, ListItem, ListItemButton, ListItemText, Modal, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import './MovieList.css';

const MovieList = (props) => {
  const initialValues = {
    movieName: "",
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'gray',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showLists, setShowLists] = useState(false);


  const handleSubmit = (name) => {
    console.log("form values", name);
    setShowLists(true);
  }


  const handleOpen = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
    setShowLists(false);
  };

  const handleAddMovie = (listId) => {
    props.onAddMovieToList(listId, selectedMovie);
    handleClose();
  };

  return (
    <div className='movieListContainer '>
      {
        props.movies.map((movie, index) => (
          <div className='movieContainer' key={index}>
            <img src={movie.Poster} className='coverImage' onClick={() => handleOpen(movie)} />
            <span className='movieName'>{movie.Title}</span>
          </div>
        ))
      }

      {selectedMovie && (
        <Modal
          open={!!selectedMovie}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='flex flex-wrap justify-center'>
              <img className='w-[10rem] h-[10rem] lg:h-[16rem] lg:w-[14rem] object-contain' src={selectedMovie.Poster} alt='movie' />
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                  <FormLabel>
                    <span className='font-semibold'>Movie name:- </span>{selectedMovie.Title}
                  </FormLabel>
                  <br />
                  <FormLabel>
                    <span className='font-semibold'>Year:- </span>{selectedMovie.Year}
                  </FormLabel>
                  <br />
                  <FormLabel>
                    <span className='font-semibold'>Type:- </span>{selectedMovie.Type}
                  </FormLabel>
                  <br />
                  <Button sx={{ mt: 2, padding: "1rem" }} type='submit' fullWidth variant='contained'>Add to List</Button>
                </Form>
              </Formik>

              {showLists && (
                <Box sx={style}>
                  {props.lists.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemButton onClick={() => handleAddMovie(item.id)}>
                        <ListItemText primary={item.name.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </Box>
              )}
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default MovieList;
