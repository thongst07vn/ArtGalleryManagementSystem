using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class Wishlist
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
