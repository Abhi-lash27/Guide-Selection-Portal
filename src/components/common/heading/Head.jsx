import React from 'react'
import logo from "../../../images/logo.png"

const Head = () => {
  return (
    <div>
        <section className='head-header'>
            <div className='flexSB-header'>
                <div className='logo-header'>
                    <img src={logo} alt='logo'/>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Head