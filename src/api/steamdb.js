const axios = require("axios");

// import shared functions
const { getSecondsBetweenDates } = require("../functions/general.functions");

const config = require("../config/config");


const steamDB = axios.create({
  baseURL: config.get("api.url"),
});

const getAppReviews = async (id, cursor) => {
  try {
    const req = await steamDB.request({
      url: `/appreviews/${id}`,
      method: "get",
      params: {
        json: "1",
        filter: "recent",
        cursor: encodeURI(cursor),
        num_per_page: "100",
        language: "all",
        purchase_type: "all",
        review_type: "all",
        language: "english",
      },
    });
    return req.data;
  } catch (error) {
    console.log("THROWING A ERROR HERE");
    console.log(error);
    return null;
  }
};

// this function returns a list for all the steam games, can be used to get the appid
// const getAllSteamGames = async () => {
//   let start = new Date();

//   try {
//     const req = await axios.get(
//       "https://api.steampowered.com/ISteamApps/GetAppList/v2"
//     );
//     return { games: req.data, time: getSecondsBetweenDates(start, new Date()) };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export the getAppReviews function
module.exports = {
  getAppReviews,
};
