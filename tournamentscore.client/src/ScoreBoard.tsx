import player1Score from "./assets/Player1Score.svg";
import player1Name from "./assets/Player1Name.svg";
import player2Name from "./assets/Player2Name.svg";
import player2Score from "./assets/Player2Score.svg";

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface ScoreBoard {
    player1Name: string;
    player2Name: string;
    player1Score: number;
    player2Score: number;
}

const ScoreBoard = () => {
    const [scoreBoard, setScoreBoard] = useState<ScoreBoard | null>(null);

    useEffect(() => {
        const loadScore = async () => {
            try {
                const response = await fetch(
                    "https://localhost:7170/api/scoreboard/get"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data: ScoreBoard = await response.json();

                setScoreBoard(data);
            } catch (error) {
                console.error("Failed to load scoreboard:", error);
            }
        };

        loadScore();

        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7170/hubs/updates")
            .build(); 

        connection.on("UpdateScoreBoard", (player1Name: string, player2Name: string, player1Score: number, player2Score: number) => {
            setScoreBoard({ player1Name, player2Name, player1Score, player2Score });
        })

        connection.start().catch((err) => console.error(err));
    }, []);

    return (
        <main id="mainContainer">
            <section id="player1Container">
                <div className="Player1ScoreContainer">
                    <img src={player1Score} />
                    <div className="centered">
                        {scoreBoard?.player1Score}
                    </div>
                </div>

                <div className="Player1NameContainer">
                    <img src={player1Name} />
                    <div className="right">
                        {scoreBoard?.player1Name}
                    </div>
                </div>
            </section>

            <section id="player2Container">
                <div className="Player1NameContainer">
                    <img src={player2Name} />
                    <div className="left">
                        {scoreBoard?.player2Name}
                    </div>
                </div>

                <div className="Player1ScoreContainer">
                    <img src={player2Score} />
                    <div className="centered">
                        {scoreBoard?.player2Score}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ScoreBoard;