﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class ProductAttributesProduct
{
    public int ProductAttributesId { get; set; }

    public int ProductsId { get; set; }

    public virtual ProductAttribute ProductAttributes { get; set; }

    public virtual Product Products { get; set; }
}