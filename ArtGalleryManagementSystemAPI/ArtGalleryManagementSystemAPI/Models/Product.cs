﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class Product
{
    public int Id { get; set; }

    public int? SellerId { get; set; }

    public string Name { get; set; }

    public int? Type { get; set; }

    public string Description { get; set; }

    public int? CategoryId { get; set; }

    public double? Price { get; set; }

    public int? Quantity { get; set; }

    public string Image { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<BidOrder> BidOrders { get; set; } = new List<BidOrder>();

    public virtual ICollection<CartItemProduct> CartItemProducts { get; set; } = new List<CartItemProduct>();

    public virtual Category Category { get; set; }

    public virtual ICollection<OrderItemProduct> OrderItemProducts { get; set; } = new List<OrderItemProduct>();

    public virtual ICollection<ProductAttributesProduct> ProductAttributesProducts { get; set; }

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Seller Seller { get; set; }

    public virtual ICollection<WishlistProduct> WishlistProducts { get; set; } = new List<WishlistProduct>();
}