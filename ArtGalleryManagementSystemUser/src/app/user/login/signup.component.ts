
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../conect';
import flatpickr from 'flatpickr';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { first } from 'rxjs';
import { create } from 'filepond';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';


@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  host:{
    'collision': 'SignUpComponent'
  }
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup
  constructor(
    private conect: Conect,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ){
    this.registerForm = this.formBuilder.group({
        username:['',
          [Validators.required]
        ],
        firstName:['',
          [Validators.required]
        ],
        lastName:['',
          [Validators.required]
        ],
        birthOfDate:['',
          [Validators.required,
            // Validators.pattern(/\d+\-\d+\-\b(19[6-9][0-9]|200[0-6])\b/)
          ]
        ],
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
        role:['1'],
        avatar:['noimg.jpg'],
        createdAt:[formatDate(new Date(),'dd-MM-yyyy','en-US')],
      },
      {
          validator: this.CheckP
      }
    )
  }
  ngOnInit(): void {
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/mousetrap/mousetrap.min.js")
    this.conect.removeScript("layouts/horizontal-light-menu/app.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js")
    this.conect.removeScript("src/plugins/src/waves/waves.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")


    this.conect.addStyle("layouts/horizontal-light-menu/css/light/loader.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/loader.css")
    this.conect.addScript("layouts/horizontal-light-menu/loader.js")
    this.conect.addStyle("src/bootstrap/css/bootstrap.min.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/light/plugins.css")
    this.conect.addStyle("src/assets/css/light/authentication/auth-cover.css")
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")

    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    this.conect.addStyle("src/assets/css/dark/authentication/auth-cover.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")

    this.conect.addStyle("src/plugins/css/light/flatpickr/custom-flatpickr.css")
    this.conect.addStyle("src/plugins/css/dark/flatpickr/custom-flatpickr.css")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")

    this.conect.reloadPage()
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
  Register(){
    console.log(this.registerForm.value)
    this.userService.findbyemail(this.registerForm.value.email).then(
      res => {
        if(res['result']){
          document.querySelector('.icon-error').addEventListener('click', function() {
            Swal.fire({
                icon: 'error',
                title: 'This account is already exists',
            })
          })
        }
        else{
          let user =  JSON.stringify(this.registerForm.value)
          let formdata = new FormData();
          formdata.append('userinfo',user);
          this.userService.register(formdata).then(
            res => {
              if(res['result']){
                console.log('success')
                window.location.href = '/login'

              }
              else {
                document.querySelector('.icon-error').addEventListener('click', function() {
                  Swal.fire({
                      icon: 'error',
                      title: 'Register Fail',
                  })
                })
                // console.log('Register Fail')
              } 
            },
            error => {
              console.log(error);
            }
          )
        }
      }
    )
  }
}
