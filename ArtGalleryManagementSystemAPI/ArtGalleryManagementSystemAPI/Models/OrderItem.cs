﻿using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class OrderItem
{
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual OrderDetail? Order { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
