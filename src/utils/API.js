const axios = require("axios");
const Amadeus = require("amadeus");
const env = require("dotenv");


const urlPrefix = "https://tranquil-savannah-97505.herokuapp.com";
//const urlPrefix = "http://localhost:3001";

const API = {
 getAmadeusSe: function (token) {
  return axios.get(
    `${urlPrefix}/amadeusSe`
    , {   headers: {
        authorization: `Bearer ${token}`,
      },
    }
    );
 },
 getAmadeusId: function (token) {
  return axios.get(
    `${urlPrefix}/amadeusId`
    , {   headers: {
        authorization: `Bearer ${token}`,
      },
    }
    );
 },

  login: function (userData) {
    return axios.post(`${urlPrefix}/login`, userData);
  },
  createUser: function (userData) {
    return axios.post(`${urlPrefix}/signup`, userData);
  },

  getProfile: function (token) {
    return axios.get(`${urlPrefix}/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  updateProfile: function (user, token) {
    // console.log('token: ', token)
    return axios.put(`${urlPrefix}/edit/${user.id}`, user,
     {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  getAllTrips: function (token) {
    return axios.get(`${urlPrefix}/api/trips/`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getTripById: function (TripId, token) {
    return axios.get(`${urlPrefix}/api/trips/${TripId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  createTrip: function (tripData, token) {
    return axios.post(`${urlPrefix}/api/trips/`, tripData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  updateTrip: function (tripId, tripData, token) {
    return axios.put(`${urlPrefix}/api/trips/${tripId}`, tripData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  deleteTrip: function (TripId, userId, token) {
    return axios.delete(`${urlPrefix}/api/trips/${TripId}/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getAllActivities: function (token) {
    return axios.get(`${urlPrefix}/api/activities/`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getActivityById: function (activityId, token) {
    return axios.get(`${urlPrefix}/api/trips/${activityId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  deleteActivity: function (activityId, userId, token) {
    return axios.delete(`${urlPrefix}/api/activities/${activityId}/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  createActivity: function (activityData, token) {
    return axios.post(`${urlPrefix}/api/activities/`, activityData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  updateActivity: function (activityId, activityData, token) {
    return axios.put(
      `${urlPrefix}/api/activities/${activityId}`,
      activityData,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },
  getDashboard: function (userId, token) {
    return axios.get(`${urlPrefix}/dashboard/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getAllExpenses: function (token) {
    return axios.get(`${urlPrefix}/api/expenses/`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getExpenseById: function (ExpenseId, token) {
    return axios.get(`${urlPrefix}/api/expenses/${ExpenseId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getAllExpenseByTrip: function (tripId, token){
    return axios.get(`${urlPrefix}/api/expenses/trip/${tripId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  },
  createExpense: function (expenseData, token) {
    return axios.post(`${urlPrefix}/api/expenses/`, expenseData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  updateExpense: function (expenseId, expenseData, token) {
    return axios.put(`${urlPrefix}/api/expenses/${expenseId}`, expenseData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  deleteExpense: function (ExpenseId, token) {
    return axios.delete(`${urlPrefix}/api/expenses/${ExpenseId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  
  getLatLon: function (cityName) {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ca0a6c1724abbeafa23dfc91590ac700`
    );

    //  TO USE CALL LAT {API.getLatLon("Seattle").then(response => console.log(response.data.coord.lat))}
    //  TO USE CALL LON {API.getLatLon("Seattle").then(response => console.log(response.data.coord.lon))}

    // let temp = API.getLatLon(${userState.city});

    // const center = [temp.data.coord.lat, temp.data.coord.lon]
  },

  addTripUser: function (tripId, userId, token) {
    return axios.put(`${urlPrefix}/api/trips/addUser/${tripId}/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getTripUsers: function (tripId, token) {
    return axios.get(`${urlPrefix}/api/trips/allUsers/${tripId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getAllFriends: function(userId, token) {
    return axios.get(`${urlPrefix}/friends/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  //getting 403 forbidden error.....
  addNewFriend: function(userId, friendId, token) {
    return axios.post(`${urlPrefix}/friends/${userId}/${friendId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },  
  // addNewFriend: function(userId, friendId) {
  //   return axios.post(`${urlPrefix}/friends/${userId}/${friendId}`);
  // },
  getUserByEmail: function (email, token) {
    return axios.get(`${urlPrefix}/getByEmail/${email}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  updateUser: function(userId, token) {
    return axios.put(`${urlPrefix}/edit/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
addProfilePic: function(userId, image, token) {
  return axios.put(`${urlPrefix}/profilepic/${userId}`, image, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
},


};
export default API;
