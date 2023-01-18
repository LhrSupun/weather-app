import React from 'react'
import { useQuery } from 'react-query'
import City from './City';

const api_key = process.env.REACT_APP_API_KEY
const ids = [524901, 703448, 2643743]; // city id array

const now = new Date();

// get data from api
const fetchData = () => fetch(`http://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${api_key}`).then(res => res.json());


const adjustForTimezone = (offset) => {
    const date = now.toISOString();
    const targetTime = new Date(date);
    const timeZoneFromDB = offset; //time zone value from database
    //get the timezone offset from local time in minutes
    const tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
    //convert the offset to milliseconds, add to targetTime, and make a new Date
    const val = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
    return val.toDateString();
}

function Home() {
    const { isLoading, error, data } = useQuery({
        queryKey: 'weaterData',
        queryFn: fetchData,
        // retryDelay: 300000, // retry in 5 minutes
        refetchInterval: 300000
    });

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            {/*
                this is for main component
            */}
            {data?.list?.map((city) =>
                <div key={city?.name}>
                    <City
                        name={city?.name}
                        code={city?.sys?.country}
                        description={city.weather[0].description}
                        color={city.weather[0].main}
                        day={() => adjustForTimezone(city?.sys?.timezone)}
                    />
                </div>
            )}
        </div>
    )

}

export default Home