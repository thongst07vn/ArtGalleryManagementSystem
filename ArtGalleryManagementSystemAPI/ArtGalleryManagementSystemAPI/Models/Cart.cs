﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class Cart
{
    public int Id { get; set; }

    public double? Total { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; }

    public virtual User IdNavigation { get; set; }
}