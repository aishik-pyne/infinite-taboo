using Microsoft.Extensions.Configuration;
using TabooApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Threading.Tasks;
using System.Linq;

namespace TabooApi.Services
{
    public interface IGuessWordService
    {
        Task<GuessWord> GetRandomGuessWord();
    }
}