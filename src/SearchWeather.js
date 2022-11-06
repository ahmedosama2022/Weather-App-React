import React, { useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import FadeLoader from "react-spinners/FadeLoader"
import './App.css'

const SearchWeather = () => {


    

    const [search, setSearch] = useState("Egypt");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    let componentMounted = true;

   useEffect(() => {
    const fetchWeather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=32e7a9d44328b80875530d35b7c40b6f`);
        if(componentMounted){
            setData(await response.json());
            console.log(response)
        }
        return () => {
            componentMounted = false;
        }
    }
     fetchWeather();
   }, [search]);

   let emoji = null;
   if(typeof data.main != "undefined"){
    if(data.weather[0].main == "Clouds"){
        emoji = "fa-cloud"

    }else if(data.weather[0].main == "Thunderstrom"){
        emoji = "fa-bolt"

    }else if(data.weather[0].main == "Drizzle"){
        emoji = "fa-cloud-rain"

    }else if(data.weather[0].main == "Rain"){
        emoji = "fa-cloud-shower-heavy"

    }else if(data.weather[0].main == "Snow"){
        emoji = "fa-snow-flake"

    }else {
        emoji = "fa-smog"
    }
   }else{
    return(
        <div>
           <FadeLoader color="#36d7b7" height={100} margin={10} size={138}/>
        </div>
    )
   }
   let temp = (data.main.temp - 273.15).toFixed(2);
   let temp_min = (data.main.temp_min - 273.15).toFixed(2);
   let temp_max = (data.main.temp_max - 273.15).toFixed(2);
   //Date
   let d = new Date();
   let date = d.getDate();
   let year = d.getFullYear();
   let month = d.toLocaleString("default", {month:'long'});
   let day = d.toLocaleString("default", {weekday:'long'});

   //time

   let time =d.toLocaleString([],{
    hour: '2-digit',
    minute: '2-digit',
    second:'2-digit'
    
   });

   const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
   }
  return (
    <div className='vv'>
        <video autoplay playsinline  muted loop >
              <source src="https://player.vimeo.com/external/209333087.sd.mp4?s=65842decb1c966bf4751fc9598ea71a81e4d9d31&profile_id=164&oauth2_token_id=57447761"  />  
            </video>
 
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-12'>
                <Card className="bg-dark text-white text-center border-0">
                   
                  
                   <Card.ImgOverlay>
                   <form onSubmit={handleSubmit}>              
            <div className='mb-4 w-75 mx-auto  ' style={{display: "flex" }}>
       
        <Form.Control type="search"
     id="inputPassword5"
     placeholder='search City'
      aria-label='search city'
       aria-describedby="passwordHelpBlock"
       name='search'
       value={input}
       onChange={(e)=>setInput(e.target.value)}
       required
       />
        <button type='submit'className="input-group-text"><i className='fas fa-search'></i></button> 
    </div>
    </form>
    <div className='bg-dark bg-opacity-50 py-3npm '>
    <Card.Title><h2>{data.name}</h2></Card.Title>
        <Card.Text>
         <p>{day}, {month} {date}, {year}</p>
         <br></br>
         {time}
         <hr></hr>
             <i className={`fas ${emoji} fa-4x`}></i>
             <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
             <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
             <p className='lead'>{temp_min} &deg;C | {temp_max} &deg;C</p>
              
           </Card.Text>
          
    </div>
       
                 </Card.ImgOverlay>
                   </Card>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchWeather