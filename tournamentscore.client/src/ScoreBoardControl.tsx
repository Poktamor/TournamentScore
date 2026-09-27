import "./ScoreBoardControl.css";
import { useState } from "react";
import type { IScoreBoard } from "./ScoreBoardService";

const ScoreBoardControl = () => {
    const [scoreBoard, setScoreBoard] = useState<IScoreBoard>({
        player1Name: "",
        player2Name: "",
        player1Score: 0,
        player2Score: 0,
    });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setScoreBoard((previous) => ({
            ...previous,
            [name]:
                event.target.type === "number"
                    ? Number(value)
                    : value,
        }));
    };

    const sendScore = async () => {
        try {
            const response = await fetch(
                "https://localhost:7170/api/scoreboard/update",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(scoreBoard),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to send scoreboard:", error);
        }
    };
    return (
        <main id="ScoreBoardControl">
            <form>
                <section id="Player1ScoreControl" className="PlayerScoreControl">
                    <div>
                        <label htmlFor="player1Name">Player 1 Name</label>
                        <input
                            type="text"
                            id="player1Name"
                            name="player1Name"
                            value={scoreBoard.player1Name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="player2Name">Player 2 Name</label>
                        <input
                            type="text"
                            id="player2Name"
                            name="player2Name"
                            value={scoreBoard.player2Name}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                <section className="PlayerScoreControl">
                    <div>
                        <label htmlFor="player1Score">Player 1 Score</label>
                        <input
                            type="number"
                            id="player1Score"
                            name="player1Score"
                            value={scoreBoard.player1Score}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="player2Score">Player 2 Score</label>
                        <input
                            type="number"
                            id="player2Score"
                            name="player2Score"
                            value={scoreBoard.player2Score}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                <button type="submit" onClick={()=>{sendScore()}} >Send</button>
            </form>
        </main>
    );
};

export default ScoreBoardControl;