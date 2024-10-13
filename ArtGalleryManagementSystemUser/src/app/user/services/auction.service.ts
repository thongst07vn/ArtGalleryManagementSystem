import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./baseURL.service";

@Injectable({
    providedIn: 'root'
})
export class AuctionService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService : BaseURLService
    ){}
    async FindAllAuction(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'auction/findallauction'))
    }

}