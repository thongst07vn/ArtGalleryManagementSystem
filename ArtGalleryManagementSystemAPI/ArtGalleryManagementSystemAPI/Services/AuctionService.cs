using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface AuctionService
{
    public bool RejectAuction(int id);
    public bool AuctionToProduct(int id);
    public bool AuctionToProductCancle(int id);
    public bool AddBidOrder(List<ProductWithSellerDto> bidlist, BidOrderDto bidinfo);
    public List<BidOrderDto> FindAllValidAuction();
}
