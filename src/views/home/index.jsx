import React, {useState, useEffect} from "react"
import axios from "axios"
import { classNames } from "@/utils/helpers"
import Lottie from 'lottie-react';

import logoIcon from '../../lotties/logo.json';
import rainIcon from '../../lotties/rain.json';
import cloudyIcon from '../../lotties/cloudy.json';
import drizzleIcon from '../../lotties/drizzle.json';
import foggyIcon from '../../lotties/foggy.json';
import snowIcon from '../../lotties/snow.json';
import stormIcon from '../../lotties/storm.json';
import sunIcon from '../../lotties/sun.json';

export function Home() {
    const [plz, setPlz] = useState('')
    const [coords, setCoords] = useState(null)
    const [location, setLocation] = useState(null)
    const [weather, setWeather] = useState(null)

    const getRecommendation = (type) => {
        switch (type) {
            case "sun":
                return ["Genieße ein leckeres Picknick im Grünen.", "Erkunde lokale Wanderwege und genieße die Natur.", "Verbringe den Tag am Strand mit Schwimmen und Sonnenbaden.", "Mache eine Fahrradtour durch die Stadt oder die Umgebung.", "Verbringe Zeit im Garten und pflanze neue Blumen oder Gemüse.", "Veranstalte ein Grillfest mit Freunden oder Familie.", "Miete ein Boot und erkunde einen nahegelegenen See oder Fluss.", "Spiele Volleyball, Fußball oder Tennis im Freien.", "Besuche ein Konzert oder eine Veranstaltung im Freien.", "Entdecke neue Ecken deiner Stadt oder besuche Sehenswürdigkeiten."]
            case "rain":
                return ["Entdecke die Ausstellungen in einem örtlichen Museum.", "Schau dir einen neuen Film im Kino an.", "Verbringe Zeit in einem gemütlichen Café mit einem Buch.", "Besuche ein Fitnessstudio oder spiele Squash.", "Probiere neue Rezepte zu Hause aus.", "Besuche eine lokale Kunstgalerie.", "Verbringe Zeit beim Lesen in der Bibliothek.", "Organisiere einen Spieleabend mit Freunden.", "Geh in ein Einkaufszentrum und stöbere in den Geschäften.", "Entspanne dich in einem Spa oder bei einer Massage."]
            case "snow":
                return ["Suche dir einen Hügel und gehe Schlitten fahren.", "Baue einen Schneemann oder ein Schneefort.", "Verbringe den Tag auf der Skipiste.", "Mache einen Spaziergang im verschneiten Wald.", "Besuche eine Eisbahn und laufe Schlittschuh.", "Genieße eine heiße Schokolade vor dem Kamin.", "Mache Fotos von der winterlichen Landschaft.", "Veranstalte ein Wintergrillen mit Glühwein und warmen Speisen.", "Probiere Langlauf auf gut präparierten Loipen.", "Entspanne dich in einer Sauna und genieße die Wärme."]
        }
    }

    const getRandomRecommendationItem = (arr) => {
        let randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    const getWeatherName = (code) => {
        // code = 99
        switch (code) {
            case 0:
                return {
                    text: "Klarer Himmel",
                    style: "bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500",
                    icon: sunIcon,
                    type: "sun"
                }
            case 1:
            case 2:
            case 3:
                return {
                    text: "Überwiegend klar, teilweise bewölkt",
                    style: "bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500",
                    icon: cloudyIcon,
                    type: "sun"
                }
            case 45:
            case 48:
                return {
                    text: "Nebel und Ablagerung von Reifnebel",
                    style: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400",
                    icon: foggyIcon,
                    type: "rain"
                }
            case 51:
            case 53:
            case 55:
                return {
                    text: "Nieselregen: Leichte, mäßige und dichte Intensität",
                    style: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600",
                    icon: drizzleIcon,
                    type: "rain"
                }
            case 56:
            case 57:
                return {
                    text: "Gefrierender Nieselregen: Leichte und dichte Intensität",
                    style: "bg-blue-300",
                    icon: rainIcon,
                    type: "rain"
                }
            case 61:
            case 63:
            case 65:
                return {
                    text: "Regen: Leichte, mäßige und starke Intensität",
                    style: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600",
                    icon: rainIcon,
                    type: "rain"
                }
            case 66:
            case 67:
                return {
                    text: "Gefrierender Regen: Leichte und starke Intensität",
                    style: "bg-blue-300",
                    icon: rainIcon,
                    type: "rain"
                }
            case 71:
            case 73:
            case 75:
                return {
                    text: "Schneefall: Leichte, mittlere und starke Intensität",
                    style: "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300",
                    icon: snowIcon,
                    type: "snow"
                }
            case 77:
                return {
                    text: "Schneekörner",
                    style: "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300",
                    icon: snowIcon,
                    type: "snow"
                }
            case 80:
            case 81:
            case 82:
                return {
                    text: "Regenschauer: Leicht, mäßig und heftig",
                    style: "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500",
                    icon: rainIcon,
                    type: "rain"
                }
            case 85:
            case 86:
                return {
                    text: "Leichte und starke Schneeschauer",
                    style: "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300",
                    icon: snowIcon,
                    type: "snow"
                }
            case 95:
                return {
                    text: "Gewitter: Leicht oder mäßig",
                    style: "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700",
                    icon: stormIcon,
                    type: "rain"
                }
            case 96:
            case 99:
                return {
                    text: "Gewitter mit leichtem und schwerem Hagel",
                    style: "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700",
                    icon: stormIcon,
                    type: "rain"
                }
        }
    }

    const clearLocation = () => {
        localStorage.removeItem("coords")
        localStorage.removeItem("location")
        setCoords(null)
        setLocation(null)
    }

    useEffect(() => {
        if(localStorage.getItem("coords")) {
            const coords = JSON.parse(localStorage.getItem("coords"))
            setCoords(coords)
        }
        if(localStorage.getItem("location")) {
            const location = JSON.parse(localStorage.getItem("location"))
            setLocation(location)
        }
    }, [])

    const fetchWeather = () => {
        if(coords) {
            const coords = JSON.parse(localStorage.getItem("coords"))
            axios.get(`${import.meta.env.VITE_OPEN_METEO_URL}/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m`).then((response) => {
                setWeather(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        fetchWeather()
        if(coords) {
            fetchWeather()
        }
    }, [coords])

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.get(`${import.meta.env.VITE_OPEN_CAGE_API_URL}json?q=${plz}&key=${import.meta.env.VITE_OPEN_CAGE_API_KEY}`).then((response) => {
            setPlz(response.data.results[0].geometry)
            setCoords(response.data.results[0].geometry)
            setLocation(response.data.results[0].components)
            localStorage.setItem("coords", JSON.stringify(response.data.results[0].geometry))
            localStorage.setItem("location", JSON.stringify(response.data.results[0].components))
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <React.Fragment>
            <div className="h-screen">
                {!coords ? 
                    (
                        <div className="flex flex-col justify-center items-center h-full bg-blue-200">
                            <Lottie
                                className="h-60"
                                animationData={logoIcon}
                                options={
                                    {
                                        loop: true,
                                        autoplay: true,
                                        animationData: logoIcon,
                                        rendererSettings: {
                                            preserveAspectRatio: "xMidYMid slice"
                                        }
                                    }
                                }
                            />
                            <span className="text-4xl mb-8">Was könnte ich jetzt cooles machen?</span>
                            <span className="text-2xl">Deine Postleitzahl eintippen und eine Freizeitaktivität erhalten:</span>
                            <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
                                <input onChange={(e) => e.target.value.length <= 5 && setPlz(e.target.value)} value={plz} className='text-xl p-4 text-center border-indigo-700 border-2 rounded-md' type="number"></input>
                                <button disabled={plz.length < 5} className="bg-indigo-700 hover:bg-indigo-600 text-white p-4 mt-4 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">Abschicken</button>
                            </form>
                            <span className="fixed bottom-0 opacity-50">MINIHACKATHON.de  - Aufgabe 1 - doomsweb</span>
                        </div>
                    )
                :
                    !weather ?
                        (
                            <div>Loading...</div>
                        )
                    :
                        (
                            <div className={classNames("h-screen overflow-hidden flex flex-col justify-center items-center", getWeatherName(weather.current.weather_code).style)}>
                                <div className="fixed flex gap-2 top-0 right-0 m-4 bg-white/10 p-4 rounded-md text-white">
                                    <p>{location?.postcode} {location?.town}</p>
                                    <button className="text-indigo-800 hover:text-indigo-600" onClick={clearLocation}>PLZ ändern?</button>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-1 xl:gap-x-8 h-72 w-full p-8">
                                    <div className="bg-white/30 rounded-md shadow-lg border-8 border-white/30">
                                        <div className="flex flex-col h-full relative">
                                            
                                            <span className="absolute top-0 px-3 py-2 text-lg">Empfehlung</span>
                                            {/* {JSON.stringify(data.current.)} */}
                                            <div className="h-full flex justify-center items-center text-4xl">
                                            {getRandomRecommendationItem(getRecommendation(getWeatherName(weather.current.weather_code).type))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-4 xl:gap-x-8 h-72 w-full p-8">
                                    <div className="bg-white/30 rounded-md shadow-lg border-8 border-white/30">
                                        <div className="flex flex-col h-full relative">
                                            <span className="absolute top-0 px-3 py-2 text-lg">Temperatur</span>
                                            {/* {JSON.stringify(data.current.)} */}
                                            <div className="h-full flex justify-center items-center text-4xl">
                                                {weather.current.temperature_2m} {weather.current_units.temperature_2m}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/30 rounded-md shadow-lg border-8 border-white/30">
                                        <div className="flex flex-col h-full relative">
                                            <span className="absolute top-0 px-3 py-2 text-lg">Windgeschwindigkeit</span>
                                            {/* {JSON.stringify(data.current.)} */}
                                            <div className="h-full flex justify-center items-center text-4xl">
                                                {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/30 rounded-md shadow-lg border-8 border-white/30">
                                        <div className="flex flex-col h-full relative">
                                            <span className="absolute top-0 px-3 py-2 text-lg">Wetterbedingungen</span>
                                            {/* {JSON.stringify(data.current.)} */}
                                            <div className="h-full flex flex-col justify-center items-center text-4xl">
                                                <Lottie
                                                    className="h-20"
                                                    animationData={getWeatherName(weather.current.weather_code).icon}
                                                    options={
                                                        {
                                                            loop: true,
                                                            autoplay: true,
                                                            animationData: getWeatherName(weather.current.weather_code).icon,
                                                            rendererSettings: {
                                                                preserveAspectRatio: "xMidYMid slice"
                                                            }
                                                        }
                                                    }
                                                />
                                                <span className="text-sm text-center">{getWeatherName(weather.current.weather_code).text}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/30 rounded-md shadow-lg border-8 border-white/30">
                                        <div className="flex flex-col h-full relative">
                                            <span className="absolute top-0 px-3 py-2 text-lg">Luftfeuchtigkeit</span>
                                            {/* {JSON.stringify(data.current.)} */}
                                            <div className="h-full flex justify-center items-center text-4xl">
                                                {weather.current.relative_humidity_2m} {weather.current_units.relative_humidity_2m}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                {/* <span className="text-4xl font-bold mb-4">{weather.current.temperature_2m} {weather.current_units.temperature_2m}</span>
                                <span className="text-2xl">{getWeatherName(weather.current.weather_code).text}</span>
                                <Lottie
                                    className="h-1/2"
                                    animationData={getWeatherName(weather.current.weather_code).icon}
                                    options={
                                        {
                                            loop: true,
                                            autoplay: true,
                                            animationData: getWeatherName(weather.current.weather_code).icon,
                                            rendererSettings: {
                                                preserveAspectRatio: "xMidYMid slice"
                                            }
                                        }
                                    }
                                />*/}
                                {/* <span className="text-4xl italic mt-3">Vorschlag: {getRandomRecommendationItem(getRecommendation(getWeatherName(weather.current.weather_code).type))}</span>  */}
                            </div>

                        )
                    
                }
            </div>
        </React.Fragment>
    )
}
