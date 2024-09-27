using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class PaymentDetail
{
    public int Id { get; set; }

    public double? Amount { get; set; }

    public string? Provider { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual OrderDetail? OrderDetail { get; set; }
}
