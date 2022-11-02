const apiURL = "https://api.themoviedb.org/3";
const apiKey = "c49ffedbc528b3e97a1110dbfb4fb5e3";

export const getMovie = async () => {
  const data = await fetch(
    apiURL + "/movie/top_rated?api_key=" + apiKey + "&language=en-US&page=1"
  );
  return data.json();
};

export const getSimilarMovies = async (movieID) => {
  const result = await fetch(
    apiURL +
      "/movie/" +
      movieID +
      "/similar?api_key=" +
      apiKey +
      "&language=en-US&page=1"
  );
  return result.json();
};
