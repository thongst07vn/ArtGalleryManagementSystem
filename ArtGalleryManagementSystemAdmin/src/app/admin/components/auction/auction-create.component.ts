import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule],
  templateUrl: './auction-create.component.html',
  host:{
    'collision': 'AuctionCreateComponent'
  }
})
export class AuctionCreateComponent {
  time:any
  constructor(
    private conect : Conect,
    private activatedRoute :ActivatedRoute,
    private conectActive : ConectActive
  ){}

  ngOnInit(): void {
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
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageExifOrientation.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImagePreview.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageCrop.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageResize.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepondPluginFileValidateSize.min.js")
    this.conect.removeScript("src/plugins/src/tagify/tagify.min.js")

    this.conect.addStyle("src/plugins/src/filepond/filepond.min.css")
    this.conect.addStyle("src/plugins/src/filepond/FilePondPluginImagePreview.min.css")
    this.conect.addStyle("src/plugins/src/tagify/tagify.css")
    this.conect.addStyle("src/assets/css/light/forms/switches.css")
    this.conect.addStyle("src/plugins/css/light/editors/quill/quill.snow.css")
    this.conect.addStyle("src/plugins/css/light/tagify/custom-tagify.css")
    this.conect.addStyle("src/plugins/css/light/filepond/custom-filepond.css")
    this.conect.addStyle("src/assets/css/dark/forms/switches.css")
    this.conect.addStyle("src/plugins/css/dark/editors/quill/quill.snow.css")
    this.conect.addStyle("src/plugins/css/dark/tagify/custom-tagify.css")
    this.conect.addStyle("src/plugins/css/dark/filepond/custom-filepond.css")
    this.conect.addStyle("src/assets/css/light/apps/ecommerce-create.css")
    this.conect.addStyle("src/assets/css/dark/apps/ecommerce-create.css")
    

    this.conect.addScript("src/plugins/src/highlight/highlight.pack.js")
    this.conect.addScript("src/plugins/src/editors/quill/quill.js")
    this.conect.addScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.addScript("src/plugins/src/filepond/FilePondPluginFileValidateType.min.js")
    this.conect.addScript("src/plugins/src/filepond/FilePondPluginImageExifOrientation.min.js")
    this.conect.addScript("src/plugins/src/filepond/FilePondPluginImagePreview.min.js")
    this.conect.addScript("src/plugins/src/filepond/FilePondPluginImageCrop.min.js")
    this.conect.addScript("src/plugins/src/filepond/FilePondPluginImageResize.min.js")
    this.conect.addScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.addScript("src/plugins/src/filepond/filepondPluginFileValidateSize.min.js")
    this.conect.addScript("src/plugins/src/tagify/tagify.min.js")
    this.conect.addScript("src/assets/js/apps/ecommerce-create.js")
}
  test(){
    console.log(this.time)
    console.log("parseDate: "+ (new Date(this.time)))
  }
}
