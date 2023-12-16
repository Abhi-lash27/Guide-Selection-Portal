import React from 'react'
import './hero.css'
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
                <div className='button-homepage'>
                    <button className='primary-btn-homepage-1'>
                        Get Started<i className='icon-homepage'><FaArrowRight /></i>
                    </button>
                    <button className='primary-btn-homepage-2'><Link to='/register'>
                        Register Here<i className='icon-homepage'><FaArrowRight /></i></Link>
                    </button>
                </div>
            </div>
        </div>
    </section>
    <div className='margin-homepage'></div>
    </>
  )
}

export default Hero