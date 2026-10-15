import "./ScoreBoardControl.css";
import { useState, useEffect } from "react";
import type { IScoreBoard } from "./ScoreBoardService";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
const ScoreBoardControl = () => {
    const API_URL = window.APP_CONFIG.API_URL;

    const [scoreBoard, setScoreBoard] = useState<IScoreBoard>({
        player1Name: "",
        player2Name: "",
        player1Score: 0,
        player2Score: 0,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setScoreBoard((previous) => ({
            ...previous,
            [name]: name.includes("Score") ? Number(value) : value,
        }));
    };

    useEffect(() => {
        const loadScore = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/scoreboard/get`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data: IScoreBoard = await response.json();

                setScoreBoard(data);
            } catch (error) {
                console.error("Failed to load scoreboard:", error);
            }
        };

        loadScore();

    }, []);
    const sendInformation = async (board: IScoreBoard) => {
        try {
            const response = await fetch(
                `${API_URL}/api/scoreboard/update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(board),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to send scoreboard:", error);
        }
    };

    const onSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await sendInformation(scoreBoard);
    }

    const playerWin = async (player: number) => {
        const newBoard = {
            ...scoreBoard,
            ...(player === 1
                ? { player1Score: scoreBoard.player1Score + 1 }
                : player === 2
                    ? { player2Score: scoreBoard.player2Score + 1 }
                    : {}),
        };

        if (player !== 1 && player !== 2) {
            console.error("Invalid player number");
            return;
        }

        setScoreBoard(newBoard);
        await sendInformation(newBoard);
    };

    const resetScore = async () => {
        const newBoard: IScoreBoard = {
            player1Name: "",
            player2Name: "",
            player1Score: 0,
            player2Score: 0,
        };

        setScoreBoard(newBoard);
        await sendInformation(newBoard);
    };

    const swapPlayers = async () => {
        const newBoard: IScoreBoard = {
            player1Name: scoreBoard.player2Name,
            player2Name: scoreBoard.player1Name,
            player1Score: scoreBoard.player2Score,
            player2Score: scoreBoard.player1Score,
        };

        setScoreBoard(newBoard);
        await sendInformation(newBoard);
    };

    return (
        <div data-bs-theme="dark" className="bg-dark text-light min-vh-100">
            <Container className="py-4">
                <Form>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="player1Name">
                                <Form.Label>Player 1 Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="player1Name"
                                    value={scoreBoard.player1Name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="player2Name">
                                <Form.Label>Player 2 Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="player2Name"
                                    value={scoreBoard.player2Name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="player1Score">
                                <Form.Label>Player 1 Score</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="player1Score"
                                    value={scoreBoard.player1Score}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="player2Score">
                                <Form.Label>Player 2 Score</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="player2Score"
                                    value={scoreBoard.player2Score}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Container className="d-flex p-0 gap-1 justify-content-between">
                        <Button
                            className="p-4 px-4"
                            onClick={() => { playerWin(1) }}
                        >
                            P1 WIN
                        </Button>
                        <Button
                            variant="primary"
                            type="button"
                            className="p-4 px-4"
                            onClick={onSubmitClick}
                        >
                            Update
                        </Button>
                        <Button
                            className="p-4 px-4"
                            onClick={() => { playerWin(2) }}
                        >
                            P2 WIN
                        </Button>
                    </Container>
                    <Container className="d-flex justify-content-center my-2">
                        <Button className="bg-warning text-dark" onClick={swapPlayers }>
                            Swap Players
                        </Button>
                        <Button className="p-4 px-4 bg-danger" onClick={resetScore} >
                            Reset
                        </Button>
                    </Container>
                </Form>
            </Container>
        </div>
    );
};

export default ScoreBoardControl;