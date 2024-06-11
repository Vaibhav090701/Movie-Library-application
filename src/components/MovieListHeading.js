import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const MovieListHeading = (props) => {
  return (
    <div className='flex justify-center gap-3 py-5 px-5'>
      <div className='relative w-full max-w-lg'>
        <SearchIcon 
          className='absolute top-[60%] left-3 transform -translate-y-1/2 text-gray-400'
          style={{ fontSize: 32 }} // Adjust the fontSize as needed
        />
        <input 
          type='text' 
          className='lg:h-[3rem] mt-3 lg:w-[30rem] h-[2rem] w-[20rem] rounded-full bg-transparent border-2 text-xl pl-12' 
          placeholder='Type to search....' 
          value={props.searchValue} 
          onChange={(event) => props.setSearchValue(event.target.value)}
        />    
      </div>
    </div>
  );
}

export default MovieListHeading;
