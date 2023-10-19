import styled from "styled-components";
const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  height: 250px;
  object-fit: cover;
`;
const MovieName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;

  text-transform: capitalise;
`;
const MovieComponents = (movieDetail: any) => {
  //console.log("MovieComponents::movieDetail = " + JSON.stringify(movieDetail.movieDetail));
  return (
    <MovieContainer
      onClick={() => movieDetail.onMovieSelect(movieDetail.movieDetail.imdbID)}
      //onClick={() => movieDetail.onMovieSelect(movieDetail.movieDetail.Title)}
    >
      <CoverImage src={movieDetail.movieDetail.Poster} />
      <MovieName>{movieDetail.movieDetail.Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year: {movieDetail.movieDetail.Year}</MovieInfo>
        <MovieInfo>Type: {movieDetail.movieDetail.Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};

export default MovieComponents;
