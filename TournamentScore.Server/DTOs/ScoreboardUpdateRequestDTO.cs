namespace TournamentScore.Server.DTOs
{
    public class ScoreboardUpdateRequestDTO
    {
        public required string Player1Name { get; set; }
        public required string Player2Name { get; set; }
        public int Player1Score { get; set; }
        public int Player2Score { get; set; }
    }
}
