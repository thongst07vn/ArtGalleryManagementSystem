using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class Product
{
    public int Id { get; set; }

    public int? SellerId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Summary { get; set; }

    public string? Cover { get; set; }

    public int? CategoryId { get; set; }

    public double? Price { get; set; }

    public int? Quantity { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<BidOrder> BidOrders { get; set; } = new List<BidOrder>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Seller? Seller { get; set; }

    public virtual ICollection<CartItem> CartItemProducts { get; set; } = new List<CartItem>();

    public virtual ICollection<OrderItem> OrderItemProducts { get; set; } = new List<OrderItem>();

    public virtual ICollection<ProductAttribute> ProductAttributes { get; set; } = new List<ProductAttribute>();

    public virtual ICollection<Wishlist> WishlistProducts { get; set; } = new List<Wishlist>();
}
