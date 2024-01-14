import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  const [ places, setPlaces ] = useState([])
  const [ error, setError ] = useState('')


  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await axios.get('/api/places')
        console.log(response)
        const placeData = response.data
        setPlaces(placeData)
      } catch (err) {
        setError(err)
      }
    }
    getPlaces()
  }, [])

return (
  <>
    <section className='homepage'>
      <section className="category-container">
      </section>
      <section className='places-container'>
      {places.length > 0 ?
        places.map(place => {
          // display all the places as cards on the home page
          const { _id, images, location, price_per_night } = place
          console.log(_id, images[0], location, price_per_night)
          return (
            <div className='place-card'>
              <div className='image-container' key={_id}>
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