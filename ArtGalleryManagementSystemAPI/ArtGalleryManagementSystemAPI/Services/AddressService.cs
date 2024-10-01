using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface AddressService
{
    public List<ProvinceDto> FindAllProvince();
    public List<DistrictDto> FindDistrictByProvinceCode(string provinceCode);
    public List<WardDto> FindWardByDistrictCode(string districtCode);

}
