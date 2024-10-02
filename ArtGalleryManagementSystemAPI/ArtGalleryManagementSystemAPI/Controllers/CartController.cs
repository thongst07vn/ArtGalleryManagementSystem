using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/cart")]
public class CartController : Controller
{
    private CartService cartService;
    private UserService userService;
    public CartController(CartService _cartService, UserService _userService)
    {
        cartService = _cartService;
        userService = _userService;
    }

    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("addtocart")]
    public IActionResult AddToCart([FromBody] CartItemDto cartItemDto)
    {
        try
        {
            return Ok(new
            {
                result = cartService.AddProductToCart(cartItemDto)
            });

        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("innercart/{id}")]
    public IActionResult UserCart(int id)
    {
        try
        {
            return Ok(new
            {
                result = cartService.FindAllCartItem(id)
            });

        }
        catch
        {
            return BadRequest();
        }
    }
}
