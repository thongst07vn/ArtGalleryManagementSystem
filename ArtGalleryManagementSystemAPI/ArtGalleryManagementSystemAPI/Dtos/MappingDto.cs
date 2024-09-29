using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;
using System.Globalization;


namespace ArtGalleryManagementSystemAPI.Dtos;

public class MappingDto : Profile
{
    public MappingDto()
    {
        CreateMap<User, UserDto>()
            .ForMember(
                des => des.BirthOfDate,
                src => src.MapFrom(des => des.BirthOfDate.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<UserDto, User>()
            .ForMember(
                des => des.BirthOfDate,
                src => src.MapFrom(src => DateTime.ParseExact(src.BirthOfDate, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );
        CreateMap<Address, AddressDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<AddressDto, Address>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            );
    }
}

