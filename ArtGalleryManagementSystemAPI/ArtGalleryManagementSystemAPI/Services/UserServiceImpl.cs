using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class UserServiceImpl : UserService
{
    private DatabaseContext db;
    private IMapper mapper;
    public UserServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public List<UserDto> FindAll()
    {
        return mapper.Map<List<UserDto>>(db.Users).ToList();
    }

    public UserDto FindByEmail(string email)
    {
        return mapper.Map<UserDto>(db.Users.SingleOrDefault(u => u.Email == email));
    }

    public UserDto FindById(int id)
    {
        return mapper.Map<UserDto>(db.Users.Find(id));
    }

    public bool Register(UserDto userdto)
    {
        try
        {
            var user = mapper.Map<User>(userdto);
            db.Users.Add(user);
            //if (db.SaveChanges() > 0)
            //{
            //    var cart = new Cart();
            //    cart.Id = user.Id;
            //    cart.Total = 0;
            //    db.Carts.Add(cart);
            //}
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
    public bool Login(UserDto userdto)
    {
        var account = mapper.Map<UserDto>(db.Users.SingleOrDefault(u => u.Email == userdto.Email));
        if (account != null)
        {
            return BCrypt.Net.BCrypt.Verify(userdto.Password, account.Password);
        }
        return false;
    }

    public bool SiginGG(UserDto userdto)
    {
        try
        {
            var user = mapper.Map<User>(userdto);
            db.Users.Add(user);
            if (db.SaveChanges() > 0)
            {
                var cart = new Cart();
                cart.Id = user.Id;
                cart.Total = 0;
                db.Carts.Add(cart);
            }
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public bool AddAddress(AddressDto addressdto)
    {
        var address = mapper.Map<Address>(addressdto);
        db.Addresses.Add(address);
        return db.SaveChanges() > 0;
    }
}
