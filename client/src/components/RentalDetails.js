import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { parseISO } from 'date-fns'

//components
import SpinnerComponent from './common/Spinner'
import StartDate from './search/StartDate'
import EndDate from './search/EndDate'
import GuestNumber from './search/GuestNumber'

const RentalDetails = () => {
  // State variables
  const [error, setError] = useState('')
  const [place, setPlace] = useState(null)
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [selectedDatesArray, setSelectedDatesArray] = useState([])
  const [minEndDate, setMinEndDate] = useState(new Date())
  const [selectedGuestNumber, setSelectedGuestNumber] = useState(null)
  const [numberOfDays, setNumberOfDays] = useState(null)
  const [maxGuestNumber, setMaxGuestNumber] = useState(null)
  const [accommodationCost, setAccommodationCost] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)
  const [serviceFee, setServiceFee] = useState(null)
  const [parentDivHeight, setParentDivHeight] = useState(null)

  // Get the id parameter from the URL
  const { id } = useParams()

  // Fetch rental details when the component mounts or "id" changes
  useEffect(() => {
    const getRental = async () => {
      try {
        const response = await axios.get(`/api/places/${id}`)
        const placeData = response.data
        setPlace(placeData)
        console.log(placeData)
      } catch (error) {
        setError(error.message)
      }
    }

    getRental()
  }, [id])

  // set max guest number
  useEffect(() => {
    const getMaxGuestNumber = async () => {
      try {
        setMaxGuestNumber(place.max_guests)
      } catch (error) {
        setError(error.message)
      }
    }

    getMaxGuestNumber()
  }, [place])

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

  useEffect(() => {
    const calculateNumberOfDays = () => {
      if (selectedStartDate && selectedEndDate) {
        const date1 = new Date(selectedStartDate)
        const date2 = new Date(selectedEndDate)
        const timeDifference = date2.getTime() - date1.getTime()
        const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24))
        setNumberOfDays(daysDifference)
      }
    }
    calculateNumberOfDays()
  }, [selectedStartDate, selectedEndDate])

  // setPricePerNight

  useEffect(() => {
    const calculatePricePerNight = () => {
      if (numberOfDays && place) {
        setAccommodationCost(numberOfDays * place.price_per_night)
        setServiceFee(Math.ceil(0.16 * place.price_per_night))
      }

      // console.log(numberOfDays, place.price_per_night)
    }
    calculatePricePerNight()
  }, [numberOfDays, place])

  useEffect(() => {
    const calculatePricePerNight = () => {
      if (numberOfDays && place) {
        if (selectedGuestNumber <= 2) {
          setAccommodationCost(numberOfDays * place.price_per_night)
          setServiceFee(Math.ceil(0.16 * place.price_per_night))
        } else {
          setAccommodationCost(Math.ceil(accommodationCost * 1.17))
          setServiceFee(Math.ceil(serviceFee * 1.2))
        }
      }

      // console.log(numberOfDays, place.price_per_night)
    }
    calculatePricePerNight()
  }, [selectedGuestNumber, place])

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
  }, [place, selectedStartDate])

  // Hhndle the guest number
  const handleGuestNumber = (e) => {
    console.log(e.target.value)
    setSelectedGuestNumber(e.target.value)
  }

  // Render the JSX
  return (
    <section className='homepage rental-details-section'>
      {place ? (
        // Rental details content
        <div className='rental-details-content'>
          <div className='title-div'>
            <h3>{place.name}</h3>
          </div>
          {/* Render rental images */}
          <div className='rental-images'>
            {/* Render first rental image */}
            <div className='first-rental-image'>
              {place.images.slice(0, 1).map((imageUrl, index) => (
                <div
                  className='rental-image-0'
                  key={index}
                  style={{ backgroundImage: `url(${imageUrl})` }}
                ></div>
              ))}
            </div>
            {/* Render other rental images */}
            <div className='other-images-container'>
              {place.images.slice(1, 5).map((imageUrl, index) => (
                <div
                  className={`rental-image rental-image-${index + 1}`}
                  key={index}
                  style={{ backgroundImage: `url(${imageUrl})` }}
                ></div>
              ))}
            </div>
          </div>
          {/* Render rental information and pricing */}
          <div className='rental-info-and-pricing'>
            {/* Rental information */}
            <div className='rental-info'>
              <p className='place-location'>{place.location}</p>
              {/* Render guest, bedroom, bed, and bathroom quantity */}
              <div className='guest-bedroom-bed-bathroom-quantity'>
                {place.max_guests > 1
                  ? `${place.max_guests} guests`
                  : `${place.max_guests} guest`}
                &nbsp;·&nbsp;
                {place.bedrooms > 1
                  ? `${place.bedrooms} bedrooms`
                  : `${place.bedrooms} bedroom`}
                &nbsp;·&nbsp;
                {place.beds > 1 ? `${place.beds} beds` : `${place.beds} bed`}
                &nbsp;·&nbsp;
                {place.bathrooms > 1
                  ? `${place.bathrooms} bathrooms`
                  : `${place.bathrooms} bathroom`}
              </div>
              <hr />
              {/* Host information */}
              <div className='host-div'>
                <p>Hosted by: {place.host}</p>
              </div>
              <hr />
              {/* Rental description */}
              <div className='description-div'>
                <p>{place.description}</p>
                {/* Render amenities */}
                {place.amenities.map((amenity, index) => (
                  <p key={index}>{amenity.text}</p>
                ))}
              </div>
              <hr />
              {/* Render reviews */}
              <h5>
                {place.reviews.length > 1
                  ? `${place.reviews.length} reviews`
                  : `${place.reviews.length} review`}
              </h5>
              {place.reviews.map((review, index) => (
                <div key={index}>
                  <p>{review.text}</p>
                </div>
              ))}
              <hr />
              {/* <div className='location-div'>
                <h5>Where you'll be</h5>
              </div> */}
            </div>
            {/* Rental calendar, guest number and pricing */}
            <div
              className='rental-pricing-and-calendar'
              style={{ height: numberOfDays === null ? '300px' : '470px' }}
            >
              <div className='price-div'>
                <p>
                  <span className='price-span'>€ {place.price_per_night}</span>{' '}
                  night
                </p>
              </div>
              <div className='calendar-choice'>
                {/* Date search*/}
                <div className='start-and-end-date'>
                  {/* Start date search*/}
                  <div className='start-date'>
                    <StartDate
                      selectedStartDate={selectedStartDate}
                      selectedEndDate={selectedEndDate}
                      handleStartDateInputChange={handleStartDateInputChange}
                    />
                  </div>
                  {/* End date search*/}
                  <div className='end-date'>
                    {/* End date search */}
                    <EndDate
                      selectedEndDate={selectedEndDate}
                      minEndDate={minEndDate}
                      handleEndDateInputChange={handleEndDateInputChange}
                    />
                  </div>
                </div>
                {/* Selecting the number of guests */}
                <div className='guest-number'>
                  <GuestNumber
                    handleGuestNumber={handleGuestNumber}
                    maxGuestNumber={maxGuestNumber}
                    selectedGuestNumber={selectedGuestNumber}
                    // handleSearchClick={handleSearchClick}
                  />
                </div>
              </div>
              {/* Reservation button */}
              <div className='reservation-button-container'>
                <button className='reserve-button'>
                  {numberOfDays ? 'Reserve' : 'Check Availability'}
                </button>
              </div>
              {/* Price breakdown */}
              {numberOfDays !== null && (
                <div className='price-breakdown'>
                  <div className='price-items'>
                    <div className='price-item'>
                      <span className='left-span'>
                        € {place.price_per_night} x {numberOfDays} nights
                      </span>
                      <span>€ {accommodationCost}</span>
                    </div>
                    <div className='price-item'>
                      <span className='left-span'>Airbnb service fee</span>
                      <span>€ {serviceFee}</span>
                    </div>
                  </div>
                  <hr />
                  <div className='price-item total-price'>
                    <span className='left-span'>Total</span>
                    <span>€ {accommodationCost + serviceFee}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Display error message or loading spinner
        <>
          {error ? (
            <p className='text-center'>{error}</p>
          ) : (
            <SpinnerComponent />
          )}
        </>
      )}
    </section>
  )
}

export default RentalDetails
