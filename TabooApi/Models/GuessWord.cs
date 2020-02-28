using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TabooApi.Models
{
    public class GuessWord
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("GuessWord")]
        public string GuessWordName { get; set; }

        [BsonElement("TabooWord")]
        public string[] TabooWords { get; set; }
    }
}