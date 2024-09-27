using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class BidOrder
{
    public int Id { get; set; }

    public int? BidderId { get; set; }

    public int? ProductId { get; set; }

    public DateTime? BidStartTime { get; set; }

    public DateTime? BidEndTime { get; set; }

    public double? BidBasePrice { get; set; }

    public double? BidSoldPrice { get; set; }

    public double? IncrementInPrice { get; set; }

    public TimeOnly? IncrementInTime { get; set; }

    public DateTime? BidTransactionTime { get; set; }

    public double? BidTransactionAmount { get; set; }

    public byte[] BidStamp { get; set; } = null!;

    public virtual User? Bidder { get; set; }

    public virtual Product? Product { get; set; }
}
