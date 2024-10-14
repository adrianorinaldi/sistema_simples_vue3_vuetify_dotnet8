using API.Models;

namespace SistemaSimplesComAutenticacaoJwt.Repositories
{
    namespace UserApi.Repositories
    {
        public interface IUserRepository
            {
                List<User> GetAll();
                User GetById(string id);
                User Create(User user);
                void Update(string id, User user);
                void Delete(string id);
            }

    }

}
