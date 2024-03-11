import DatePicker from 'react-datepicker'

const StartDate = ({
  selectedStartDate,
  selectedEndDate,
  handleStartDateInputChange,
  isHomePage,
}) => {
  return (
    <div className='search-item' id='start-date'>
      <div className='search-paragraph-and-input'>
        <div>
          <p className='search-paragraph'>
            {isHomePage ? 'Check In' : 'CHECK-IN'}
          </p>
        </div>
        <DatePicker
          selected={selectedStartDate}
          value={selectedStartDate}
          minDate={new Date()}
          maxDate={selectedEndDate}
          onChange={handleStartDateInputChange}
          placeholderText='Add dates'
          className='search-input'
        />
      </div>
      <div className='search-item-last-div' id='when'></div>
    </div>
  )
}

export default StartDate
