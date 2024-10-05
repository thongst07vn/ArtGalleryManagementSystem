using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;
using System.Globalization;


namespace ArtGalleryManagementSystemAPI.Dtos;

public class MappingDto : Profile
{
    private IMapper mapper;
    public MappingDto(IMapper _mapper)
    {
        mapper = _mapper;
    }
    public MappingDto()
    {
        CreateMap<Province, ProvinceDto>().ReverseMap();
        CreateMap<District, DistrictDto>().ReverseMap();
        CreateMap<Ward, WardDto>().ReverseMap();
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
            )
            .ForMember(
                des => des.Income,
                src => src.MapFrom(src => src.Role == 2 ? src.Seller.Income : null)
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
            )
            .ForMember(
                des => des.ProvinceName,
                src => src.MapFrom(src => src.ProvinceCodeNavigation.Name)
            )
            .ForMember(
                des => des.DistrictName,
                src => src.MapFrom(src => src.DistrictCodeNavigation.Name)
            )
            .ForMember(
                des => des.WardName,
                src => src.MapFrom(src => src.WardCodeNavigation.Name)
            )
            ;
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

        CreateMap<Product, ProductDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<ProductDto, Product>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );


        CreateMap<CartItem, CartItemDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(desc => desc.UpdatedAt != null ? ((DateTime)desc.UpdatedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<CartItemDto, CartItem>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(src => src.UpdatedAt != null ? DateTime.ParseExact(src.UpdatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );


        CreateMap<Product, ProductWithSellerDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            )
            .ForMember(
                des => des.Username,
                src => src.MapFrom(des => des.Seller.IdNavigation.Username)
            )
            .ForMember(
                des => des.Avatar,
                src => src.MapFrom(desc => desc.Seller.IdNavigation.Avatar)
            );

        CreateMap<ProductAttribute, ProductAttributeDto>();
        CreateMap<ProductAttributeDto, ProductAttribute>();
        CreateMap<ProductAttributesProduct, ProductAttributesProductDto>();

        CreateMap<Product, ProductWithAttributesDto>()
            .ForMember(
                des => des.Username,
                src => src.MapFrom(des => des.Seller.IdNavigation.Username)
            )
            .ForMember(
                des => des.Avatar,
                src => src.MapFrom(desc => desc.Seller.IdNavigation.Avatar)
            )
            .ForMember(
                des => des.ProductAttributes,
                 src => src.MapFrom(desc => desc.ProductAttributesProducts.Select(pap => pap.ProductAttributes)));
    }
}

