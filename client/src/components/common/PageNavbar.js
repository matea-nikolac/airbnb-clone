import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/airbnb_logo.png'
import personIcon from '../../images/person-icon.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faInfoCircle } from '@fortawesome/free-solid-svg-icons' // Import the info circle icon

const PageNavbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className='navbar'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          <img className='nav-logo' src={logo} alt='Airbnb logo' />
        </Link>

        <div className='nav-right-hand-side'>
          <div className='airbnb-your-home'>
            <Link to='/host/homes' className='nav-link'>
              Airbnb your home
            </Link>
          </div>

          <div className='toggle-menu'>
            <button className='toggle-icon' onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <img className='person-icon' src={personIcon} alt='Person Icon' />
          </div>

          {showMenu && (
            <>
              <div className='navbar-collapse'>
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link to='/login' className='nav-link'>
                      Log In
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/signup' className='nav-link'>
                      Sign Up
                    </Link>
                  </li>
                  <hr />
                  <li className='nav-item'>
                    <Link to='https://www.airbnb.com/help' className='nav-link'>
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default PageNavbar
