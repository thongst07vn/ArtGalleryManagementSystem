using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

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
    public List<ProductDto> FindAll()
    {
        return mapper.Map<List<ProductDto>>(db.Products).ToList();
    }

    public ProductDto FindById(int id)
    {
        return mapper.Map<ProductDto>(db.Products.Find(id));
    }
}
