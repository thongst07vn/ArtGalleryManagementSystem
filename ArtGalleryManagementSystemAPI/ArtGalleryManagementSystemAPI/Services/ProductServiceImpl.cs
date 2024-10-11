
using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ArtGalleryManagementSystemAPI.Services;

public class ProductServiceImpl : ProductService
{
    private DatabaseContext db;
    private IMapper mapper;
    public ProductServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public List<ProductWithSellerDto> AllProductWithSeller()
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Seller.IdNavigation.DeletedAt == null && p.Type == 1).ToList());
    }

    public List<ProductDto> FindAll()
    {
        return mapper.Map<List<ProductDto>>(db.Products.ToList());
    }

    public List<CategoryDto> FindAllCategory()
    {
        return mapper.Map<List<CategoryDto>>(db.Categories.ToList());
    }

    public List<ProductWithSellerDto> FindByCategoryId(int id)
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.CategoryId == id && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1).ToList());
    }

    public ProductWithAttributesDto FindById(int id)
    {
        return mapper.Map<ProductWithAttributesDto>(db.Products.Find(id));
    }
    public List<ProductDto> FindBySellerId(int id)
    {
        return mapper.Map<List<ProductDto>>(db.Products.Where(src => src.SellerId == id));
    }
    public ProductWithAttributesDto FindByIdWithAttributes(int id)
    {
        return mapper.Map<ProductWithAttributesDto>(
            db.Products
            .Include(p => p.ProductAttributesProducts)
        .ThenInclude(pap => pap.ProductAttributes).FirstOrDefault(p => p.Id == id)
        );

    }

    public ProductWithSellerDto FindByIdWithSeller(int id)
    {
        return mapper.Map<ProductWithSellerDto>(db.Products.Find(id));

    }

    public bool PostArt(ProductWithAttributesDto productWithAttributesDto)
    {
        try
        {
            var product = mapper.Map<Product>(productWithAttributesDto);
            db.Products.Add(product);
            if (db.SaveChanges() > 0)
            {

                for (var i = 0; i < productWithAttributesDto.ProductAttributes.Count; i++)
                {
                    var productAttribute = new ProductAttribute();
                    productAttribute.Type = productWithAttributesDto.ProductAttributes[i].Type;
                    productAttribute.Value = productWithAttributesDto.ProductAttributes[i].Value;
                    db.ProductAttributes.Add(productAttribute);
                    if (db.SaveChanges() > 0)
                    {
                        var product_productAttribute = new ProductAttributesProduct
                        {
                            ProductsId = product.Id,
                            ProductAttributesId = productAttribute.Id
                        };
                        db.ProductAttributesProducts.Add(product_productAttribute);
                        db.SaveChanges();
                    }
                }

            }
            return true;
        }
        catch
        {
            return false;
        }
    }

    public List<ProductWithSellerDto> SearchByKeyword(string value)
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => (p.Name.ToLower().Contains(value) || p.Seller.IdNavigation.Username.ToLower().Contains(value)) && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1).ToList());
    }

    public List<ProductWithSellerDto> SortByPrice(double min, double max)
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Price < max && p.Price > min && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1).ToList());
    }

    public List<ProductWithSellerDto> SortByPriceLowHigh(string value, double min, double max)
    {
        if (value == "1")
        {
            return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Price < max && p.Price > min && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1).OrderBy(p => p.Price).ToList());
        }
        else if (value == "2")
        {
            return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Price < max && p.Price > min && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1).OrderByDescending(p => p.Price).ToList());
        }
        else
        {
            return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Price < max && p.Price > min && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1).ToList());
        }

    }
}

