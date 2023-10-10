import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

interface MovieData {
  Country: ReactNode;
  Awards: ReactNode;
  Metascore: ReactNode;
  imdbVotes: ReactNode;
  imdbID: ReactNode;
  DVD: ReactNode;
  BoxOffice: ReactNode;
  Language: ReactNode;
  Plot: ReactNode;
  Actors: ReactNode;
  Writer: ReactNode;
  Director: ReactNode;
  Genre: ReactNode;
  Rated: ReactNode;
  Released: ReactNode;
  Runtime: ReactNode;
  Title: string;
  Poster: string;
  imdbRating: string;
  Year: string;
  Type: string;
}

const API_KEY = "55bb103b"; // Replace with your actual API key

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
`;

const CoverImage = styled.img`
  // height: 400px;
  // object-fit: cover;
  height: 400px;
  width: 20%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

/*const InfoColumn = styled.div`
  display: block;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
`; */

const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: #fff;
  padding: 18px;
  //border-radius: 18px;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);*/
`;

const MovieInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const Value = styled.span`
  flex-grow: 1;
  color: #555;
  margin-left: 16px;
`;

const MovieInfoComponent = ({ selectedMovie }: { selectedMovie: string }) => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  // Function to fetch movie data from the API
  const fetchData = async (searchString: string) => {
    const url = `https://www.omdbapi.com/?t=${searchString}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      setMovieData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData when the component mounts or when selectedMovie changes
  useEffect(() => {
    if (selectedMovie) {
      fetchData(selectedMovie);
    }
  }, [selectedMovie]);

  return (
    <Container>
      {movieData ? (
        <>
          <CoverImage src={movieData.Poster} alt="Movie Poster" />
          <MovieInfoContainer>
            <MovieInfoRow>
              <Label>Title:</Label>
              <Value>{movieData.Title}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Year:</Label>
              <Value>{movieData.Year}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Rated:</Label>
              <Value>{movieData.Rated}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Released:</Label>
              <Value>{movieData.Released}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Runtime:</Label>
              <Value>{movieData.Runtime}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Genre:</Label>
              <Value>{movieData.Genre}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Director:</Label>
              <Value>{movieData.Director}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Writer:</Label>
              <Value>{movieData.Writer}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Actors:</Label>
              <Value>{movieData.Actors}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Plot:</Label>
              <Value>{movieData.Plot}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Language:</Label>
              <Value>{movieData.Language}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Country:</Label>
              <Value>{movieData.Country}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Awards:</Label>
              <Value>{movieData.Awards}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Metascore:</Label>
              <Value>{movieData.Metascore}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>IMDB Rating:</Label>
              <Value>{movieData.imdbRating}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>IMDB Votes:</Label>
              <Value>{movieData.imdbVotes}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>IMDB ID:</Label>
              <Value>{movieData.imdbID}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>DVD Release:</Label>
              <Value>{movieData.DVD}</Value>
            </MovieInfoRow>
            <MovieInfoRow>
              <Label>Box Office:</Label>
              <Value>{movieData.BoxOffice}</Value>
            </MovieInfoRow>
          </MovieInfoContainer>
        </>
      ) : (
        <p>No movie selected.</p>
      )}
    </Container>
  );
};

export default MovieInfoComponent;
