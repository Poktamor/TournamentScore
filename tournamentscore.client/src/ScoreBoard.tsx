import player1Score from "./assets/Player1Score.svg";
import player1Name from "./assets/Player1Name.svg";
import player2Name from "./assets/Player2Name.svg";
import player2Score from "./assets/Player2Score.svg";

import { useState } from "react";

function ScoreBoard() {
    const [Player1Name, setPlayer1Name] = useState<string>("ジェットストリーム");
    const [Player1Score, setPlayer1Score] = useState<number>(3);
    const [Player2Name, setPlayer2Name] = useState<string>("Or3n");
    const [Player2Score, setPlayer2Score] = useState<number>(2);

    const content = (
        <main id="mainContainer">
            <section id="player1Container">
                <div className="Player1ScoreContainer">
                    <img src={player1Score} />
                    <div className="centered">{Player1Score}</div>
                </div>
                <div className="Player1NameContainer">
                    <img src={player1Name} />
                    <div className="right">{Player1Name}</div>
                </div>
            </section>

            <section id="player2Container">

                <div className="Player1NameContainer">
                    <img src={player2Name} />
                    <div className="left">{Player2Name}</div>
                </div>
                <div className="Player1ScoreContainer">
                    <img src={player2Score} />
                    <div className="centered">{Player2Score}</div>
                </div>
            </section>
        </main>
    );
    return content;
}

export default ScoreBoard;