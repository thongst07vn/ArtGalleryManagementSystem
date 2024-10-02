using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface AdminService
{
    public List<UserDto> FindAllUser();
    public List<UserDto> FindAllSeller();

}
