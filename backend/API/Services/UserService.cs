using API.Models;
using API.Services.Interfaces;
using SistemaSimplesComAutenticacaoJwt.Repositories.UserApi.Repositories;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<User> GetAll()
        {
            return _userRepository.GetAll();
        }

        public User GetById(string id)
        {
            return _userRepository.GetById(id);
        }

        public User Create(User user)
        {
            return _userRepository.Create(user);
        }

        public void Update(string id, User user)
        {
            _userRepository.Update(id, user);
        }

        public void Delete(string id)
        {
            _userRepository.Delete(id);
        }
    }
}
