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

  // Get the id parameter from the URL
  const { id } = useParams()

  // Fetch rental details when the component mounts or "id" changes
  useEffect(() => {
    const getRental = async () => {
      try {
        const response = await axios.get(`/api/places/${id}`)
        const placeData = response.data
        setPlace(placeData)
      } catch (error) {
        setError(error.message)
      }
    }

    getRental()
  }, [id])

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

  // handle the guest number
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
            <div className='rental-pricing-and-calendar'>
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
                    // handleSearchClick={handleSearchClick}
                  />
                </div>
              </div>
              {/* Reservation button */}
              <div className='reservation-button-container'>
                <button className='reserve-button'>Reserve</button>
              </div>
              {/* Price breakdown */}
              <div className='price-breakdown'>
                <div className='price-item'>
                  <span className='left-span'>€ 199 x 5 nights</span>
                  <span>€ 995</span>
                </div>
                <div className='price-item'>
                  <span className='left-span'>Airbnb service fee</span>
                  <span>€ 169</span>
                </div>
                <div className='price-item'>
                  <span className='left-span'>Taxes</span>
                  <span>€ 13</span>
                </div>
                <hr />
                <div className='price-item total-price'>
                  <span>Total</span>
                  <span>€ 1,177</span>
                </div>
              </div>
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
