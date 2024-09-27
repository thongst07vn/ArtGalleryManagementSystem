﻿using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class OrderDetail
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? PaymentId { get; set; }

    public double? Total { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual PaymentDetail IdNavigation { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
