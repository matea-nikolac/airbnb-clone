import { useState, useEffect } from 'react'
import axios from 'axios'
import searchIcon from '../images/search-icon.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
// import { startSession } from 'mongoose';


const Home = () => {

  const [ places, setPlaces ] = useState([])
  const [ categories, setCategories ] = useState([])
  const [ error, setError ] = useState('')
  const [ filteredPlaces, setFilteredPlaces ] = useState([])
  const [searchedLocation, setSearchedLocation] = useState('')
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [selectedEndDate, setSelectedEndDate] = useState('')

  //fetch the categories
  useEffect(() => {
    const getCategories = async() => {
      try {
        const response = await axios.get('/api/categories')
        const categoryData = response.data
        setCategories(categoryData)
      } catch (error) {
        setError(error)
      }
    }
    getCategories()
  }, [])

   //fetch the places
  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await axios.get('/api/places')
        const placeData = response.data
        setPlaces(placeData)
        setFilteredPlaces(placeData)
      } catch (err) {
        setError(err)
      }
    }
    getPlaces()
  }, [])


   //filter the places based on the selected category
  const filterPlacesByCategory = (category) => {
    const selectedCategory = category.name
  
    const placesInsideSelectedCategory = places.filter(place => {
      return place.category === selectedCategory;
    });
  
    setFilteredPlaces(placesInsideSelectedCategory)
  }

  // handle the location search
  const handleWhereInputChange = (e) => {
    setSearchedLocation(e.target.value)
    const searchedPlaces = places.filter(place => place.location.toLowerCase().includes(searchedLocation.toLowerCase()))
    setFilteredPlaces(searchedPlaces)
    }

  // handle the start date search
  const handleStartDateInputChange = (date) => {
    // Parse the selected date to ensure it is represented as a JavaScript Date object
    // `date.toISOString()` converts the selected date to an ISO 8601 string
    // `parseISO` then parses this string into a JavaScript Date object for consistent handling
    const startDate = parseISO(date.toISOString())
    setSelectedStartDate(startDate)

  }

  // handle the end date search
  const handleEndDateInputChange = (date) => {
    // const endDate = date.toISOString()
    const endDate = parseISO(date.toISOString())
    setSelectedEndDate(endDate)
  }

return (
  <>
    <section className='homepage'>
    <section className='search-container'>
  <div className="search-bar">
    {/* First item */}
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

    {/* Second item */}
    <div className='search-item' id='start-date'>
      <div className='search-paragraph-and-input'>
        <div>
          <p className='search-paragraph'>When</p>
        </div>
        {/* <input
          type='text'
          onChange={() => handleWhenInputChange()}
          placeholder='Add dates'
          className='search-input'
        /> */}
        <DatePicker
          selected={selectedStartDate}
          value={selectedStartDate}
          maxDate={selectedEndDate}
          onChange={handleStartDateInputChange}
          placeholderText='Add dates'
          className='search-input'
        />
      </div>
      <div className='search-item-last-div' id='when'></div>
    </div>

     {/* Third item */}
    <div className='search-item' id='end-date'>
      <div className='search-paragraph-and-input'>
        <div>
          <p className='search-paragraph'>When</p>
        </div>
        {/* <input
          type='text'
          onChange={() => handleWhenInputChange()}
          placeholder='Add dates'
          className='search-input'
        /> */}
        <DatePicker
          selected={selectedEndDate}
          value={selectedEndDate}
          minDate={selectedStartDate}
          onChange={handleEndDateInputChange}
          placeholderText='Add dates'
          className='search-input'
        />
      </div>
      <div className='search-item-last-div' id='when'></div>
    </div>

    {/* Third item */}
    <div className='search-item' id='who'>
      <div className='search-paragraph-and-input'>
        <div>
          <p className='search-paragraph'>Who</p>
        </div>
        <input
          type='text'
          // onChange={() => handleWho()}
          placeholder='Add guests'
          className='search-input'
        />
      </div>
    </div>

    {/* Search icon */}
    <div className='search-icon'>
      <img src={searchIcon} alt='Search' />
    </div>
  </div>
</section>

      <section className="categories-container">
        {categories && categories.map((category, index) => (
          <div className='single-category-container' 
          value={category.name} 
          onClick={() => filterPlacesByCategory(category)}
          key = {index}
          >
            <div className='category-image'>
              <div className='category-image-div' style={{ backgroundImage: `url('${category.icon}` }}></div>
            </div>
            <button className='category-button'>{category.name}</button>
          </div>
        ))}
      </section>
      <section className='places-container'>
      {filteredPlaces.length > 0 ?
        filteredPlaces.map((place, index) => {
          // display all the places as cards on the home page
          const { images, location, price_per_night, availability } = place
          console.log('backend type', typeof(availability))
          return (
            <div className='place-card' key = {index}>
              <div className='image-container'>
                <div className='image-div' style={{ backgroundImage: `url('${images[0]}')` }}></div>
              </div>
              <p className='location-title'>{location}</p>
              <p className='price-line'><span className='price-text'>€ {price_per_night}</span> night</p>
            </div>
          )
        })
      :
      <p>{error.message}</p>}
    </section>
  </section>
  </>
)
}

export default Home