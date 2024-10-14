using API.Models;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Policy = "RootPolicy")]
        public ActionResult<List<User>> GetAll()
        {
            return _userService.GetAll();
        }

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> GetById(string id)
        {
            var user = _userService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _userService.Create(user);
            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, User user)
        {
            var existingUser = _userService.GetById(id);

            if (existingUser == null)
            {
                return NotFound();
            }

            _userService.Update(id, user);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var user = _userService.GetById(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Delete(id);

            return NoContent();
        }
    }
}
