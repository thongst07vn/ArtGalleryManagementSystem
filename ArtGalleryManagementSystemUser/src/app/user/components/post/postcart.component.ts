
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule],
  
  templateUrl: './postcart.component.html',
  host:{
    'collision': 'PostcartComponent'
  }
})
export class PostcartComponent implements OnInit {
  postArtForm:FormGroup
  postArtAttributes:any
  selectedFile:any
  imageArt:any

  constructor(
    private conect : Conect,
    private activatedRoute: ActivatedRoute,
    private conectActive: ConectActive,
    private formBuilder : FormBuilder
  ){
    this.postArtForm = formBuilder.group({
      sellerId: [''],
      name:[''],
      description:[''],
      categoryId:[''],
      price:[''],
      quantity:[''],
      image:[''],
      createdAt:[''],
      deletedAt:[''],
      username: [''],
      avatar: [''],
      productAttributes: ['']
    })
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )

    this.conect.removeScript('src/plugins/src/editors/quill/quill.js')
    this.conect.removeScript('src/plugins/src/tagify/tagify.min.js')
    this.conect.removeScript('src/assets/js/apps/ecommerce-create.js')
    this.conect.removeScript('src/plugins/src/autocomplete/autoComplete.min.js')
    this.conect.removeScript('src/plugins/src/autocomplete/custom-autoComplete.js')
    this.conect.removeScript('src/plugins/src/autocomplete/automaterial.min.js')
    this.conect.removeScript('src/plugins/src/autocomplete/autopaint.min.js')
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")

    this.conect.addStyle('src/assets/css/light/apps/ecommerce-create.css')
    this.conect.addStyle('src/assets/css/dark/apps/ecommerce-create.css')
    this.conect.addStyle('src/plugins/src/tagify/tagify.css')
    this.conect.addStyle('src/plugins/css/light/editors/quill/quill.snow.css')
    this.conect.addStyle('src/plugins/css/light/tagify/custom-tagify.css')
    this.conect.addStyle('src/assets/css/dark/forms/switches.css')
    this.conect.addStyle('src/plugins/css/dark/editors/quill/quill.snow.css')
    this.conect.addStyle('src/plugins/css/dark/tagify/custom-tagify.css')


    
    this.conect.addScript('src/plugins/src/editors/quill/quill.js')

    this.conect.addScript('src/plugins/src/tagify/tagify.min.js')
    this.conect.addScript('src/assets/js/apps/ecommerce-create.js')
    this.conect.addScript('src/plugins/src/autocomplete/autoComplete.min.js')
    this.conect.addScript('src/plugins/src/autocomplete/automaterial.min.js')
    this.conect.addScript('src/plugins/src/autocomplete/autopaint.min.js')
    this.conect.addScript('src/plugins/src/autocomplete/custom-autoComplete.js')
    
    this.conect.reloadPage()

  }
  
  selectFile(event:any){
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    this.selectedFile = event.target.files[0];
    this.selectedFile = event.target.files[0] as FileList | null;
    if (this.selectedFile) {
      // Validate file types (optional)
      const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];
      const validFiles = Array.from(this.selectedFile).filter((file) => acceptedFileTypes);

      if (validFiles.length === 0) {
        alert('Please select only image files (PNG, JPG, or GIF)');
        return;
      }

      setSelectedFiles(validFiles);

      // Create image previews for each valid file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImagePreviews([...imagePreviews, e.target.result as string]);
      };

      for (const file of validFiles) {
        reader.readAsDataURL(file[0]);
      }
    } else {
      setSelectedFiles([]);
      setImagePreviews([]);
    }
  }
  post(){
    console.log(this.postArtForm.value)
  } 
}
function useState<T>(arg0: undefined[]): [any, any] {
  throw new Error('Function not implemented.');
}

