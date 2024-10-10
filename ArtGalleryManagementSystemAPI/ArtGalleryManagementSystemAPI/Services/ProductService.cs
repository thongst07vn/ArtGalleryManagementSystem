
using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface ProductService
{
    public List<ProductDto> FindAll();

    public ProductDto FindById(int id);
    public ProductWithSellerDto FindByIdWithSeller(int id);
    public ProductWithAttributesDto FindByIdWithAttributes(int id);
    public List<ProductWithSellerDto> FindByCategoryId(int id);
    public List<ProductWithSellerDto> AllProductWithSeller();
    public List<ProductWithSellerDto> SortByPrice(double min, double max);
    public List<ProductWithSellerDto> SortByPriceLowHigh(string value, double min, double max);
    public List<ProductWithSellerDto> SearchByKeyword(string value);
    public List<CategoryDto> FindAllCategory();
    public bool PostArt(ProductWithAttributesDto productWithAttributesDto);
}

