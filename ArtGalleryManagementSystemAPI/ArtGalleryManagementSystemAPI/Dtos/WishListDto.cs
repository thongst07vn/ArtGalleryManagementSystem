namespace ArtGalleryManagementSystemAPI.Dtos;

public class WishListDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int? UserId { get; set; }

    public int? ProductId { get; set; }
    public string ProductName { get; set; }
    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }
}
