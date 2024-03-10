import { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ImageCarousel = ({ images, _id }) => {
  console.log(typeof images, images)
  const [currentIndex, setCurrentIndex] = useState(0)

  const showPrevImage = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const showNextImage = () => {
    if (currentIndex !== images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const imageStyle = {
    backgroundImage: `url('${images[currentIndex]}')`,
  }
  return (
    <div className='image-container'>
      <Link to={`/rooms/${_id}`}>
        <div className='image-div' style={imageStyle}></div>
      </Link>
      {currentIndex !== 0 && (
        <button className='arrow-button prev-button' onClick={showPrevImage}>
          <FaChevronLeft />
        </button>
      )}
      {currentIndex !== images.length - 1 && (
        <button className='arrow-button next-button' onClick={showNextImage}>
          <FaChevronRight />
        </button>
      )}
      <div className='navigation-indicators'>
        {images.map((image, index) => (
          <FaCircle
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
