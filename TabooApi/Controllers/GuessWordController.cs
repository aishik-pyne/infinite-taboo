using TabooApi.Models;
using TabooApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TabooApi.Controllers
{
    [Route("api/guessword")]
    [ApiController]
    public class GuessWordsController : ControllerBase
    {
        IGuessWordService guessWordService;
        public GuessWordsController(IGuessWordService guessWordService)
        {
            this.guessWordService = guessWordService;
        }

        [HttpGet]
        public async Task<ActionResult<GuessWord>> Get()
        {
            return await this.guessWordService.GetRandomGuessWord();
        }
    }
}