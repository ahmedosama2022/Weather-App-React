import React, { useEffect, useState} from 'react'
import SearchWeather from './SearchWeather'
import FadeLoader from "react-spinners/FadeLoader"
import './App.css'
const App = () => {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [])
  
  return (
    <div>
         {loading ?
        <div className="preloaderr">
          <FadeLoader color="#36d7b7" loading={loading} height={100} size={138}speedMultiplier={1} />
        </div> :
        <>
          <SearchWeather/>
        </>
      }
    </div>
  )
}

export default App