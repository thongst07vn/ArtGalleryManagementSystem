﻿namespace ArtGalleryManagementSystemAPI.Models;

public partial class Address
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? Name { get; set; }

    public string? AddressLine { get; set; }

    public string? ProvinceCode { get; set; }

    public string? DistrictCode { get; set; }

    public string? WardCode { get; set; }

    public string? PostalCode { get; set; }

    public string? PhoneNumber { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual District? DistrictCodeNavigation { get; set; }

    public virtual Province? ProvinceCodeNavigation { get; set; }

    public virtual User? User { get; set; }

    public virtual Ward? WardCodeNavigation { get; set; }
}
