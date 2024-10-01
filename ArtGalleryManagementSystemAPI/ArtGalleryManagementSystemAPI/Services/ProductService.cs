using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface ProductService
{
    public List<ProductDto> FindAll();

    public ProductDto FindById(int id);

    public List<ProductWithSellerDto> AllProductWithSeller();
}
