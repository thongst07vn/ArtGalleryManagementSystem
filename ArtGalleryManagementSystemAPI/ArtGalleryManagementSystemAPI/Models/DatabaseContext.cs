using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<BidOrder> BidOrders { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<CartItem> CartItems { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<District> Districts { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<PaymentDetail> PaymentDetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductAttribute> ProductAttributes { get; set; }

    public virtual DbSet<Province> Provinces { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Seller> Sellers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Ward> Wards { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-QEN4LJI;Database=ARTGALLERY;user id=sa;password=123456;trusted_connection=true;encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__addresse__3213E83F0AA748E5");

            entity.ToTable("addresses");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.AddressLine)
                .HasMaxLength(255)
                .HasColumnName("address_line");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.DistrictCode)
                .HasMaxLength(20)
                .HasColumnName("district_code");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .HasColumnName("phone_number");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(255)
                .HasColumnName("postal_code");
            entity.Property(e => e.ProvinceCode)
                .HasMaxLength(20)
                .HasColumnName("province_code");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.WardCode)
                .HasMaxLength(20)
                .HasColumnName("ward_code");

            entity.HasOne(d => d.DistrictCodeNavigation).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.DistrictCode)
                .HasConstraintName("addresses_district_code_fkey");

            entity.HasOne(d => d.ProvinceCodeNavigation).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.ProvinceCode)
                .HasConstraintName("addresses_province_code_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__addresses__user___44EA3301");

            entity.HasOne(d => d.WardCodeNavigation).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.WardCode)
                .HasConstraintName("addresses_ward_code_fkey");
        });

        modelBuilder.Entity<BidOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__bid_orde__3213E83F4FD18ADC");

            entity.ToTable("bid_order");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.BidBasePrice).HasColumnName("bid_base_price");
            entity.Property(e => e.BidEndTime)
                .HasColumnType("datetime")
                .HasColumnName("bid_end_time");
            entity.Property(e => e.BidSoldPrice).HasColumnName("bid_sold_price");
            entity.Property(e => e.BidStamp)
                .IsRowVersion()
                .IsConcurrencyToken()
                .HasColumnName("bid_stamp");
            entity.Property(e => e.BidStartTime)
                .HasColumnType("datetime")
                .HasColumnName("bid_start_time");
            entity.Property(e => e.BidTransactionAmount).HasColumnName("bid_transaction_amount");
            entity.Property(e => e.BidTransactionTime)
                .HasColumnType("datetime")
                .HasColumnName("bid_transaction_time");
            entity.Property(e => e.BidderId).HasColumnName("bidder_id");
            entity.Property(e => e.IncrementInPrice).HasColumnName("increment_in_price");
            entity.Property(e => e.IncrementInTime).HasColumnName("increment_in_time");
            entity.Property(e => e.ProductId).HasColumnName("product_id");

            entity.HasOne(d => d.Bidder).WithMany(p => p.BidOrders)
                .HasForeignKey(d => d.BidderId)
                .HasConstraintName("FK__bid_order__bidde__45DE573A");

            entity.HasOne(d => d.Product).WithMany(p => p.BidOrders)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__bid_order__produ__46D27B73");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cart__3213E83F120E364B");

            entity.ToTable("cart");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Total).HasColumnName("total");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cart_ite__3213E83FBBF04F75");

            entity.ToTable("cart_item");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Cart).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.CartId)
                .HasConstraintName("FK__cart_item__cart___5614BF03");

            entity.HasMany(d => d.Products).WithMany(p => p.CartItemProducts)
                .UsingEntity<Dictionary<string, object>>(
                    "CartItemProduct",
                    r => r.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__cart_item__produ__59E54FE7"),
                    l => l.HasOne<CartItem>().WithMany()
                        .HasForeignKey("CartItemProductId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__cart_item__cart___58F12BAE"),
                    j =>
                    {
                        j.HasKey("CartItemProductId", "ProductsId").HasName("PK__cart_ite__590EEF8379261423");
                        j.ToTable("cart_item_products");
                        j.IndexerProperty<int>("CartItemProductId").HasColumnName("cart_item_product_id");
                        j.IndexerProperty<int>("ProductsId").HasColumnName("products_id");
                    });
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__categori__3213E83FB2097A8B");

            entity.ToTable("categories");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<District>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("districts_pkey");

            entity.ToTable("districts");

            entity.Property(e => e.Code)
                .HasMaxLength(20)
                .HasColumnName("code");
            entity.Property(e => e.CodeName)
                .HasMaxLength(255)
                .HasColumnName("code_name");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.FullNameEn)
                .HasMaxLength(255)
                .HasColumnName("full_name_en");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.NameEn)
                .HasMaxLength(255)
                .HasColumnName("name_en");
            entity.Property(e => e.ProvinceCode)
                .HasMaxLength(20)
                .HasColumnName("province_code");

            entity.HasOne(d => d.ProvinceCodeNavigation).WithMany(p => p.Districts)
                .HasForeignKey(d => d.ProvinceCode)
                .HasConstraintName("districts_province_code_fkey");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__order_de__3213E83F4858F230");

            entity.ToTable("order_details");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Total).HasColumnName("total");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.OrderDetail)
                .HasForeignKey<OrderDetail>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__order_detail__id__5F9E293D");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__order_it__3213E83F08AC07CC");

            entity.ToTable("order_item");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__order_ite__order__5AD97420");

            entity.HasMany(d => d.Products).WithMany(p => p.OrderItemProducts)
                .UsingEntity<Dictionary<string, object>>(
                    "OrderItemProduct",
                    r => r.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__order_ite__produ__5EAA0504"),
                    l => l.HasOne<OrderItem>().WithMany()
                        .HasForeignKey("OrderItemProductId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__order_ite__order__5DB5E0CB"),
                    j =>
                    {
                        j.HasKey("OrderItemProductId", "ProductsId").HasName("PK__order_it__67E8B1A8E14AE940");
                        j.ToTable("order_item_products");
                        j.IndexerProperty<int>("OrderItemProductId").HasColumnName("order_item_product_id");
                        j.IndexerProperty<int>("ProductsId").HasColumnName("products_id");
                    });
        });

        modelBuilder.Entity<PaymentDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__payment___3213E83FAAC44ECD");

            entity.ToTable("payment_details");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Provider)
                .HasMaxLength(255)
                .HasColumnName("provider");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__products__3213E83F62C53996");

            entity.ToTable("products");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Cover)
                .HasMaxLength(255)
                .HasColumnName("cover");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.SellerId).HasColumnName("seller_id");
            entity.Property(e => e.Sku)
                .HasMaxLength(255)
                .HasColumnName("sku");
            entity.Property(e => e.Summary)
                .HasMaxLength(255)
                .HasColumnName("summary");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__products__catego__47C69FAC");

            entity.HasOne(d => d.Seller).WithMany(p => p.Products)
                .HasForeignKey(d => d.SellerId)
                .HasConstraintName("FK__products__seller__4C8B54C9");
        });

        modelBuilder.Entity<ProductAttribute>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__product___3213E83FBCD170C6");

            entity.ToTable("product_attributes");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");
            entity.Property(e => e.Value)
                .HasMaxLength(255)
                .HasColumnName("value");

            entity.HasMany(d => d.Products).WithMany(p => p.ProductAttributes)
                .UsingEntity<Dictionary<string, object>>(
                    "ProductAttributesProduct",
                    r => r.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__product_a__produ__4B973090"),
                    l => l.HasOne<ProductAttribute>().WithMany()
                        .HasForeignKey("ProductAttributesId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__product_a__produ__4AA30C57"),
                    j =>
                    {
                        j.HasKey("ProductAttributesId", "ProductsId").HasName("PK__product___3BBB7CFD43577378");
                        j.ToTable("product_attributes_products");
                        j.IndexerProperty<int>("ProductAttributesId").HasColumnName("product_attributes_id");
                        j.IndexerProperty<int>("ProductsId").HasColumnName("products_id");
                    });
        });

        modelBuilder.Entity<Province>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("provinces_pkey");

            entity.ToTable("provinces");

            entity.Property(e => e.Code)
                .HasMaxLength(20)
                .HasColumnName("code");
            entity.Property(e => e.CodeName)
                .HasMaxLength(255)
                .HasColumnName("code_name");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.FullNameEn)
                .HasMaxLength(255)
                .HasColumnName("full_name_en");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.NameEn)
                .HasMaxLength(255)
                .HasColumnName("name_en");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__reviews__3213E83F177D5A5B");

            entity.ToTable("reviews");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ReviewText)
                .HasMaxLength(255)
                .HasColumnName("review_text");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Product).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("reviews_product_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("reviews_user_id_fkey");
        });

        modelBuilder.Entity<Seller>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__sellers__3213E83F21963D66");

            entity.ToTable("sellers");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Seller)
                .HasForeignKey<Seller>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__sellers__id__20ACD28B");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__users__3213E83F362B4EE3");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "UQ__users__AB6E61647D35C4E3").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__users__F3DBC57269413A5F").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Avatar)
                .HasMaxLength(255)
                .HasColumnName("avatar");
            entity.Property(e => e.BirthOfDate).HasColumnName("birth_of_date");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .HasColumnName("phone_number");
            entity.Property(e => e.Role).HasColumnName("role");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.User)
                .HasForeignKey<User>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__users__id__55209ACA");
        });

        modelBuilder.Entity<Ward>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("wards_pkey");

            entity.ToTable("wards");

            entity.Property(e => e.Code)
                .HasMaxLength(20)
                .HasColumnName("code");
            entity.Property(e => e.CodeName)
                .HasMaxLength(255)
                .HasColumnName("code_name");
            entity.Property(e => e.DistrictCode)
                .HasMaxLength(20)
                .HasColumnName("district_code");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.FullNameEn)
                .HasMaxLength(255)
                .HasColumnName("full_name_en");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.NameEn)
                .HasMaxLength(255)
                .HasColumnName("name_en");

            entity.HasOne(d => d.DistrictCodeNavigation).WithMany(p => p.Wards)
                .HasForeignKey(d => d.DistrictCode)
                .HasConstraintName("wards_district_code_fkey");
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__wishlist__3213E83FAD480CF7");

            entity.ToTable("wishlist");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.ProductId).HasColumnName("product_id");

            entity.HasMany(d => d.Products).WithMany(p => p.WishlistProducts)
                .UsingEntity<Dictionary<string, object>>(
                    "WishlistProduct",
                    r => r.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__wishlist___produ__542C7691"),
                    l => l.HasOne<Wishlist>().WithMany()
                        .HasForeignKey("WishlistProductId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__wishlist___wishl__53385258"),
                    j =>
                    {
                        j.HasKey("WishlistProductId", "ProductsId").HasName("PK__wishlist__1E8779008977B14C");
                        j.ToTable("wishlist_products");
                        j.IndexerProperty<int>("WishlistProductId").HasColumnName("wishlist_product_id");
                        j.IndexerProperty<int>("ProductsId").HasColumnName("products_id");
                    });

            entity.HasMany(d => d.Users).WithMany(p => p.WishlistUsers)
                .UsingEntity<Dictionary<string, object>>(
                    "WishlistUser",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__wishlist___users__505BE5AD"),
                    l => l.HasOne<Wishlist>().WithMany()
                        .HasForeignKey("WishlistUserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__wishlist___wishl__4F67C174"),
                    j =>
                    {
                        j.HasKey("WishlistUserId", "UsersId").HasName("PK__wishlist__B4090BAED3A44B4E");
                        j.ToTable("wishlist_users");
                        j.IndexerProperty<int>("WishlistUserId").HasColumnName("wishlist_user_id");
                        j.IndexerProperty<int>("UsersId").HasColumnName("users_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
