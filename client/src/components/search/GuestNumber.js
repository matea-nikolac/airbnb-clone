import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const GuestNumber = ({ handleGuestNumber, handleSearchClick, isHomePage }) => {
  return (
    <div className='search-item' id='who'>
      <div className='search-paragraph-and-input'>
        <div>
          <p className='search-paragraph'>{isHomePage ? 'Who' : 'GUESTS'}</p>
        </div>
        <input
          type='number'
          onInput={(e) => handleGuestNumber(e)}
          placeholder='Add guests'
          className='search-input'
        />
      </div>
      {/* Search icon */}
      {isHomePage && (
        <div className='search-div' onClick={handleSearchClick}>
          {/* <img src={searchIcon} alt='Search' /> */}
          <FontAwesomeIcon
            className='font-awesome-icon'
            icon={faSearch}
            alt='Search'
          />
        </div>
      )}
    </div>
  )
}

export default GuestNumber
