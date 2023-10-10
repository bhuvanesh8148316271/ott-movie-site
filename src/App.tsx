import { useState } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

//import FilmIcon from '/film-slate.png'
import styled from "styled-components";
import MovieComponents from "./components/MovieComponents";
import axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";
const API_KEY = "55bb103b";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1; /* Expand to fill available vertical space */
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  align-items: center;
  padding: 2px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 9px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: auto; /* This pushes it to the right */
  margin-right: 10px;
  align-items: center;
  width: 30%;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-evenly;
`;

const MovieItem = styled.div`
  flex: 0 0 calc(5.33% - 6px); /* Adjust the width as needed */
  margin-bottom: 12px; /* Reduce the vertical spacing between rows */
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState(null);

  // api call
  const FetchData = async (searchString: any) => {
    const url = `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`;
    //console.log("url=" + url);
    const response = await axios.get(url);

    //console.log("response=" + JSON.stringify(response.data.Search));
    updateMovieList(response.data.Search);
    // console.log("movieList=" + JSON.stringify(movieList));
  };

  const onTextChange = (event: any) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => FetchData(event.target.value), 500);
    //updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/film-slate.png" />
          OTT Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search.png" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}
      <MovieListContainer>
        {movieList?.length
          ? movieList.map((movie, index) => {
              return (
                <MovieItem key={index}>
                  <MovieComponents
                    movieDetail={movie}
                    onMovieSelect={onMovieSelect}
                  />
                </MovieItem>
              );
            })
          : "No Movies"}
      </MovieListContainer>
    </Container>
  );
}

export default App;
