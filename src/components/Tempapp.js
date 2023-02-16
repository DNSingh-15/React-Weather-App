import { TextField } from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from '../img/demo.jpg';
import '../App.css';


function Temp() {
    const apiKey = "489d496cdcdfa15c0cd59a220b483720"
    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const getWeather = async () => {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`
            await axios.get(apiURL).then((res) => {
                console.log(res.data)
                console.log(res.data.wind.speed)
                setCity(res.data)
            }).catch((err) => {
                console.log("err", err.message)
            })
        }
        getWeather()
    }, [search])


    return (
        <div style={{ backgroundImage: `url(${Image})`, "height": "device-height", "width": "device-width", "margin": "180px", "marginLeft": "350px", "padding": "20px", "borderRadius": "20px" }}>
            <h1>Weather App</h1> <br />
            <div className='input'>
                <TextField id="outlined-basic" type="search" label="Pls Enter City" variant="outlined" onChange={(event) => {
                    setSearch(event.target.value)
                }} />
            </div> <br />

            {!city ?
                <p>No data found</p>
                :
                <div>
                    <div>
                        <p style={{ "fontSize": "40px" }}>
                            <CloudQueueIcon style={{ "fontSize": "40px" }}></CloudQueueIcon> {search}, IN
                        </p> <br />
                        <h1>Temperature : {city.main.temp}°C</h1> <br />
                        <p>Min : {city.main.temp_min}°C | Max : {city.main.temp_max}°C</p> <br />
                        <h2>Wind</h2>
                        <p>speed : {city.wind.speed} | Deg : {city.wind.deg}</p>
                    </div>
                </div>

            } <br />

        </div>
    )
}
export default Temp;