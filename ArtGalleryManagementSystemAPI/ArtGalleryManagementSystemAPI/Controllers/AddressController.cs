using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
    [HttpGet("findalladdress/{userId}")]
    public IActionResult FindAlladdress(int userId)
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindAllAddress(userId)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("addAddress")]
    public IActionResult Addaddress(string addressInfor)
    {
        try
        {
            var addressDto = JsonConvert.DeserializeObject<AddressDto>(addressInfor);

            return Ok(new
            {
                result = addressService.AddAddress(addressDto)
            });
        }
        catch
        {
            return BadRequest();
        }
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
