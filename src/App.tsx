import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MovieComponents from "./components/MovieComponents";
import MovieInfoComponent from "./components/MovieInfoComponent";

const API_KEY = "55bb103b";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
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
  margin-left: auto;
  margin-right: 10px;
  align-items: center;
  min-width: 320px;
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
  flex: 0 0 calc(5.33% - 6px);
  margin-bottom: 12px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState<string>("");
  const [timeoutId, updateTimeoutId] = useState<number | undefined>(undefined);
  const [movieList, updateMovieList] = useState<any[]>([]);
  const [selectedMovie, onMovieSelect] = useState<string | null>(null);
  const [isFullDetails, setIsFullDetails] = useState(false);

  const FetchData = async (searchString: string) => {
    if (!searchString) return;
    const url = `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => FetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  const handleMovieSelect = (movieId: string) => {
    // Set isFullDetails to false when a new movie is selected
    setIsFullDetails(false);
    onMovieSelect(movieId);
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
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          isFullDetails={isFullDetails}
          setIsFullDetails={setIsFullDetails}
        />
      )}
      <MovieListContainer>
        {movieList.length
          ? movieList.map((movie, index) => {
              return (
                <MovieItem key={index}>
                  <MovieComponents
                    movieDetail={movie}
                    onMovieSelect={handleMovieSelect}
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
