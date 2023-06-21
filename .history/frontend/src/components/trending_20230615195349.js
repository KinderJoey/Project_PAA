import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MAX_SINOPSIS_LENGTH = 100; // Batas panjang sinopsis yang diizinkan
const CARD_TEXT_HEIGHT = "120px"; // Tinggi tetap untuk elemen Card.Text

const Trending = () => {
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          with_keywords: "superhero",
        },
      })
      .then((response) => {
        setSuperheroes(response.data.results);
      });
  }, []);

  const truncateSinopsis = (sinopsis) => {
    if (sinopsis.length <= MAX_SINOPSIS_LENGTH) {
      return sinopsis;
    }
    return sinopsis.slice(0, MAX_SINOPSIS_LENGTH) + " ...";
  };

  const handleToggleSinopsis = (index) => {
    const updatedSuperheroes = [...superheroes];
    updatedSuperheroes[index].showSinopsis = !updatedSuperheroes[index].showSinopsis;
    setSuperheroes(updatedSuperheroes);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Booking');
  };

  return (
    <div>
      <Container>
        <br />
        <h1 className="judul">SUPERHERO MOVIES</h1>
        <br />
        <Row>
          {superheroes.map((result, index) => {
            const showSinopsis = result.showSinopsis || false;
            const truncatedSinopsis = truncateSinopsis(result.overview);
            return (
              <Col md={4} className="movieWrapper h-100" id="superhero" key={index}>
                <Card className="movieImage">
                  <Image src={`${process.env.REACT_APP_IMG_URL}/${result.poster_path}`} alt="test" className="images" />
                  <div className="bg-dark">
                    <div className="p-2 m-1 text-white">
                      <Card.Title className="text-center">{result.title}</Card.Title>
                      <Card.Text className="text-left" style={{ height: CARD_TEXT_HEIGHT, overflow: "hidden" }}>
                        {showSinopsis ? result.overview : truncatedSinopsis}
                      </Card.Text>
                      {result.overview.length > MAX_SINOPSIS_LENGTH && (
                        <Button variant="link" onClick={() => handleToggleSinopsis(index)}>
                          {showSinopsis ? "Hide Sinopsis" : "Show Sinopsis"}
                        </Button>
                      )}
                      <Button variant="primary" onClick={handleClick}>Beli Tiket</Button>

                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Trending;
