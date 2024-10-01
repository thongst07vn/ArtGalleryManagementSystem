import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./baseURL.service";

@Injectable({
    providedIn: 'root'
})
export class AddressService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService : BaseURLService
    ){}
    async findallprovince(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'address/findallprovince'));
    }
    async finddistrictbyprovincecode(provinceCode:string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'address/finddistrictbyprovincecode/'+provinceCode));
    }
    async findwardbydistrictcode(districtCode:string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'address/findwardbydistrictcode/'+districtCode));
    }
}