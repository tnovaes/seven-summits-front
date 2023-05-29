import axios from "axios";

const BASE_URL=process.env.REACT_APP_API_URL;

function getFlightsBySummit(params){
    const promise = axios.get(`${BASE_URL}/flights/${params}`);
    return promise;
}

function getFlightById(params){
    const promise = axios.get(`${BASE_URL}/flights/id/${params}`);
    return promise;
}

const apiFlights = { getFlightsBySummit, getFlightById };

export default apiFlights;