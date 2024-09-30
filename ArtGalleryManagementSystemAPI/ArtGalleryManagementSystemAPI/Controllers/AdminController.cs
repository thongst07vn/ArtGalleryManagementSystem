using Microsoft.AspNetCore.Mvc;

namespace ArtGalleryManagementSystemAPI.Controllers;
public class AdminController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
