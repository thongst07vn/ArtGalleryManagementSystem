using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class Ward
{
    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? NameEn { get; set; }

    public string? FullName { get; set; }

    public string? FullNameEn { get; set; }

    public string? CodeName { get; set; }

    public string? DistrictCode { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual District? DistrictCodeNavigation { get; set; }
}
