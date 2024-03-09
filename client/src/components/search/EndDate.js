import DatePicker from 'react-datepicker'

const EndDate = ({selectedEndDate, minEndDate, handleEndDateInputChange}) => {

  return (
    <div className='search-item' id='end-date'>
      <div className='search-paragraph-and-input'>
        <div>
          <p className='search-paragraph'>Check Out</p>
        </div>
        <DatePicker
          selected={selectedEndDate}
          value={selectedEndDate}
          minDate={minEndDate} 
          onChange={handleEndDateInputChange}
          placeholderText='Add dates'
          className='search-input'
        />
      </div>
      <div className='search-item-last-div' id='when'></div>
    </div>
  )

}

export default EndDate