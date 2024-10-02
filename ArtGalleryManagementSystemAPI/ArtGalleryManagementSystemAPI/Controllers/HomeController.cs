
using ArtGalleryManagementSystemAPI.Dtos;
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
    [HttpGet("findallproductwithseller")]
    public IActionResult FindAllProductWithSeller()
    {

        try
        {
            return Ok(productService.AllProductWithSeller());
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

    [Produces("application/json")]
    [HttpGet("findproductbyidwithseller/{id}")]
    public IActionResult FindProductByIdWithSeller(int id)
    {

        try
        {
            return Ok(new
            {
                result = productService.FindByIdWithSeller(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("sortbyprice")]
    public IActionResult SortByPrice([FromBody] PriceRangeDto values)
    {

        try
        {
            return Ok(productService.SortByPrice(values.min, values.max));

        }
        catch
        {
            return BadRequest();
        }
    }

    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("sortbypricelowhigh")]
    public IActionResult SortByPriceLowHigh([FromBody] PriceRangeDto values)
    {

        try
        {
            return Ok(productService.SortByPriceLowHigh(values.value, values.min, values.max));

        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("searchbykeyword/{value}")]
    public IActionResult SearchByKeyword(string value)
    {

        try
        {
            if (value != "" || value != null)
            {
                return Ok(productService.SearchByKeyword(value.ToLower()));

            }
            else
            {
                return Ok(productService.AllProductWithSeller());

            }

        }
        catch
        {
            return BadRequest();
        }
    }
}

