using Microsoft.Extensions.Configuration;
using TabooApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Threading.Tasks;
using System;

namespace TabooApi.Services
{
    public class GuessWordService : IGuessWordService
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<GuessWord> _guessWordsCollection;

        public GuessWordService(MongoClient mongoClient, IConfiguration configuration)
        {
            this._configuration = configuration;
            string DatabaseName = this._configuration["TabooApiDatabaseSettings:DatabaseName"];
            IMongoDatabase database = mongoClient.GetDatabase(this._configuration["TabooApiDatabaseSettings:DatabaseName"]);
            this._guessWordsCollection = database.GetCollection<GuessWord>(this._configuration["TabooApiDatabaseSettings:GuessWordsCollectionName"]);
        }
        public async Task<GuessWord> GetRandomGuessWord()
        {
            int count = (int) await this._guessWordsCollection.CountDocumentsAsync(new BsonDocument{});
            int randomDoc = new Random().Next(0, count);
            return await this._guessWordsCollection
                .Find(_ => true)
                .Skip(randomDoc)
                .FirstAsync();
        }
    }
}