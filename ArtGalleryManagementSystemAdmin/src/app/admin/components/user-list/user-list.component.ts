import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { AdminService } from '../../services/admin.service';
import { User } from '../../entities/user.entity';
import { BaseURLService } from '../../services/baseURL.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import flatpickr from 'flatpickr';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  host:{
    'collision': 'UserListComponent'
  }
})
export class UserListComponent {
  users:any
  imageUrl:any
  addUserForm: FormGroup;
  constructor(
    private conect : Conect,
    private activatedRoute :ActivatedRoute,
    private conectActive : ConectActive,
    private adminService: AdminService,
    private baseURL : BaseURLService,
    private formBuilder: FormBuilder
  ){
    this.addUserForm = this.formBuilder.group({
      username:['',
        [Validators.required]
      ],
      // firstName:['',
      //   [Validators.required,
      //     Validators.pattern(/^[A-ZÀ-Ỹ][a-zA-Zà-ỹ\s]*/)
      //   ]
      // ],
      // lastName:['',
      //   [Validators.required,
      //     Validators.pattern(/^[A-ZÀ-Ỹ][a-zA-Zà-ỹ\s]*/)
      //   ]
      // ],
      // birthOfDate:['',
      //   [Validators.required,
      //     // Validators.pattern(/\d+\-\d+\-\b(19[6-9][0-9]|200[0-6])\b/)
      //   ]
      // ],
      email:['',
        [Validators.required,
        Validators.email]
      ],
      password:['',
        [Validators.required,
        Validators.pattern(/^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@*#$%]).{6,20})$/)]
      ],
      rePassword:['',[
        Validators.required
      ]],
      phoneNumber:['',
        [Validators.required,
        Validators.pattern(/^0\d{9}$/)]
      ],
      role:[1],
      gender:['',
        [Validators.required]
      ],
      avatar:['noimg.jpg'],
      createdAt:[formatDate(new Date(),'dd-MM-yyyy','en-US')],
    },
    {
        validator: this.CheckP
    }
    )
  }

  ngOnInit(): void {
    this.imageUrl=this.baseURL.IMAGE_URL
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/assets/js/custom.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/fullcalendar/fullcalendar.min.js")
    this.conect.removeScript("src/plugins/src/uuid/uuid4.min.js")
    this.conect.removeScript("src/plugins/src/fullcalendar/custom-fullcalendar.js")
    this.conect.removeScript("src/plugins/src/apex/apexcharts.min.js")
    this.conect.removeScript("src/assets/js/dashboard/dash_1.js")
    this.conect.removeStyle("src/plugins/src/editors/quill/quill.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-create.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImagePreview.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageExifOrientation.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageCrop.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageResize.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepondPluginFileValidateSize.min.js")
    this.conect.removeScript("src/plugins/src/tagify/tagify.min.js")
    // this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    // this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    // this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    // this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    // this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")

    // this.conect.addStyle("layouts/semi-dark-menu/css/light/loader.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/dark/loader.css")
    // this.conect.addScriptDefer("layouts/semi-dark-menu/loader.js")
    // this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/light/plugins.css")
    // this.conect.addStyle("layouts/semi-dark-menu/css/dark/plugins.css")
    this.conect.addStyle("src/plugins/src/table/datatable/datatables.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/custom_dt_miscellaneous.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/custom_dt_miscellaneous.css")
    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    // this.conect.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js")
    // this.conect.addScriptDefer("src/bootstrap/js/bootstrap.bundle.min.js")
    // this.conect.addScriptDefer("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    // this.conect.addScriptDefer("src/plugins/src/mousetrap/mousetrap.min.js")
    // this.conect.addScriptDefer("src/plugins/src/waves/waves.min.js")
    // this.conect.addScript("layouts/semi-dark-menu/app.js")


    this.conect.addScript("src/plugins/src/global/vendors.min.js")
    this.conect.addScript("src/assets/js/custom.js")
    this.conect.addScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.addScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.addScript("src/plugins/src/table/datatable/button-ext/jszip.min.js")
    this.conect.addScript("src/plugins/src/table/datatable/button-ext/buttons.html5.min.js")
    this.conect.addScript("src/plugins/src/table/datatable/button-ext/buttons.print.min.js")
    this.conect.addScript("src/plugins/src/table/datatable/custom_miscellaneous.js")
    this.conect.addStyle("src/plugins/css/light/flatpickr/custom-flatpickr.css")
    this.conect.addStyle("src/plugins/css/dark/flatpickr/custom-flatpickr.css")
    this.adminService.findalluser().then(
      res=>{
        this.users = res['result'] as User[]
        console.log(this.users)
      }
    )
    flatpickr('#rangeCalendarFlatpickr', {
      mode: 'single',
      dateFormat:'d-m-Y',
    });
  }
  ngAfterViewInit(): void {
    // Khởi tạo flatpickr
    flatpickr('#rangeCalendarFlatpickr', {
      mode: 'single',
      dateFormat:'d-m-Y',
    });
  }
  CheckP(control:AbstractControl){
    return control.value.password === control.value.rePassword ? null:{mismatch:true}
  }
  async Add(){
    let user =  JSON.stringify(this.addUserForm.value)
    let formdata = new FormData();
    formdata.append('usersellerinfo',user);
    this.adminService.createuserseller(formdata).then(
      res => {
        if(res['result']){
          Swal.fire({
            icon: 'success',
            title: 'Add User Success',
          }).then(()=>{
            window.location.href = 'admin/seller-list'
          }) 
        }
        else {
          Swal.fire({
              icon: 'error',
              title: 'Email Already Exists',
          }).then(()=>{
            window.location.href = 'admin/seller-list'
          }) 
        } 
      },
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Add User Fail',
        })
      }
    )
  }
  async delete(user:number){
    const u = await this.adminService.findbyid(user)
    const deleteU = u['result']
    deleteU.deletedAt = formatDate(new Date(),'dd-MM-yyyy','en-US'),
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
      if (result.isConfirmed) {
        
        let us =JSON.stringify(deleteU)
        let fromData = new FormData()
        fromData.append('deleteAt',us)
        this.adminService.deleteuserseller(fromData).then(
          res=>{
            if(res['result']){
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              ).then(()=>{
                window.location.href = 'admin/seller-list'
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Delete User Fail',
              }) 
            }
          },
          ()=>{
            Swal.fire({
              icon: 'error',
              title: 'Delete User Fail',
            })
          }
        )
        
      } else if (result.dismiss === Swal.DismissReason.cancel){
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}

