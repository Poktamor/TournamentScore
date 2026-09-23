using TournamentScore.Server.DTOs;

namespace TournamentScore.Server.Services
{
    public class ScoreboardState
    {
        public ScoreboardUpdateRequestDTO Current { get; set; } =
        new ScoreboardUpdateRequestDTO
        {
            Player1Name = "Player 1",
            Player2Name = "Player 2",
            Player1Score = 0,
            Player2Score = 0
        };
    }
}
