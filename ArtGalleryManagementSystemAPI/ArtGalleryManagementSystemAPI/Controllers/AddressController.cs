using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/address")]
public class AddressController : Controller
{
    private AddressService addressService;
    private IWebHostEnvironment webHostEnvironment;
    public AddressController(AddressService _addressService, IWebHostEnvironment _webHostEnvironment)
    {
        addressService = _addressService;
        webHostEnvironment = _webHostEnvironment;

    }
    [Produces("application/json")]
    [HttpGet("findallprovince")]
    public IActionResult FindAll()
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindAllProvince()
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("finddistrictbyprovincecode/{provinceCode}")]
    public IActionResult FindDistrictByProvincecode(string provinceCode)
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindDistrictByProvinceCode(provinceCode)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findwardbydistrictcode/{districtCode}")]
    public IActionResult FindWardByDistrictcode(string districtCode)
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindWardByDistrictCode(districtCode)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}
