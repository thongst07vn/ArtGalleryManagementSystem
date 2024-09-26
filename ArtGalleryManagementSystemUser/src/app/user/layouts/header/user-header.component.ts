declare var google : any 
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';

@Component({
  selector: 'user-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-header.component.html',
  host:{
    'collision': 'UserHeaderComponent'
  }
})
export class UserHeaderComponent implements OnInit {
  user:any
  theme:boolean
  constructor(
    private conect : Conect
  ){}
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("loggedInUser"))
    console.log(this.user)
    setTimeout(() => {
      const hasDarkClass = document.body.classList.contains('dark');
      this.theme = hasDarkClass;
      this.conect.setData(this.theme);
    }, 500);
  }
  logOut(){
    google.accounts.id.disableAutoSelect()
    sessionStorage.removeItem("loggedInUser")
    window.location.href = '/'
  }
  toggleTheme(){
    setTimeout(() => {
      const hasDarkClass = document.body.classList.contains('dark');
      this.theme = hasDarkClass;
      this.conect.setData(this.theme);
    }, 50);
  }
}
