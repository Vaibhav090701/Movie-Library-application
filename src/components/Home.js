import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {

  const navigate=useNavigate();

  const handleClick=()=>{

    navigate("/login");

  }

  return (
    <section className="hero">
        <img className='opacity-30' src='https://i0.wp.com/bogatyr.club/uploads/posts/2023-03/1678811635_bogatyr-club-p-netfliks-fon-foni-vkontakte-29.jpg?ssl=1'></img>
        <div className="hero-content">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <p>Dive into a world of endless entertainment. Stream and discover movies you'll love.</p>
            <button type="button" onClick={handleClick} >Login to Your Library</button>
        </div>
    </section>
  )
}

export default Home