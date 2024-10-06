import { Routes } from '@angular/router';
import { HomeComponent } from './user/components/product/home.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { ProductDetailsComponent } from './user/components/product/product-details.component';
import { ProfileEditComponent } from './user/components/profile/profile-edit.component';
import { LayoutsComponent } from './user/layouts/layouts/layouts.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/login/signup.component';
import { ContactUsComponent } from './user/components/Us/contactUs.component';
import { AddtoCardComponent } from './user/components/product/addtocard.component';
import { AboutusComponent } from './user/components/Us/aboutus.component';
import { AuctionComponent } from './user/components/auction/auction.component';
import { AuctionDetailsComponent } from './user/components/auction/auction-details.component';
import { InvoiceComponent } from './user/components/product/invoice.component';
import { PostcartComponent } from './user/components/post/postcart.component';
import { WishlistComponent } from './user/components/product/wishlist.component';
import { HomeNoLoginComponent } from './user/layouts/layouts/homeNoLogin.component';

// Import guards
import { AuthGuard } from './auth.guard';
import { LoginRedirectGuard } from './loginRedirect.guard';

export const routes: Routes = [
    // Route cho người dùng đã đăng nhập
    {
        path: 'user',
        component: LayoutsComponent,
        canActivate: [AuthGuard], // Bảo vệ toàn bộ đường dẫn con của `user` bằng `AuthGuard`
        children: [
            {
                path: '',
                component: HomeComponent,
                data: {
                    addActive: 'userHome',
                }
            },
            {
                path: 'home',
                component: HomeComponent,
                data: {
                    addActive: 'userHome',
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    addActive: 'profile'
                }
            },
            {
                path: 'edit-profile',
                component: ProfileEditComponent,
                data: {
                    addActive: 'profile'
                }
            },
            {
                path: 'product-details',
                component: ProductDetailsComponent,
                data: {
                    addActive: 'product'
                }
            },
            {
                path: 'invoice',
                component: InvoiceComponent,
                data: {
                    addActive: 'product'
                }
            },
            {
                path: 'contact-us',
                component: ContactUsComponent,
                data: {
                    addActive: 'contactUs',
                }
            },
            {
                path: 'about-us',
                component: AboutusComponent,
                data: {
                    addActive: 'aboutUs',
                }
            },
            {
                path: 'add-to-cart',
                component: AddtoCardComponent,
                data: {
                    addActive: 'product',
                }
            },
            {
                path: 'auction',
                component: AuctionComponent,
                data: {
                    addActive: 'auction',
                }
            },
            {
                path: 'auction-detail',
                component: AuctionDetailsComponent,
                data: {
                    addActive: 'auction',
                }
            },
            {
                path: 'post-art',
                component: PostcartComponent,
                data: {
                    addActive: 'postArt',
                }
            },
            {
                path: 'wishlist',
                component: WishlistComponent,
                data: {
                    addActive: 'product',
                }
            }
        ]
    },

    // Chuyển hướng về `/user/home` nếu đã đăng nhập
    {
        path: '',
        component: HomeNoLoginComponent,
        canActivate: [LoginRedirectGuard],
        children:[
            {
                path: '',
                component: HomeComponent,
                data: {
                    addActive: 'userHome',
                }
            },
            {
                path: 'product-details',
                component: ProductDetailsComponent,
                data: {
                    addActive: 'product'
                }
            },
            {
                path: 'about-us',
                component: AboutusComponent,
                data: {
                    addActive: 'aboutUs',
                }
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginRedirectGuard] // Chuyển hướng đến `/user/home` nếu đã đăng nhập
    },
    {
        path: 'register',
        component: SignUpComponent,
        canActivate: [LoginRedirectGuard] // Chuyển hướng đến `/user/home` nếu đã đăng nhập
    },
    
    // // Route cho người dùng chưa đăng nhập (HomeNoLogin)
    // {
    //     path: 'home',
    //     component: HomeNoLoginComponent
    // },
];
