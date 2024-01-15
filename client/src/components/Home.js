import { useState, useEffect } from 'react'
import axios from 'axios'
import searchIcon from '../images/search-icon.png'


const Home = () => {

  const [ places, setPlaces ] = useState([])
  const [ categories, setCategories ] = useState([])
  const [ error, setError ] = useState('')
  const [ filteredPlaces, setFilteredPlaces ] = useState([])
  const inputField = [ 'Where', 'When', 'Who' ]
  
  //fetch the categories
  useEffect(() => {
    const getCategories = async() => {
      try {
        const response = await axios.get('/api/categories')
        const categoryData = response.data
        console.log(categoryData)
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
  const filterPlacesByCategory = (event) => {
    const selectedCategory = event.target.value;
  
    const placesInsideSelectedCategory = places.filter(place => {
      return place.category === selectedCategory;
    });
  
    setFilteredPlaces(placesInsideSelectedCategory)
  }

return (
  <>
    <section className='homepage'>
      <section className='search-container'>
        <div className="search-bar">
          {inputField.map(inputItem => (
            <input
              type = 'text'
               // value={when}
                // onChange={(e) => setWhen(e.target.value)}
              placeholder={inputItem}
              className='search-input'
            />
          ))}
          <div className='search-icon'>
            <img src={searchIcon} alt='Search' />
          </div>
        </div>
      </section>
      <section className="categories-container">
        {categories && categories.map(category => (
          <div className='single-category-container'>
            <div className='category-image'>
              <div className='category-image-div' style={{ backgroundImage: `url('${category.icon}` }}></div>
            </div>
            <button className='category-button' value={category.name} onClick={filterPlacesByCategory}>{category.name}</button>
          </div>
        ))}
      </section>
      <section className='places-container'>
      {filteredPlaces.length > 0 ?
        filteredPlaces.map(place => {
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