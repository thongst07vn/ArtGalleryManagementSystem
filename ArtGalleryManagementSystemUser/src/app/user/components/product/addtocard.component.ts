
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './addtocard.component.html',
  host:{
    'collision': 'AddtoCardComponent'
  }
})
export class AddtoCardComponent implements OnInit, AfterViewInit {
  constructor(
    private conect : Conect
  ){

  }
  async ngOnInit(){
    
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")

    this.conect.addStyle("src/plugins/src/table/datatable/datatables.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/assets/css/light/apps/invoice-list.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/dt-global_style.css")
    this.conect.addScriptAsync("src/assets/js/custom.js")

    this.conect.addStyle("src/assets/css/dark/apps/invoice-list.css")
    
    this.conect.addScriptAsync("src/plugins/src/table/datatable/datatables.js")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    await this.conect.addScriptAsync("src/assets/js/apps/invoice-list.js")
    
    this.conect.reloadPage()
  }
  ngAfterViewInit() {
    const deleteButton =  document.querySelector('.dt-delete');
    console.log(deleteButton)
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        this.deleteAll();
      });
    }
  }
  deleteAll(){
    console.log('CCCCCCCCC')
  }
  buy(){
    window.location.href='user/invoice'
  }
}
