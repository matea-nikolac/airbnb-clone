const LocationSearch = ({ searchedLocation, handleWhereInputChange }) => {
  return (
    <div className='search-item' id='where'>
      <div className='search-paragraph-and-input'>
        <div>
          <p className='search-paragraph'>Where</p>
        </div>
        <input
          type='text'
          value={searchedLocation}
          onChange={handleWhereInputChange}
          placeholder='Search destinations'
          className='search-input'
        />
      </div>
      <div className='search-item-last-div' id='where'></div>
    </div>
  )
}

export default LocationSearch
