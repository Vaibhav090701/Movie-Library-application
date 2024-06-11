import React, { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import ProtectedRoute from './components/Auth/ProtectedRoute.js';
import Home from './components/Home.js';
import ListCreater from './components/ListCreater.js';
import MultipleLists from './components/MultipleLists.js';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [lists, setLists] = useState(() => JSON.parse(localStorage.getItem('lists')) || []);

    const handleCreateList = (listName) => {
        const newList = { id: Date.now(), name: listName, movies: [] };
        const updatedLists = [...lists, newList];
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    };

    const handleAddMovieToList = (listId, movie) => {
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                return { ...list, movies: [...list.movies, movie] };
            }
            return list;
        });
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    };

    const getMovieRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=7dd30f88`;
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        if (searchValue) {
            getMovieRequest(searchValue);
        }
    }, [searchValue]);

    useEffect(() => {
        const storedLists = localStorage.getItem('lists');
        if (storedLists) {
            setLists(JSON.parse(storedLists));
        }
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);

    }, []);

    return (
        <div>
            <BrowserRouter>
                {isAuthenticated && <Navbar />}

                {!isAuthenticated && (
                    <div>
                        <Routes>
                            <Route path='/' element={<Home />} />
                        </Routes>
                    </div>
                )}

                <Routes>
                    <Route path='/list' element={
                            <ListCreater onCreateList={handleCreateList} />
                    } />

                    <Route path='/login' element={<Auth />} />
                    <Route path='/register' element={<Auth />} />

                    <Route path="/protected" element={
                        <ProtectedRoute>
                            <MovieListHeading heading='Movies' searchValue={searchValue} setSearchValue={setSearchValue} lists={lists} />
                            <div>
                                <MovieList movies={movies} lists={lists} onAddMovieToList={handleAddMovieToList} />
                            </div>
                            <div>
                                <MultipleLists />
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path='/movies' element={
                            <>
                                <MovieListHeading heading='Movies' searchValue={searchValue} setSearchValue={setSearchValue} lists={lists} />
                                <MovieList movies={movies} lists={lists} onAddMovieToList={handleAddMovieToList} />
                                <div>
                                    <MultipleLists />
                                </div>
                            </>
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

