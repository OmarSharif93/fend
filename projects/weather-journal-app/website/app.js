/* Global Variables */
const api = '&appid=7cc9fa2852b654d7d39bc235e9911ab1&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//get request to the OpenWeatherMap API
const getWeather = async (baseURL, zip, api) => {
    const response = await fetch(baseURL+zip+api)
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error is: ' + error);
    }
}

//Post request to post weather and user data to the server
const postWeather = async (url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("Error found : " + error);
    }
}

//updating the UI 
const updateUi = async()=>{
    const response = await fetch('/getWeather')
    try {
        const newData = await response.json();
        document.getElementById('date').innerText = `Date: ${newData.date}`
        document.getElementById('temp').innerText = `Temperature: ${newData.temperature}`
        document.getElementById('content').innerText = `user feeling: ${newData.userResponse}`
    } catch (error) {
        console.log("Error found : " + error);
    }
}

//getting generate button
const button = document.getElementById('generate');

//adding event listener for the button
button.addEventListener('click', getWeatherAction);

//execute getWeatherAction Function called by Event Listener
function getWeatherAction(event) {
    //getting the value of the input
    const zipValue = document.getElementById('zip').value;

    //getting the value of the feelings textarea
    const feelings = document.getElementById('feelings').value;

    //Call getWeather async function to get API data
    getWeather(baseURL, zipValue, api)

        //Chain a POST request to add API data
        .then(function (data) {
           postWeather('/addWeather',{temperature: data.main.temp, date: newDate, userResponse: feelings})
        })
        .then(updateUi)
}

