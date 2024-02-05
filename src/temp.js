import React, { useEffect, useState } from 'react'
import './App.css';
import Weathercard from './Weathercard';

const Temp = () => {
    const [searchValue, setSearchValue] = useState('surat')
    const [tempInfo, setTempInfo] = useState({})


    //call real data 
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3313bf85356affb485e03077a8a3806e`

            const res = await fetch(url)
            const data = await res.json()

            const { temp, humidity, pressure } = data.main
            const { main: weathermood } = data.weather[0]
            const { name } = data
            const { speed } = data.wind
            const { country, sunset } = data.sys

            const myNewWeatherInfo = {
                temp,
                humidity,
                weathermood,
                pressure,
                name,
                speed,
                country,
                sunset
            }

            setTempInfo(myNewWeatherInfo)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, [])
    return (
        <>
            <div className='wrap'>
                <div className="search">
                    <input type='search'
                        placeholder='search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className='searchButton' type='search' onClick={getWeatherInfo}>Search</button>
                </div>
            </div>

            {/*our temp card*/}
            <Weathercard tempInfo={tempInfo} />
        </>
    )
}

export default Temp