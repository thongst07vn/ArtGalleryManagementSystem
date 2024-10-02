using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/admin")]
public class AdminController : Controller
{
    private AdminService adminService;
    private IWebHostEnvironment webHostEnvironment;
    public AdminController(AdminService _adminService, IWebHostEnvironment _webHostEnvironment)
    {
        adminService = _adminService;
        webHostEnvironment = _webHostEnvironment;

    }
    [Produces("application/json")]
    [HttpGet("findalluser")]
    public IActionResult FindAll()
    {
        try
        {

            return Ok(new
            {
                result = adminService.FindAllUser()
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findallseller")]
    public IActionResult FindAllseller()
    {
        try
        {

            return Ok(new
            {
                result = adminService.FindAllSeller()
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}
