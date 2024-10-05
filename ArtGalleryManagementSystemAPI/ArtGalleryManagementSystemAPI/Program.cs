using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

//cau hinh auto mapper
builder.Services.AddAutoMapper(typeof(MappingDto));

builder.Services.AddControllers();
//ket noi database
string connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"].ToString();
builder.Services.AddDbContext<DatabaseContext>(option => option.UseLazyLoadingProxies().UseSqlServer(connectionString));
builder.Services.AddScoped<UserService, UserServiceImpl>();
builder.Services.AddScoped<AddressService, AddressServiceImpl>();
builder.Services.AddScoped<ProductService, ProductServiceImpl>();

builder.Services.AddScoped<AdminService, AdminServiceImpl>();

builder.Services.AddScoped<CartService, CartServiceImpl>();




var app = builder.Build();
app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );

app.UseStaticFiles();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}");

app.Run();