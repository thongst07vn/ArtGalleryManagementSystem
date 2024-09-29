namespace ArtGalleryManagementSystemAPI.Models;

public partial class Cart
{
    public int Id { get; set; }

    public double? Total { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual User IdNavigation { get; set; } = null!;
}
