import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';

const App = () => {

  return (
    <div className='main-container'>
      <BrowserRouter>
        {/* <PageNavbar/> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )
}


export default App;
