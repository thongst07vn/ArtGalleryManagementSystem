
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './postcart.component.html',
  host:{
    'collision': 'PostcartComponent'
  }
})
export class PostcartComponent implements OnInit {
  constructor(
    private conect : Conect,
    private activatedRoute: ActivatedRoute,
    private conectActive: ConectActive
  ){

  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )

    this.conect.removeScript('src/plugins/src/editors/quill/quill.js')
    this.conect.removeScript('src/plugins/src/filepond/filepond.min.js')
    this.conect.removeScript('src/plugins/src/filepond/FilePondPluginFileValidateType.min.js')
    this.conect.removeScript('src/plugins/src/filepond/FilePondPluginImageExifOrientation.min.js')
    this.conect.removeScript('src/plugins/src/filepond/FilePondPluginImagePreview.min.js')
    this.conect.removeScript('src/plugins/src/editors/quill/quill.js')
    this.conect.removeScript('src/plugins/src/editors/quill/quill.js')
    this.conect.removeScript('src/plugins/src/filepond/FilePondPluginImageCrop.min.js')
    this.conect.removeScript('src/plugins/src/filepond/FilePondPluginImageResize.min.js')
    this.conect.removeScript('src/plugins/src/filepond/FilePondPluginImageTransform.min.js')
    this.conect.removeScript('src/plugins/src/filepond/filepondPluginFileValidateSize.min.js')
    this.conect.removeScript('src/plugins/src/tagify/tagify.min.js')
    this.conect.removeScript('src/assets/js/apps/ecommerce-create.js')
    this.conect.removeScript('src/plugins/src/autocomplete/autoComplete.min.js')
    this.conect.removeScript('src/plugins/src/autocomplete/custom-autoComplete.js')
    this.conect.removeScript('src/plugins/src/autocomplete/automaterial.min.js')
    this.conect.removeScript('src/plugins/src/autocomplete/autopaint.min.js')
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")

    this.conect.addStyle('src/assets/css/light/apps/ecommerce-create.css')
    this.conect.addStyle('src/assets/css/dark/apps/ecommerce-create.css')
    this.conect.addStyle('src/plugins/src/filepond/filepond.min.css')
    this.conect.addStyle('src/plugins/src/filepond/FilePondPluginImagePreview.min.css')
    this.conect.addStyle('src/plugins/src/tagify/tagify.css')
    this.conect.addStyle('src/plugins/css/light/editors/quill/quill.snow.css')
    this.conect.addStyle('src/plugins/css/light/tagify/custom-tagify.css')
    this.conect.addStyle('src/plugins/css/light/filepond/custom-filepond.css')
    this.conect.addStyle('src/assets/css/dark/forms/switches.css')
    this.conect.addStyle('src/plugins/css/dark/editors/quill/quill.snow.css')
    this.conect.addStyle('src/plugins/css/dark/tagify/custom-tagify.css')
    this.conect.addStyle('src/plugins/css/dark/filepond/custom-filepond.css')


    
    this.conect.addScript('src/plugins/src/editors/quill/quill.js')
    this.conect.addScript('src/plugins/src/filepond/filepond.min.js')
    this.conect.addScript('src/plugins/src/filepond/FilePondPluginFileValidateType.min.js')
    this.conect.addScript('src/plugins/src/filepond/FilePondPluginImageExifOrientation.min.js')
    this.conect.addScript('src/plugins/src/filepond/FilePondPluginImagePreview.min.js')
    this.conect.addScript('src/plugins/src/editors/quill/quill.js')
    this.conect.addScript('src/plugins/src/editors/quill/quill.js')
    this.conect.addScript('src/plugins/src/filepond/FilePondPluginImageCrop.min.js')
    this.conect.addScript('src/plugins/src/filepond/FilePondPluginImageResize.min.js')
    this.conect.addScript('src/plugins/src/filepond/FilePondPluginImageTransform.min.js')
    this.conect.addScript('src/plugins/src/filepond/filepondPluginFileValidateSize.min.js')
    this.conect.addScript('src/plugins/src/tagify/tagify.min.js')
    this.conect.addScript('src/assets/js/apps/ecommerce-create.js')
    this.conect.addScript('src/plugins/src/autocomplete/autoComplete.min.js')
    this.conect.addScript('src/plugins/src/autocomplete/automaterial.min.js')
    this.conect.addScript('src/plugins/src/autocomplete/autopaint.min.js')
    this.conect.addScript('src/plugins/src/autocomplete/custom-autoComplete.js')
    
    this.conect.reloadPage()

  }
  updateImg(event:any){
    console.log(event.target.files[0])
  }
}
