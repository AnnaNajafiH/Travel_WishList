import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import CountryList from './components/CountryList'
import CreateCountry from './components/CreateCountry'
import UpdateCountry from './components/UpdateCountry'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<CountryList />} />
      <Route path="/create" element={<CreateCountry />} />
      <Route path="/update/:code" element={<UpdateCountry />} />


    </Routes>
    </BrowserRouter>
  )
}

export default App
