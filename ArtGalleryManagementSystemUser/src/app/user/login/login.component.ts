declare var google : any 
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../conect';
import { FormsModule } from '@angular/forms';
import { formatDate, NgClass } from '@angular/common';
import * as JSBase64 from 'js-base64'
import { HttpClient } from '@angular/common/http';  
import Swal from 'sweetalert2'
import { UserService } from '../services/user.service';
import { create } from 'filepond';
@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,NgClass],
  templateUrl: './login.component.html',
  host:{
    'collision': 'LoginComponent'
  }
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  wrong:string
  imageURL:string
  account:any
  constructor(
    private conect: Conect,
    private http : HttpClient,
    private userService: UserService,
  ){
    google.accounts.id.initialize({
      client_id:'105028155984-afc2mgb3fgmkvvo4ipcmhn1eo0070rln.apps.googleusercontent.com',
      callback:(resp : any)=> {
        this.handleLogin(resp)
      } 
    })
  }
  ngOnInit(): void {

    this.username = ''
    this.password = ''
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      type: 'icon',
      shape:'circle',
      size:'large',
    })
    // this.conect.removeScript("src/bootstrap/js/bootstrap.bundle.min.js")
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

    // this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    // this.conect.addStyle("src/assets/css/dark/authentication/auth-cover.css")
    // this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")

    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    // this.conect.addScriptAsync("layouts/horizontal-light-menu/alert.js")
    this.conect.reloadPage()
    
    
    this.wrong='icon-error'

    
  }
  login(){
    this.userService.findbyemail(this.username).then(
      res => {
        if(res['result']){
          this.userService.login(this.username,this.password).then(
            res => {
              if(res['result']){
                sessionStorage.setItem("loggedInUser",JSON.stringify([this.username]))
                window.location.href = 'user/home'
              }
            }
          )
        }
        else{
          document.querySelector('.icon-error').addEventListener('click', function() {
            Swal.fire({
                icon: 'error',
                title: 'Email or Password invalid',
            })
          })
        }
      },
      err => {
        document.querySelector('.icon-error').addEventListener('click', function() {
          Swal.fire({
              icon: 'error',
              title: 'Email or Password invalid',
          })
        })
      }
    )
  }
  async downloadImage(url:string) {
  this.http.get(url, { responseType: 'blob' })
    .subscribe(blob => {
      const reader = new FileReader();
      console.log(reader)
      // this.selectFile = reader
      reader.onloadend = () => {
        this.imageURL = reader.result as string;
        console.log(this.imageURL)

      };
      reader.readAsDataURL(blob);
    });
  }
  decodeToken(token:string){
    const base64URL = token.split(".")[1]
    const base64 = base64URL.replace(/-/g,'+').replace(/_/g,'/')

    return JSON.parse(JSBase64.decode(base64))
  }
  handleLogin(resp:any){
    const payLoad = this.decodeToken(resp.credential)

    this.account = {
      email: payLoad.email,
      username: payLoad.name,
      avatar: payLoad.picture,
      createdAt: formatDate(new Date(),'dd-MM-yyyy','en-US'),
      role: 1 
    }
    // this.downloadImage(this.account.avatar)
    this.userService.findbyemail(this.account.email).then(
      res=>{
        if(res['result']){
          sessionStorage.setItem("loggedInUser",JSON.stringify(this.account.email))
          window.location.href = 'user/home'
        }else{
              let s = JSON.stringify(this.account);
              let formData = new FormData();
              formData.append('avt', payLoad.picture);
              formData.append('usergg',s);
              this.userService.siginWithGG(formData).then(
                res =>{
                    if(res['result']){
                      // console.log(account)
                      sessionStorage.setItem("loggedInUser",JSON.stringify(this.account.email))
                      window.location.href = 'user/home' 
                    } else {
                        console.log('failed');
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

