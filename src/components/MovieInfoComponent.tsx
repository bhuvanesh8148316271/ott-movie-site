import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

interface MovieData {
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
  height: 350px;
  object-fit: cover;
`;

const InfoColumn = styled.div`
  display: block;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
`;

const MovieInfo = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 8px 0;
  flex-direction: row;
  text-overflow: ellipsis;
  text-transform: capitalize;
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
          <InfoColumn>
            <MovieName>Movie: {movieData.Title}</MovieName>
            <div>
              <MovieInfo>
                Imdb: <span>{movieData.imdbRating}</span>
              </MovieInfo>
            </div>
            <div>
              <MovieInfo>
                Year: <span>{movieData.Year}</span>
              </MovieInfo>
            </div>
            <div>
              <MovieInfo>
                Type: <span>{movieData.Type}</span>
              </MovieInfo>
            </div>
          </InfoColumn>
        </>
      ) : (
        <p>No movie selected.</p>
      )}
    </Container>
  );
};

export default MovieInfoComponent;
