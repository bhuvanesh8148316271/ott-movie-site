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
  fontsize: 16px;
  fontweight: 600;
  color: black;
  margin: 15px 0;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  fontsize: 16px;
  fontweight: 500;
  color: black;

  text-transform: capitalise;
`;
const MovieComponents = (props, movieDetail: any) => {
  console.log("movieDetail=" + JSON.stringify(movieDetail));
  return (
    <MovieContainer>
      <CoverImage src="https://www.netflix.com/in/title/81642992" />
      <MovieName>Love Today</MovieName>
      <InfoColumn>
        <MovieInfo>Year: 2022</MovieInfo>
        <MovieInfo>Type: Movie</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};

export default MovieComponents;
