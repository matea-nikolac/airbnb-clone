import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ImageCarousel = ({images}) => {

const [ currentIndex, setCurrentIndex ] = useState(0)

  const showPrevImage = () => {
    if (currentIndex !== 0){
      setCurrentIndex(currentIndex - 1)
    }
  }

  const showNextImage = () => {
    if (currentIndex !== images.length-1){
      setCurrentIndex(currentIndex + 1)
    }
  }

  const imageStyle = {
    backgroundImage: `url('${images[currentIndex]}')` 
  }
  return (
    <div className='image-container'>
      <div className='image-div' style={imageStyle}>
        {currentIndex !== 0 && 
          <button className='arrow-button prev-button' onClick={showPrevImage}>
            <FaChevronLeft />
          </button>
          }
        { currentIndex !== images.length - 1 &&  
          <button className='arrow-button next-button' onClick={showNextImage}>
          <FaChevronRight />
        </button>}
      </div>
    </div>
  )
}

export default ImageCarousel