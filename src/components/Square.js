import React from 'react';
import cover from '../img/cover.png';

const Square = ({ card, onButtonClick, setHistory }) => {
    const buttonStyle = {
        backgroundImage: card.isOpen ? `url(${card.image})` : `url(${cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const handleClick = () => {
        if(!card.isOpen) {
            onButtonClick(card.id, card.image);

        }
    };

    return (
        <button className='square' style={buttonStyle} onClick={handleClick}
        >
          {/*  <img src={card.image} alt="Card" />*/}
        </button>
    );
};

export default Square;
