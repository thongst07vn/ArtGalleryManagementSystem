import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './product-rate.component.html',
  // styleUrls: ['./product-rate.component.css']
})
export class ProductRateComponent implements OnInit, AfterViewInit {
  constructor(
    private conect : Conect
  ) { }

  async ngOnInit(){

    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")

    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")

    
    this.conect.addStyle("src/plugins/src/table/datatable/datatables.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/assets/css/light/apps/invoice-list.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/dt-global_style.css")
    this.conect.addScriptAsync("src/assets/js/custom.js")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")

    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/assets/css/dark/apps/invoice-list.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/product-rate.css")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/datatables.js")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/invoice-list.js")


    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', () => {
      // Product rating stars
      document.querySelectorAll('.star-rating.product-stars i[data-star]').forEach((starElement) => {
        starElement.addEventListener('click', () => {
           // Ghi log khi ngôi sao được nhấn
          const star = starElement.getAttribute('data-star');
          const stars = starElement.parentElement?.children;
  
          if (stars) {
            for (let i = 0; i < stars.length; i++) {
              stars[i].classList.remove('text-warning');
              stars[i].classList.add('text-secondary');
  
              if (i < Number(star)) {
                stars[i].classList.remove('text-secondary');
                stars[i].classList.add('text-warning');
              }
            }
          }
          console.log(star)
        });
      });
  
      // Service rating stars
      document.querySelectorAll('.star-rating.service-stars i[data-service-star]').forEach((starElement) => {
        starElement.addEventListener('click', () => {
          console.log('Service Star clicked:', starElement); // Ghi log khi ngôi sao dịch vụ được nhấn
          const serviceStar = starElement.getAttribute('data-service-star');
          const serviceStars = starElement.parentElement?.children;
  
          if (serviceStars) {
            for (let i = 0; i < serviceStars.length; i++) {
              serviceStars[i].classList.remove('text-warning');
              serviceStars[i].classList.add('text-secondary');
  
              if (i < Number(serviceStar)) {
                serviceStars[i].classList.remove('text-secondary');
                serviceStars[i].classList.add('text-warning');
              }
            }
          }
        });
      });
    });
  }
}
