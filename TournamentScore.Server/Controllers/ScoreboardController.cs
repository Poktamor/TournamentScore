using Microsoft.AspNetCore.Mvc;
using TournamentScore.Server.DTOs;
using TournamentScore.Server.Services;

namespace TournamentScore.Server.Controllers
{
    public class ScoreboardController : ControllerBase
    {
        private readonly SignalRService _signalRService;

        private readonly ScoreboardState _scoreboardState;

        public ScoreboardController(SignalRService signalRService, ScoreboardState scoreboardState)
        {
            _signalRService = signalRService;
            _scoreboardState = scoreboardState;
        }
        [HttpPost("api/scoreboard/update")]
        public async Task<IActionResult> UpdateScoreBoard([FromBody] ScoreboardUpdateRequestDTO request)
        {
            _scoreboardState.Current = request;
            await _signalRService.UpdateScoreBoard(request);
            return Ok();
        }
        [HttpGet("api/scoreboard/get")]
        public IActionResult GetScoreBoard()
        {
            return Ok(_scoreboardState.Current);
        }
    }
}
