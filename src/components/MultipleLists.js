import React, { useEffect, useState } from 'react';
import './MultipleLists.css'

const MultipleLists = () => {

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
      const parsedLists = JSON.parse(storedLists);
      setLists(parsedLists);
    }
  }, []);

  return (
    <div className='w-full'>
      {lists.map((list) => (
        <div key={list.id}>
            <h1 className='text-xl font-semibold pl-2 py-2'>{list.name.name}</h1>
            <hr></hr>
     <div className='row'>
        <div  className='row_posters' style={{width: '100%', background:'transparent'}}>
        {list.movies.map((movie) => (
          <div key={movie.id}>
                <img className='row_poster'
               src={movie.Poster}/>
               <span className='text-center overflow-hidden'>{movie.Title}</span>
          </div>
        ))}
        </div>
    </div>

        </div>
      ))}
    </div>
  );
};

export default MultipleLists;
