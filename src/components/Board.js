import React from 'react';
import Square from "./Square";

const Board = ({ cards, onButtonClick, setHistory }) => {
    return (
        <div className='board'>
            {cards.map(card =>
                <Square
                    key={card.id}
                    card={card}
                    onButtonClick={onButtonClick}
                    setHistory={setHistory}
                />
            )}
        </div>
    );
};

export default Board;
