import "./ScoreBoardControl.css";

const ScoreBoardControl = () => {
    return (
        <main id="ScoreBoardControl">
            <form >
                <section id="Player1ScoreControl" className="PlayerScoreControl">
                    <div>
                        <label htmlFor="player1Name">Player 1 Name</label>
                        <input
                            type="text"
                            id="player1Name"
                            name="player1Name"
                        />
                    </div>

                    
                    <div>
                        <label htmlFor="player2Name">Player 2 Name</label>
                        <input
                            type="text"
                            id="player2Name"
                            name="player2Name"
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
                        />
                    </div>

                    <div>
                        <label htmlFor="player2Score">Player 2 Score</label>
                        <input
                            type="number"
                            id="player2Score"
                            name="player2Score"
                        />
                    </div>
                </section>
                <button type="submit">Send</button>
            </form>
        </main>
    );
};

export default ScoreBoardControl;