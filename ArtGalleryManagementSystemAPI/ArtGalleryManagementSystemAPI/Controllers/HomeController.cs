
using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Helpers;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

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

    [Produces("application/json")]
    [HttpGet("findproductbyidwithattributes/{id}")]
    public IActionResult findproductbyidwithattributes(int id)
    {

        try
        {
            return Ok(productService.FindByIdWithAttributes(id));
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
    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("createrart")]
    public IActionResult CreateArt(IFormFile image, string productInfo, string attributeInfo)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy" });
        var productAttributeDto = JsonConvert.DeserializeObject<List<ProductAttributeDto>>(attributeInfo);
        var productDto = JsonConvert.DeserializeObject<ProductWithAttributesDto>(productInfo);
        if (image != null && image.Length > 0)
        {
            var newFileName = FileHelper.generateFileName(image.FileName);
            var path = Path.Combine(webHostEnvironment.WebRootPath, "images", newFileName);
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }
            productDto.Image = newFileName;
        }
        else
        {
            productDto.Image = "noimg.jpg";

        }
        productDto.ProductAttributes = productAttributeDto;
        try
        {

            return Ok(new
            {
                result = productService.PostArt(productDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}

