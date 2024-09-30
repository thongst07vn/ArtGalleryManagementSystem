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
                src => src.MapFrom(des => des.BirthOfDate != null ? ((DateTime)des.BirthOfDate).ToString("dd-MM-yyyy") : null)
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
                src => src.MapFrom(src => src.BirthOfDate != null ? DateTime.ParseExact(src.BirthOfDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            )
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );
        CreateMap<Seller, SellerDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<SellerDto, Seller>()
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
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );
        CreateMap<Cart, CartDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(desc => desc.UpdatedAt != null ? ((DateTime)desc.UpdatedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<CartDto, Cart>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(src => src.UpdatedAt != null ? DateTime.ParseExact(src.UpdatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );
    }
}

