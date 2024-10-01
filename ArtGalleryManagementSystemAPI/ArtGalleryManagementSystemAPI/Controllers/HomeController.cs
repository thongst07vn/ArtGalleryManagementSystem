using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/home")]
public class HomeController : Controller
{
    private ProductService productService;
    private IWebHostEnvironment webHostEnvironment;
    public HomeController(ProductService _productService, IWebHostEnvironment _webHostEnvironment)
    {
        productService = _productService;
        webHostEnvironment = _webHostEnvironment;

    }

    [Produces("application/json")]
    [HttpGet("findallproduct")]
    public IActionResult FindAllProduct()
    {

        try
        {
            return Ok(productService.FindAll());
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findproductbyid/{id}")]
    public IActionResult FindProductById(int id)
    {

        try
        {
            return Ok(productService.FindById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
}
