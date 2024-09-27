namespace ArtGalleryManagementSystemAPI.Models;

public partial class User
{
    public int Id { get; set; }

    public int? Role { get; set; }

    public string? Avatar { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Password { get; set; }

    public DateTime BirthOfDate { get; set; }

    public string? PhoneNumber { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<BidOrder> BidOrders { get; set; } = new List<BidOrder>();

    public virtual Cart IdNavigation { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Seller? Seller { get; set; }

    public virtual ICollection<Wishlist> WishlistUsers { get; set; } = new List<Wishlist>();
}
