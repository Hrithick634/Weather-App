import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "a0cf569cdc65f17d9db7de5fddce420f";

    let getWeatherInfo = async () => {
        try {
            setLoading(true);
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        }
        console.log(result);
        await updateInfo(result);
        } catch(err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }
        

    let handleChange = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = (event) => {
        try {
            event.preventDefault();
        console.log(city);
        setCity("");
        getWeatherInfo();
        } catch(err) {
            setError(true);
        }
        
    };
    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}> 
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
                <br /><br />
                <Button variant="contained" type='submit'>
                Search {loading ? <CircularProgress size={24} /> : ""}
                </Button>
                
                {error && <p style={{color: "red"}}>No such place exist!</p>}
            </form>
        </div>
    )
}