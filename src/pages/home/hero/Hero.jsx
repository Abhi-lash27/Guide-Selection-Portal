import React from 'react';
import './hero.css';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <section className='hero-homepage'>
        <div className='container-homepage'>
          <div className='row-homepage'>
            <h1 className='welcome-homepage'>WELCOME..</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat temporibus commodi similique veniam quas facere dolores alias! Ad, numquam expedita culpa molestiae doloremque similique. Repellat neque laboriosam iste corrupti eos!</p>
          </div>
        </div>
      </section>
      <div className='margin-homepage'></div>
    </>
  )
}

export default Hero;
