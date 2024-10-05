
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

    public ProductDto FindById(int id)
    {
        return mapper.Map<ProductDto>(db.Products.Find(id));
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

