import React from 'react'
import { useQuery } from 'react-query'
import City from './City';

const api_key = process.env.REACT_APP_API_KEY
const ids = [524901, 703448, 2643743]; // city id array


// get data from api
const fetchData = () => fetch(`http://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${api_key}`).then(res => res.json());


const adjustForTimezone = (offset) => {
    const now = new Date();
    now.setTime(now.getTime() + offset * 1000);
    const date = now.toDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
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
                        dateTime={() => adjustForTimezone(city?.sys?.timezone)}
                    />
                </div>
            )}
        </div>
    )

}

export default Home