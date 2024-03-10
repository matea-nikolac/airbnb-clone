import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import PageNavbar from './common/PageNavbar';
import RentalDetails from './components/RentalDetails';

const App = () => {

  return (
    <div className='main-container'>
      <BrowserRouter>
        <PageNavbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/:id" element={<RentalDetails />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )
}


export default App;
