import './App.css';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import Board from "./components/Board";
import helmet from './img/helmet-1.png'
import potion from './img/potion-1.png'
import ring from './img/ring-1.png'
import scroll from './img/scroll-1.png'
import shield from './img/shield-1.png'
import sword from './img/sword-1.png'
import cover from './img/cover.png'


const initialCards = Array(12).fill(null).map(() => (
    {
        id: uuidv4(),
        image: cover,
        isOpen: false,
    }
));

function App() {
    const pictures = [helmet, potion, ring, scroll, shield, sword];
    const [cards, setCards] = useState(initialCards);
    const [history, setHistory] = useState([]);
    const [block, setBlock] = useState(false);

    const handleNewGame = () => {
        setCards((prevCards) =>
            prevCards.map((card) => ({
                ...card,
                isOpen: false,
            }))
        );
    };

    const handleButtonClick = (cardId, image) => {
        if (!block) {
            setCards((prevCards) =>
                prevCards.map((card) => {
                    if (card.id === cardId) {
                        return {...card, isOpen: true};
                    }
                    return card;
                })
            );

            setHistory((prevHistory) => [...prevHistory, image]);
            setBlock(true)
        }
    };
    const setRandomPlace = () => {
        const newCards = cards.map((element) => ({...element, image: null}));

        for (let i = 0; i < pictures.length; i++) {
            for (let time = 1; time <= 2; time++) {
                let index = Math.trunc(Math.random() * newCards.length);
                while (newCards[index].image !== null && newCards[index].image !== cover) {
                    index = Math.trunc(Math.random() * newCards.length);
                }
                newCards[index].image = pictures[i];
            }
        }
        setCards(newCards);
    };

    useEffect(() => {
        setRandomPlace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkMoves = () => {
        if (history[history.length - 1] !== history[history.length - 2]) {
            const picture1 = history[history.length - 1]
            const picture2 = history[history.length - 2]
            const newCards = cards.map((element) =>
                element.image === picture1 || element.image === picture2 ? {...element, isOpen: false} : element)
            setCards(newCards)
        }
    }

    useEffect(() => {
        if (history.length % 2 === 0) {
            setTimeout(() => {
                checkMoves()
                setBlock(false)
            }, 1000)
        } else {
            setBlock(false)
        }
    }, [history])


    return (
        <div className="App">
            <h2 className="heading-animation" style={{color: 'purple'}}>
                ------- Magic ------- <br/>--- Memory ---<br/>- Game! -
            </h2>
            <button onClick={handleNewGame}>New Game</button>

            <div style={{marginTop: '40px'}}>
                <Board cards={cards} onButtonClick={handleButtonClick}/>
            </div>
        </div>
    );
}

export default App;
