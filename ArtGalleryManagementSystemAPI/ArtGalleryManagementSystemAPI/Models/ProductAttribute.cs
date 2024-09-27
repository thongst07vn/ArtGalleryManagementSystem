using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class ProductAttribute
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public string? Value { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
