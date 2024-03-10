import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import SpinnerComponent from "./common/Spinner"

const RentalDetails = () => {
  const [error, setError] = useState("")
  const [place, setPlace] = useState(null) // Initialize place state as null

  const { id } = useParams()

  useEffect(() => {
    const getRental = async () => {
      try {
        const response = await axios.get(`/api/places/${id}`)
        const placeData = response.data
        setPlace(placeData)
      } catch (error) {
        setError(error.message) // Set error message in case of error
      }
    }

    getRental()
  }, [id])

  return (
    <section className='homepage rental-details-section'>
      {place ? (
        <div className='rental-details-content'>
          <div className='title-div'>
            <h2>{place.name}</h2>
          </div>

          <div className='rental-images'>
            <div className='first-rental-image'>
              {
                // Create a div container for the first image with background image
                place.images.slice(0, 1).map((imageUrl, index) => (
                  <div
                    className='rental-image-0'
                    key={index}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  ></div>
                ))
              }
            </div>

            <div className='other-images-container'>
              {
                // Create a div container for the other images with background image
                place.images.slice(1, 5).map((imageUrl, index) => (
                  <div
                    className={`rental-image rental-image-${index + 1}`}
                    key={index}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  ></div>
                ))
              }
            </div>
          </div>

          <div className='rental-info-and-pricing'>
            <div className='rental-info'>
              <p>rental info</p>
            </div>
            <div className='rental-pricing'>
              <p>rental pricing</p>
            </div>
          </div>
        </div>
      ) : (
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
