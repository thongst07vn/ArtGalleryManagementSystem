
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { BaseURLService } from '../../services/baseURL.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { AddressService } from '../../services/address.service';
import { error } from 'jquery';
import { Address } from '../../entities/address.entity';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { District } from '../../entities/district.entity';
import { Ward } from '../../entities/ward.entity';
import { Province } from '../../entities/province.entity';
import { formatDate } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  host:{
    'collision': 'InvoiceComponent'
  }
})
export class InvoiceComponent implements OnInit {
  invoiceList: any = [];
  total:number;
  imageUrl:any
  user:any
  currentaddress:any
  alladdress:any
  addAddressForm:FormGroup
  editAddressForm:FormGroup
  
  provinces:any
  districts:any
  wards:any

  invoiceDay: any
  constructor(
    private conect : Conect,
    private baseURLService:BaseURLService,
    private userService:UserService,
    private addressService:AddressService,
    private formBuilder: FormBuilder
  ){
    this.addAddressForm = this.formBuilder.group({
      userId:[''],
      name:[''],
      phoneNumber:[''],
      addressLine:[''],
      provinceCode:[''],
      districtCode:[''],
      wardCode:[''],
      postalCode:[''],
      createdAt:['']
  })
  this.editAddressForm = this.formBuilder.group({
    userId:[''],
    name:[''],
    phoneNumber:[''],
    addressLine:[''],
    provinceCode:[''],
    districtCode:[''],
    wardCode:[''],
    postalCode:[''],
    createdAt:['']
  })
  }
  async ngOnInit() {
    this.invoiceDay = formatDate(new Date(),'dd-MM-yyyy','en-us');
    console.log(document.getElementById('#changecurrentaddress'));
    this.imageUrl=this.baseURLService.IMAGE_URL
    this.invoiceList = JSON.parse(sessionStorage.getItem('buyItems'))
    console.log(this.invoiceList);
    this.total=0;
    for(let i =0; i< this.invoiceList.length; i++){
     
      this.total += (this.invoiceList[i].price * this.invoiceList[i].quantity);
    }
    // Các Script không sử dụng
    this.conect.removeScript("src/plugins/src/global/vendors.min.js");
    this.conect.removeScript("layouts/horizontal-light-menu/app.js");
    this.conect.removeScript("src/plugins/src/splide/splide.min.js");
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js");
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")


    // Các Script sử dụng + trong index
    this.conect.addScript("src/assets/js/apps/invoice-preview.js");

    // Các style có sử dụng
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addStyle("src/assets/css/light/apps/invoice-preview.css");
    this.conect.addStyle("src/assets/css/dark/apps/invoice-preview.css");
    this.conect.addStyle("src/assets/css/light/components/list-group.css")
    this.conect.addStyle("src/assets/css/dark/components/list-group.css")
    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");
    this.conect.addStyle("src/assets/css/light/users/account-setting.css")
    this.conect.addStyle("src/assets/css/dark/users/account-setting.css")

    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    this.conect.addScriptAsync("layouts/horizontal-light-menu/alert.js")
    
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")))
    this.user = userResult['result'] as User
    const addAddressResult = await this.addressService.findallprovince()
    this.provinces = addAddressResult['result'] as Province[]
    const addressResult = await this.addressService.findalladdress(this.user.id)
    this.alladdress = addressResult['result'] as Address[]
    this.currentaddress =this.alladdress[0];

    
  this.addAddressForm = this.formBuilder.group({
    userId:[this.user.id],
    name:['',[
      Validators.required
    ]],
    phoneNumber:['',
      [Validators.required,
      Validators.pattern(/^0\d{9}$/)]
    ],
    addressLine:['',[
      Validators.required
    ]],
    provinceCode:['',[
      Validators.required
    ]],
    districtCode:['',[
      Validators.required
    ]],
    wardCode:['',[
      Validators.required
    ]],
    postalCode:['',[
      Validators.required
    ]],
    createdAt:[formatDate(new Date(),'dd-MM-yyyy','en-US')]
  })

  }
  async saveCurrentAddress(){
    const elementsWithClass = Array.from(document.querySelectorAll('.setcurrentaddr')) as HTMLInputElement[];
    for(let i = 0; i< elementsWithClass.length; i++){
      if(elementsWithClass[i].checked){       
        const addressResult = await this.addressService.findaddressbyid(parseInt(elementsWithClass[i].value))
        this.currentaddress = addressResult['result'];
        const popup = document.querySelector('.changecurrentaddress') as HTMLElement;
        popup.style.display = 'none';
        const backdrop = document.querySelector('.modal-backdrop');
        backdrop.parentNode.removeChild(backdrop);
        const body = document.body
        body.style.overflow = 'scroll';
      }
    }
  }
  async choosedProvince(event:any){
    if(event.target.value!=''|| this.provinces!=null){
      const addAddressResult = await this.addressService.finddistrictbyprovincecode(event.target.value)
      this.districts = addAddressResult['result'] as District[]
    }
    else{
      this.districts = []
      this.wards = []
    }
  }
  async choosedDistrict(event:any){
    if(event.target.value!=''|| this.districts!=null){
      const addAddressResult = await this.addressService.findwardbydistrictcode(event.target.value)
      this.wards = addAddressResult['result'] as Ward[]
    }
    else{
      this.wards = []
    }
  }
  createAddress(){
    let a =JSON.stringify(this.addAddressForm.value)
    console.log(a)
    let fromData = new FormData()
    fromData.append('addressInfor',a)
    this.addressService.addaddress(fromData).then(
      res=>{
        if(res['result']){
         Swal.fire({
            icon: 'success',
            title: 'Add Address Success',
          }).then( async ()=>{
            // window.location.href = 'user/invoice'
            const popup = document.querySelector('.addaddress') as HTMLElement;
            popup.style.display = 'none'
            const popup2 =  document.querySelector('.changecurrentaddress') as HTMLElement;
            popup2.style.display = 'block'
            const addressResult = await this.addressService.findalladdress(this.user.id)
            this.alladdress = addressResult['result'] as Address[]
            this.currentaddress =this.alladdress[this.alladdress.length-1];

          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Add Address Fail',
          })
        }
      },
      ()=>{
        Swal.fire({
          icon: 'error',
          title: 'Add Address Fail',
        })
      }
    )
  }
  editAddress(addressId:number){
    console.log(addressId)
    
     this.addressService.findaddressbyid(addressId).then(
      async res=>{
        const address = res['result'] as Address
        console.log('edit address' + address)
        if(this.provinces != null){
          const addAddressResult = await this.addressService.finddistrictbyprovincecode(address.provinceCode)
          this.districts = addAddressResult['result'] as District[]

          if(this.districts!=null){
            const addAddressResult = await this.addressService.findwardbydistrictcode(address.districtCode)
            this.wards = addAddressResult['result'] as Ward[]
          }
        }
        this.editAddressForm = this.formBuilder.group({
          id:[addressId],
          userId:[this.user.id],
          name:[address.name],
          phoneNumber:[address.phoneNumber],
          addressLine:[address.addressLine],
          provinceCode:[address.provinceCode],
          districtCode:[address.districtCode],
          wardCode:[address.wardCode],
          postalCode:[address.postalCode],
          createdAt:[address.createdAt]
        })
      }
    )
  }
  editSave(){
    let a =JSON.stringify(this.editAddressForm.value)
    console.log(a)
    let fromData = new FormData()
    fromData.append('addressProfile',a)
    this.addressService.editaddress(fromData).then(
      res=>{
        if(res['result']){
          Swal.fire({
            icon: 'success',
            title: 'Edit Address Success',
          }).then(async ()=>{
            // window.location.href = 'user/invoice'
            
            const popup = document.querySelector('.editaddress') as HTMLElement;
            popup.style.display = 'none'
            const popup2 =  document.querySelector('.changecurrentaddress') as HTMLElement;
            popup2.style.display = 'block'
            const addressResult = await this.addressService.findalladdress(this.user.id)
            this.alladdress = addressResult['result'] as Address[]
            this.currentaddress =this.alladdress[this.alladdress.length-1];
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Add Address Fail',
          })
        }
      },
      ()=>{
        Swal.fire({
          icon: 'error',
          title: 'Add Address Fail',
        })
      }
    )

  }
}
