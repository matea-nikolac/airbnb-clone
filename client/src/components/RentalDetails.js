import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SpinnerComponent from './common/Spinner'

const RentalDetails = () => {
  // State variables
  const [error, setError] = useState('')
  const [place, setPlace] = useState(null)

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
              <h4>{place.location}</h4>
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
              <div className='location-div'>
                <h5>Where you'll be</h5>
              </div>
            </div>
            {/* Rental pricing */}
            <div className='rental-pricing'>
              <p>Rental pricing</p>
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
