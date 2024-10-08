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

        var itemsInCart = cartService.FindAllCartItem((int)cartItemDto.CartId);
        foreach (var item in itemsInCart)
        {
            if (item.ProductId == cartItemDto.ProductId)
            {
                return Ok(new
                {
                    result = cartService.UpdateProductInCart(cartItemDto)
                });
            }
        }
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
    [Produces("application/json")]
    [Consumes("application/json")]

    [HttpDelete("deleteitem/{id}")]
    public IActionResult DeleteItem(int id)
    {
        try
        {
            return Ok(new
            {
                result = cartService.DeleteItem(id)
            });

        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("application/json")]

    [HttpDelete("deleteallitem/{cartId}")]
    public IActionResult DeleteAll(int cartId)
    {
        try
        {
            return Ok(new
            {
                result = cartService.DeleteAllItem(cartId)
            });

        }
        catch
        {
            return BadRequest();
        }
    }
}
