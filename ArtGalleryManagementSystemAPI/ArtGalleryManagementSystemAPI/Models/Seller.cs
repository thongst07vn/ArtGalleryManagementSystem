namespace ArtGalleryManagementSystemAPI.Models;

public partial class Seller
{
    public int Id { get; set; }

    public double? Income { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual User IdNavigation { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
