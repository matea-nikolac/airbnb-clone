import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// const generatePlaceholderText = (selectedGuestNumber) => {
//   if (selectedGuestNumber === 1) {
//     return '1 guest'
//   } else {
//     return `${selectedGuestNumber} guests`
//   }
// }

const GuestNumber = ({
  handleGuestNumber,
  handleSearchClick,
  isHomePage,
  maxGuestNumber,
  selectedGuestNumber,
}) => {
  return (
    <div className='search-item' id='who'>
      <div className='search-paragraph-and-input'>
        <div>
          <p className='search-paragraph'>{isHomePage ? 'Who' : 'GUESTS'}</p>
        </div>
        <input
          type='number'
          onInput={(e) => handleGuestNumber(e)}
          placeholder='add guests'
          className='search-input'
          min='1'
          max={maxGuestNumber}
          defaultValue='1'
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
