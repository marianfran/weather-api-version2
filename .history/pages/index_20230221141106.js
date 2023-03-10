import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'


export default function Home() {

  const apiKey="337d9d16c0707a7b146df97fae12c16b";
  const location = "Vancouver";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;

  const [data, setData] = useState();
  const grabWeather = useRef(false);

  const fetchWeather = async () => {
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8,2),10))
      let num = parseInt(weather.dt_txt.substr(8,2),10)

      if(num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("Here");
        console.log(response.data.list[index]);

        var month = '';
        var icon = '';

        if(weather.dt_txt.substr(5,2) == 1){
          month = "January";
        } else if(weather.dt_txt.substr(5,2) == 2){
          month = "February";
        } else if(weather.dt_txt.substr(5,2) == 3){
          month = "March";
        } else if(weather.dt_txt.substr(5,2) == 4){
          month = "April";
        } else if(weather.dt_txt.substr(5,2) == 5){
          month = "May";
        } else if(weather.dt_txt.substr(5,2) == 6){
          month = "June";
        } else if(weather.dt_txt.substr(5,2) == 7){
          month = "July";
        } else if(weather.dt_txt.substr(5,2) == 8){
          month = "August";
        } else if(weather.dt_txt.substr(5,2) == 9){
          month = "September";
        } else if(weather.dt_txt.substr(5,2) == 10){
          month = "October";
        } else if(weather.dt_txt.substr(5,2) == 11){
          month = "November";
        } else if(weather.dt_txt.substr(5,2) == 12){
          month = "December";
        } 
        
        if(weather.weather[0].main == "Clouds"){
          icon = '/icons/broken-clouds.png';
        } else if(weather.weather[0].main == "Clear"){
          icon = '/icons/clear-sky.png';
        } else if(weather.weather[0].main == "Rain"){
          icon = '/icons/rain.png';
        } else if(weather.weather[0].main == "Atmosphere"){
          icon = '/icons/mist.png';
        } else if(weather.weather[0].main == "Snow"){
          icon = '/icons/snow.png';
        } else if(weather.weather[0].main == "Thunderstorm"){
          icon = '/icons/thunderstorm.png';
        } else if(weather.weather[0].main == "Drizzle"){
          icon = '/icons/drizzle.png';
        }

        var now = new Date(weather.dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day = days[now.getDay()];

        return (
          <div key={index}>
            <Image 
              src={icon}
              alt={icon}
              width={180}
              height={180}
              priority
            />
            <p>
              {day} <br/> {month} {weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0,4)}
            </p>
            <div>{weather.main.temp.toFixed(1)}</div>
            <div>{weather.weather[0].main}</div>
          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }

  useEffect(() => {
    if (grabWeather.current === true) {
      fetchWeather()
    }

    return () => {
      grabWeather.current = true;
    }

  }, []);


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div> */}
      </main>
    </>
  )
}
