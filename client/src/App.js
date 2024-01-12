import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Components

// import Home from './components/Home.js'
// import Profile from './components/Profile.js'
import PageNavbar from './components/common/PageNavBar.js'

const App = () => {

  return (
    <div className='main-container'>
      <BrowserRouter>
        <PageNavbar/>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )
}

export default App
