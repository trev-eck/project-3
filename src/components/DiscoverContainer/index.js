import { React, useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import DiscTodo from "../../components/DiscTodo";
import GeoJsonLayer from "../Map/index.js";
import API from "../../utils/API";
import { makeStyles, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Divider } from "@material-ui/core";
import { Box } from "@material-ui/core";

const env = require("dotenv");
const containerStyle = {
  backgroundColor: "white",
  height: "100vh",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8,
  border: 0,
  color: "#333333",
  padding: 25,
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
}));

const Amadeus = require("amadeus")
let saveThis;
let thisLon = "34.0522";
let thisLat = "118.2437";

let clientI;
let clientS;

async function getKeys(token) {
  try{
    //console.log("clientI before", clientI);
    clientI = await API.getAmadeusId(token);
    clientI = clientI.data;
    //console.log("clientI after", clientI);

    //console.log("clientS before", clientS);
    clientS = await API.getAmadeusSe(token);
    clientS = clientS.data;
    //console.log("clientS after", clientS);
  }catch{
  }
}
//getKeys();

export default function DiscoverContainer(props) {
  /*--------------------------*/

  // const style = {
  //   height: "100vh",
  // };

  // set user state
  const [userState, setUserState] = useState({
    token: "",
    user: {},
  });

  // set trip state
  const [tripState, setTripState] = useState({
    trip: {},
    city: "",
    lat: "",
    lon: "",
  });

  // set activities state
  const [activitiesState, setActivitiesState] = useState({
    activities: [],
  });

  // set getActvity state
  const [getActivity, setGetActivity] = useState({
    thisActivity: [],
  });

  const classes = useStyles();
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  // const [noOfPages] = useState(
  //   Math.ceil(activitiesState.activities.length / itemsPerPage)
  // );

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  };

  /*--------------------------*/

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("useEffect1 run");

    // API call to get user profile
    if (token) {
      getKeys(token);
      API.getProfile(token)
        .then((res) => {
          // console.log("getting profile", res.data);
          setUserState({
            token: token,
            user: {
              email: res.data.email,
              id: res.data.id,
              username: res.data.username,
            },
          });
        })
        .then((results) => {
          API.getTripById(id, token).then((res) => {
            // console.log("getting trp:", res.data);
            // console.log("city?", res.data.city);
            setTripState({
              ...tripState,
              trip: res.data,
              city: res.data.city,
            });
            //console.log(tripState.trip);
            API.getLatLon(res.data.city)
              .then((res) => {
                thisLon = res.data.coord.lon;
                thisLat = res.data.coord.lat;
                // console.log("getting lat lon:", thisLon, thisLat);
                setTripState({
                  ...tripState,
                  lat: thisLat,
                  lon: thisLon,
                });
              })
              // API.discoverActivities(thisLat, thisLon)
              // .then((rez) => {
              //   setActivitiesState({
              //     activitives: rez.data
              //   })
              // })
              .then(() => {
                //console.log("did we beat the request?");
                getActivities(thisLat, thisLon);
                // API.discoverActivities(tripState.lat, tripState.lon).then((res) =>{
                //   console.log("getting activities", res.data);
                //   setActivitiesState({
                //     activities: res.data,
                //   });
                // })
              });
          });
        })
        .then((result) => {
          // console.log(tripState.city);
        });
    } else {
      console.log("no token provided");
    }
  }, []);

  // const createActivity = () => {
  //   console.log('Create activity from card')
  // }

  const { id } = useParams();

  // get activities by trip location
  const getActivities = (lat, lon) => {

    const amadeus = new Amadeus({
      clientId: clientI,
      clientSecret: clientS,
    });
    //console.log("amadeus", amadeus);
    clientI = "";
    clientS = "";
    //console.log(amadeus, lat, lon);
    amadeus.shopping.activities
      .get({
        latitude: lat,
        longitude: lon,
      })
      .then((response) => {
        //console.log("getting activities", response.data);
        setActivitiesState({
          activities: response.data,
        });
      }).catch((error) => {console.log("didnt make it through the get acti,   ", error)})
    // setActivitiesState({
    //   activities: temp,
    // });

  };

  const search = (needId, array) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === needId) {
        return array[i];
      }
    }
  };

  const handleBtn = (event) => {
    const foundCard = search(
      event.target.parentElement.parentElement.parentElement.id,
      activitiesState.activities
    );
    // const newCard = {
    //   activityName:foundCard.name,
    //   desciption:foundCard.shortDescription,
    //   tripId:id
    // }
    console.log(foundCard);

    setGetActivity({
      ...getActivity,
      thisActivity: foundCard,
    });
    console.log(getActivity.thisActivity);
  };

//   return (
//     <div>
//       <Box p={2} style={{ textDecoration: "none", padding: 0 }}>
//         <Container maxWidth="md" style={containerStyle}>
//           <GeoJsonLayer lat={tripState.lat} lon={tripState.lon}/>
//             {/* <AddActivityDialog createActivity={createActivity} /> */}
//           <Typography variant="h5" style={{paddingTop:30, paddingBottom:15}}>
//             Things to do
//           </Typography>
//           <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
//             {activitiesState.activities
//               .slice((page - 1) * itemsPerPage, page * itemsPerPage)
//               .map((activity) => (
//             <div style={{width:'50%', display:'inline'}}>
//               <div xs={5}>
//                 <DiscTodo
//                   name={activity.name}
//                   pictures={activity.pictures[0]}
//                   shortDescription={activity.shortDescription}
//                   id={activity.id}
//                   // handleBtn={handleBtn}
//                   data-value={activity.id}
//                   nameLabel={getActivity.thisActivity.name}
//                   link={activity.bookingLink}
//                   userStateToken={userState.token}
//                   tripId={id}
//                   userStateId={userState.user.id}
//                 />
//                 {/* <AddActivityDialog id={activity.id} createActivity={createActivity} /> */}
//                 {/* <DeleteBtn onClick={test} id={activity.id}/> */}
//               </div>
//               <Divider />
//               <Box component="span">
//                 <Pagination
//                   count={4}
//                   page={page}
//                   onChange={handlePageChange}
//                   defaultPage={1}
//                   color="primary"
//                   size="large"
//                   showFirstButton
//                   showLastButton
//                   classes={{ ul: classes.paginator }}
//                 ></Pagination>
//                 </Box>
//             </div>
//           </div>
//         </Container>
//       </Box>
//     </div>
//   );
// }


return (
  <div>
    <Box p={2} style={{ textDecoration: "none", padding: 0 }}>
      <Container maxWidth="md" style={containerStyle}>
        <GeoJsonLayer lat={tripState.lat} lon={tripState.lon} />

        <h3>Ideas</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {activitiesState.activities
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((activity) => (
              <div style={{ width: "48%", display: "inline" }}>
                <div xs={5}>
                  <DiscTodo
                    name={activity.name}
                    pictures={activity.pictures[0]}
                    shortDescription={activity.shortDescription}
                    id={activity.id}
                    // handleBtn={handleBtn}
                    data-value={activity.id}
                    nameLabel={getActivity.thisActivity.name}
                    userStateToken={userState.token}
                    tripId={id}
                    userStateId={userState.user.id}
                  />
                </div>
              </div>
            ))}
        </div>
        <Divider />
        <Box component="span">
          <Pagination
            count={4}
            page={page}
            onChange={handlePageChange}
            defaultPage={1}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
          ></Pagination>
        </Box>
      </Container>
    </Box>
  </div>
);
}