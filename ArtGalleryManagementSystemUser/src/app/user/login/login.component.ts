declare var google : any 
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../conect';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import * as JSBase64 from 'js-base64'
import { HttpClient } from '@angular/common/http';  
import Swal from 'sweetalert2'
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
  constructor(
    private conect: Conect
  ){}
  ngOnInit(): void {

    this.username = ''
    this.password = ''
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

    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    this.conect.addStyle("src/assets/css/dark/authentication/auth-cover.css")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    // this.conect.addScriptAsync("layouts/horizontal-light-menu/alert.js")
    this.conect.reloadPage()
    
    google.accounts.id.initialize({
      client_id:'105028155984-afc2mgb3fgmkvvo4ipcmhn1eo0070rln.apps.googleusercontent.com',
      callback:(resp : any)=> {
        this.handleLogin(resp)
      } 
    })
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      type: 'icon',
      // text: 'signin_with',
      // theme:'filled_blue',
      shape:'circle',
      size:'large',
      // logo_alignment: 'center'
    })
    this.wrong='icon-error'
    
  }
  login(){

    // console.log("hehe")
    if(this.username == 'user' && this.password == '123'){
      window.location.href = '/user/home'
      // this.router.navigate(['/admin/dashboard'])
    }
    else{
      document.querySelector('.icon-error').addEventListener('click', function() {
        Swal.fire({
            icon: 'error',
            title: 'Email or Password is Incorrect',
        })
      })
    }
  }
  loginWithGG(){
    
    // google.accounts.id.prompt();
  }
  decodeToken(token:string){
    const base64URL = token.split(".")[1]
    const base64 = base64URL.replace(/-/g,'+').replace(/_/g,'/')
    // console.log(JSON.parse(atob(token.split(".")[1])))
    // decodeURIComponent(JSON.parse(atob(base64).split('').map(function(c){
    //   return c.charCodeAt(0).toString(16).slice(-2)
    // }).join('')))

    return JSON.parse(JSBase64.decode(base64))
  }
  handleLogin(resp:any){
    // this.authService.login()
    const payLoad = this.decodeToken(resp.credential)
    // const file = this.convertToFile(payLoad.picture)
    // this.downloadImage(payLoad.picture)
    const account = {
      email: payLoad.email,
      username: payLoad.name,
      avatar: payLoad.picture,
      role: 1 
    }
    sessionStorage.setItem("loggedInUser",JSON.stringify([account]))
    window.location.href = 'user/home'
  }
}
