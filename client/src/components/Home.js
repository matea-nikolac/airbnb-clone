import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { parseISO } from 'date-fns'

//components
import ImageCarousel from './place/ImageCarousel.js'
import LocationSearch from './search/Location.js'
import StartDate from './search/StartDate.js'
import EndDate from './search/EndDate.js'
import GuestNumber from './search/GuestNumber.js'

const Home = () => {
  const [places, setPlaces] = useState([])
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [searchedLocation, setSearchedLocation] = useState('')
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [selectedDatesArray, setSelectedDatesArray] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [minEndDate, setMinEndDate] = useState(new Date())
  const [selectedGuestNumber, setSelectedGuestNumber] = useState(null)

  //fetch the categories
  useEffect(() => {
    const getCategories = async () => {
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

  // handle the location search
  const handleWhereInputChange = (e) => {
    setSearchedLocation(e.target.value)
  }

  // handle the start date search
  const handleStartDateInputChange = (date) => {
    // Parse the selected date to ensure it is represented as a JavaScript Date object
    // `date.toISOString()` converts the selected date to an ISO 8601 string
    // `parseISO` then parses this string into a JavaScript Date object for consistent handling
    if (date !== null) {
      const startDate = parseISO(date.toISOString())
      setSelectedStartDate(startDate)
    } else {
      setSelectedStartDate('')
      setSelectedDatesArray('')
    }
  }

  // handle the end date search
  const handleEndDateInputChange = (date) => {
    // const endDate = date.toISOString()
    if (date !== null) {
      const endDate = parseISO(date.toISOString())
      setSelectedEndDate(endDate)
    } else {
      setSelectedEndDate('')
      setSelectedDatesArray([])
    }
  }

  // once both start and end date are selected, check which places are available
  useEffect(() => {
    const getDatesInRange = () => {
      const datesArray = []
      const currentDate = new Date(selectedStartDate)

      // create the dates in range array
      while (currentDate <= selectedEndDate) {
        const month = currentDate.getMonth() + 1
        const day = currentDate.getDate()
        const dateString = `${month.toString().padStart(2, '0')}-${day
          .toString()
          .padStart(2, '0')}`
        console.log(typeof dateString)
        datesArray.push(dateString)
        currentDate.setDate(currentDate.getDate() + 1)
      }

      setSelectedDatesArray(datesArray)
    }

    if (selectedStartDate && selectedEndDate) {
      getDatesInRange()
    }
  }, [places, selectedStartDate, selectedEndDate])

  // make sure that the minimal end date is either todayDate, or the selectedStartDate
  useEffect(() => {
    const handleMinEndDate = () => {
      const todayDate = new Date()
      setMinEndDate(
        selectedStartDate > todayDate ? selectedStartDate : todayDate
      )
    }
    if (selectedStartDate) {
      handleMinEndDate()
    }
  }, [places, selectedStartDate])

  // handle the guest number
  const handleGuestNumber = (e) => {
    console.log(e.target.value)
    setSelectedGuestNumber(e.target.value)
  }

  // a function that filters places based on search input and category choice

  const filterPlaces = (place) => {
    const locationMatch = place.location
      .toLowerCase()
      .includes(searchedLocation.toLowerCase())
    const dateMatch = selectedDatesArray.every((date) =>
      place.availability.includes(date)
    )
    const guestMatch = place.max_guests >= selectedGuestNumber
    const categoryMatch =
      !selectedCategory || place.category === selectedCategory

    // Include the place in the result if all of the criteria match
    if (selectedCategory) {
      return (locationMatch && dateMatch && guestMatch && categoryMatch) || null
    } else {
      // covering the scenario in the search button is clicked but category isn't selected
      return (locationMatch && dateMatch && guestMatch) || null
    }
  }

  const handleSearchClick = () => {
    console.log('clicked')

    // if the start date is selected, and end date isn't, automatically set the end date as the next day
    if (selectedStartDate !== null && selectedEndDate === null) {
      const nextDay = new Date(selectedStartDate)
      nextDay.setDate(nextDay.getDate() + 1)
      setSelectedEndDate(nextDay)
    }
    // if the end day is selected, and the start date isn't, automatically set the start date as the previous day
    if (selectedEndDate !== null && selectedStartDate === null) {
      const previousDay = new Date(selectedEndDate)
      previousDay.setDate(previousDay.getDate() - 1)
      setSelectedStartDate(previousDay)
    }

    const searchedPlaces = places.filter((place) => filterPlaces(place))
    setFilteredPlaces(searchedPlaces)
  }

  //filter the places based on the selected category
  const filterPlacesByCategory = (category) => {
    setSelectedCategory(category.name)
  }

  // for the scenario when someone already clicked 'search' but then does category change later
  useEffect(() => {
    const performSearch = () => {
      const searchedPlaces = places.filter((place) => filterPlaces(place))
      setFilteredPlaces(searchedPlaces)
    }

    performSearch()
  }, [selectedCategory])

  //! images carousel

  return (
    <>
      <section className='homepage'>
        <section className='search-container'>
          <div className='search-bar'>
            {/* Location search */}
            <LocationSearch
              searchedLocation={searchedLocation}
              handleWhereInputChange={handleWhereInputChange}
            />

            {/* Start date search*/}
            <StartDate
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              handleStartDateInputChange={handleStartDateInputChange}
              isHomePage={true}
            />

            {/* End date search */}
            <EndDate
              selectedEndDate={selectedEndDate}
              minEndDate={minEndDate}
              handleEndDateInputChange={handleEndDateInputChange}
              isHomePage={true}
            />

            {/* Guest number search */}
            <GuestNumber
              handleGuestNumber={handleGuestNumber}
              handleSearchClick={handleSearchClick}
              isHomePage={true}
            />
          </div>
        </section>

        <hr className='separator' />

        <section className='categories-container'>
          {categories &&
            categories.map((category, index) => (
              <div
                className='single-category-container'
                value={category.name}
                onClick={() => filterPlacesByCategory(category)}
                key={index}
              >
                <div className='category-image'>
                  <div
                    className='category-image-div'
                    style={{ backgroundImage: `url('${category.icon}` }}
                  ></div>
                </div>
                <button className='category-button'>{category.name}</button>
              </div>
            ))}
        </section>

        <section className='places-container'>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place, index) => {
              // display all the places as cards on the home page
              const { _id, images, location, price_per_night } = place
              return (
                <div className='place-card' key={index}>
                  <ImageCarousel images={images} _id={_id} />
                  <p className='location-title'>{location}</p>
                  <p className='price-line'>
                    <span className='price-text'>€ {price_per_night}</span>{' '}
                    night
                  </p>
                </div>
              )
            })
          ) : (
            <p>{error.message}</p>
          )}
        </section>
      </section>
    </>
  )
}

export default Home
