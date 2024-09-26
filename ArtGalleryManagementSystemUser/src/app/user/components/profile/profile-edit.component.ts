
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormsModule } from '@angular/forms';
// import { FilePondModule } from 'angular-filepond';

@Component({
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './profile-edit.component.html',
  host:{
    'collision': 'ProfileEditComponent'
  }
})
export class ProfileEditComponent implements OnInit {
  avt:string
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive
  ){
    this.avt='src/assets/img/drag-1.jpeg'

  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/plugins/src/leaflet/leaflet.js")
    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")

    this.conect.addStyle("src/assets/css/light/scrollspyNav.css");
    this.conect.addStyle("src/assets/css/light/components/carousel.css");
    this.conect.addStyle("src/assets/css/light/components/modal.css");

    this.conect.addStyle("src/assets/css/dark/scrollspyNav.css");
    this.conect.addStyle("src/assets/css/dark/components/carousel.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");




    this.conect.addStyle("src/plugins/src/filepond/filepond.min.css")
    this.conect.addStyle("src/plugins/src/filepond/FilePondPluginImagePreview.min.css")
    this.conect.addStyle("src/plugins/src/notification/snackbar/snackbar.min.css")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addStyle("src/plugins/css/light/filepond/custom-filepond.css")
    this.conect.addStyle("src/assets/css/light/components/tabs.css")
    this.conect.addStyle("src/assets/css/light/elements/alert.css")
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/light/notification/snackbar/custom-snackbar.css")
    this.conect.addStyle("src/assets/css/light/forms/switches.css")
    this.conect.addStyle("src/assets/css/light/components/list-group.css")
    this.conect.addStyle("src/assets/css/light/users/account-setting.css")
    this.conect.addStyle("src/plugins/css/dark/filepond/custom-filepond.css")
    this.conect.addStyle("src/assets/css/dark/components/tabs.css")
    this.conect.addStyle("src/assets/css/dark/elements/alert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/notification/snackbar/custom-snackbar.css")
    this.conect.addStyle("src/assets/css/dark/forms/switches.css")
    this.conect.addStyle("src/assets/css/dark/components/list-group.css")
    this.conect.addStyle("src/assets/css/dark/users/account-setting.css")

    this.conect.addScriptAsync("src/plugins/src/filepond/filepond.min.js")
    this.conect.addScriptAsync("src/plugins/src/filepond/FilePondPluginFileValidateType.min.js")
    this.conect.addScriptAsync("src/plugins/src/filepond/FilePondPluginImageExifOrientation.min.js")
    this.conect.addScriptAsync("src/plugins/src/filepond/FilePondPluginImagePreview.min.js")
    this.conect.addScriptAsync("src/plugins/src/filepond/FilePondPluginImageCrop.min.js")
    this.conect.addScriptAsync("src/plugins/src/filepond/FilePondPluginImageResize.min.js")
    this.conect.addScriptAsync("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.addScriptAsync("src/plugins/src/filepond/filepondPluginFileValidateSize.min.js")
    this.conect.addScriptAsync("src/plugins/src/notification/snackbar/snackbar.min.js")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    this.conect.addScriptAsync("src/assets/js/users/account-settings.js")

    // this.conect.reloadPage()
    console.log(this.avt)
  }
}
