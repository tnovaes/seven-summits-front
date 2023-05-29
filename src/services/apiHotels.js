import axios from "axios";

const BASE_URL=process.env.REACT_APP_API_URL;

function getHotelsBySummit(params){
    const promise = axios.get(`${BASE_URL}/hotels/${params}`);
    return promise;
}

function getHotelById(params){
    const promise = axios.get(`${BASE_URL}/hotels/id/${params}`);
    return promise;
}

const apiHotels = { getHotelsBySummit, getHotelById };

export default apiHotels;