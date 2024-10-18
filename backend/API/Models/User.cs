
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace API.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("full_name")]
        public string? FullName { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("role")]
        public string? Role { get; set; }

        [BsonElement("status")]
        public string? Status { get; set; } = "ativo";
    }
}
