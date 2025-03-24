import React from 'react';
import styled from 'styled-components';
import Foto from "./fotopets.png";

const BannerContainer = styled.div`
  width: 100%;
  background-color: ##DAA520;
  padding: 5px;
  text-align: center;
  margin-bottom: 15px;
`;

const BannerText = styled.p`
  font-size: 1.2em;
  color: #333;
`;

const BannerImage = styled.img`
    max-width: 400px; // Ajuste o tamanho da imagem conforme necessário
    margin-bottom: 10px;
`;

const Banner = ({ text }) => {
  return (
    <BannerContainer>
        <BannerImage src={Foto} alt="Foto do Pet" />
      <BannerText>{text}</BannerText>
    </BannerContainer>
  );
};

export default Banner;