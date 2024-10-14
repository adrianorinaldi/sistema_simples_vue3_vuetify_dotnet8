using API.Models;
using MongoDB.Driver;
using SistemaSimplesComAutenticacaoJwt.Repositories.UserApi.Repositories;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(IMongoDatabase database)
        {
            _users = database.GetCollection<User>("user");
        }

        public List<User> GetAll()
        {
            return _users.Find(user => true).ToList();
        }

        public User GetById(string id)
        {
            return _users.Find(user => user.Id == id).FirstOrDefault();
        }

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, User user)
        {
            _users.ReplaceOne(u => u.Id == id, user);
        }

        public void Delete(string id)
        {
            _users.DeleteOne(user => user.Id == id);
        }
    }
}
