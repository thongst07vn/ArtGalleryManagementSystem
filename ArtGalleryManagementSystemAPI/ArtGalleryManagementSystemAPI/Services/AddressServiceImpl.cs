using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class AddressServiceImpl : AddressService
{
    private DatabaseContext db;
    private IMapper mapper;
    public AddressServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public List<ProvinceDto> FindAllProvince()
    {
        return mapper.Map<List<ProvinceDto>>(db.Provinces).ToList();

    }

    public List<DistrictDto> FindDistrictByProvinceCode(string provinceCode)
    {
        return mapper.Map<List<DistrictDto>>(db.Districts.Where(u => u.ProvinceCode == provinceCode));

    }

    public List<WardDto> FindWardByDistrictCode(string districtCode)
    {
        return mapper.Map<List<WardDto>>(db.Wards.Where(u => u.DistrictCode == districtCode));
    }
}
