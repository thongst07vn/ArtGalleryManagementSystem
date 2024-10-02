using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class AdminServiceImpl : AdminService
{
    private DatabaseContext db;
    private IMapper mapper;
    public AdminServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public List<UserDto> FindAllSeller()
    {
        return mapper.Map<List<UserDto>>(db.Users.Where(u => u.Role == 2).ToList());
    }

    public List<UserDto> FindAllUser()
    {
        return mapper.Map<List<UserDto>>(db.Users.Where(u => u.Role == 1).ToList());
    }
}
