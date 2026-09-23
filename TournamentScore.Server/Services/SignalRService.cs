using Microsoft.AspNetCore.SignalR;
using System.Data;
using TournamentScore.Server.Configurations;
using TournamentScore.Server.DTOs;

namespace TournamentScore.Server.Services
{
    public class SignalRService
    {
        private readonly IHubContext<UpdateHub> _hubContext;
        public SignalRService(IHubContext<UpdateHub> hub)
        {
            _hubContext = hub;
        }

        public async Task UpdateScoreBoard(ScoreboardUpdateRequestDTO request)
        {
            await _hubContext.Clients.All.SendAsync("UpdateScoreBoard", request.Player1Name, request.Player2Name, request.Player1Score, request.Player2Score);
        }
    }
}
