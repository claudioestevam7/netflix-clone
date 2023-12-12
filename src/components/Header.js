import React from 'react'
import './Header.css'
import usuario from './img/usuario.jpg'

function Header({black}) {
  return (
    <header className={black ? 'black' : ''}>
        <div className='header--logo'>
            <a href='/'>
                <img src="https://logosmarcas.net/wp-content/uploads/2020/04/Netflix-Logo.png" alt='Netflix'/>
            </a>
        </div>
        <div className='header--user'>
            <a href='/'>
                <img src={usuario} alt='usuario'/>
            </a>
        </div>
    </header>
  )
}

export default Header