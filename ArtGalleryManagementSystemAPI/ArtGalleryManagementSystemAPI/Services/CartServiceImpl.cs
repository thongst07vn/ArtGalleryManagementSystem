using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class CartServiceImpl : CartService
{
    private DatabaseContext db;
    private IMapper mapper;
    public CartServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public bool AddProductToCart(CartItemDto cartItemDto)
    {
        var cartItem = mapper.Map<CartItem>(cartItemDto);
        db.CartItems.Add(cartItem);
        if (db.SaveChanges() > 0)
        {
            var cartItemProduct = new CartItemProduct();
            cartItemProduct.ProductsId = (int)cartItemDto.ProductId;
            cartItemProduct.CartItemProductId = (int)cartItemDto.CartId;
            db.CartItemProducts.Add(cartItemProduct);
        }
        return db.SaveChanges() > 0;
    }

    public bool CreateOrder(OrderDetailDto orderDetailDto, List<OrderItemDto> orderItems)
    {
        var orderDetail = mapper.Map<OrderDetail>(orderDetailDto);
        db.OrderDetails.Add(orderDetail);
        if (db.SaveChanges() > 0)
        {
            foreach (var item in orderItems)
            {
                item.OrderId = orderDetail.Id;
                item.CreatedAt = orderDetailDto.CreatedAt;
                var orderItem = mapper.Map<OrderItem>(item);
                db.OrderItems.Add(orderItem);
            }
        }
        return db.SaveChanges() > 0;
    }

    public bool DeleteAllItem(int cartId)
    {
        var item = db.CartItems.Where(c => c.CartId == cartId).ToList();
        db.CartItems.RemoveRange(item);
        return db.SaveChanges() > 0;
    }

    public bool DeleteItem(int id)
    {
        var item = db.CartItems.Find(id);
        db.CartItems.Remove(item);
        return db.SaveChanges() > 0;
    }

    public List<CartItemDto> FindAllCartItem(int id)
    {
        return mapper.Map<List<CartItemDto>>(db.CartItems.Where(c => c.CartId == id).ToList());
    }

    public CartDto FindById(int id)
    {
        return mapper.Map<CartDto>(db.Carts.Find(id));
    }

    public bool UpdateProductInCart(CartItemDto cartItemDto)
    {
        var item = db.CartItems.SingleOrDefault(i => i.ProductId == cartItemDto.ProductId && i.CartId == cartItemDto.CartId);
        if (item != null)
        {
            item.Quantity += cartItemDto.Quantity;
            db.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges() > 0;
        }
        else { return false; }

    }
}
