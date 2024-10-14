using API.Models;

namespace API.Services.Interfaces
{
    public interface IUserService
    {
        List<User> GetAll();
        User GetById(string id);
        User Create(User user);
        void Update(string id, User user);
        void Delete(string id);
    }
}
