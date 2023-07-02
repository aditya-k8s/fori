import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FullComponent } from './layouts/full/full.component';

import { CategoryComponent } from './category/create-category/category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { SubCategotyListComponent } from './category/sub-categoty-list/sub-categoty-list.component';
import { UsersComponent} from './users/users.component';  
import { UserlistComponent } from './users/userlist/userlist.component'; 
import { UserBroadcastsComponent } from './users/user-broadcasts/user-broadcasts.component'; 
import { UserdetailsComponent } from './users/userdetails/userdetails.component'; 
import { UserproductsComponent } from './users/userproducts/userproducts.component';
import { OrderlistComponent } from './order/orderlist/orderlist.component';
import { OrderreportComponent } from './order/orderreport/orderreport.component';
import { ChannelsComponent } from './channels/channels.component';
import { ListComponent } from './channels/list/list.component';
import { EditusersComponent } from './editusers/editusers.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { ChannelDetailsComponent } from './channels/channel-details/channel-details.component';
import { ChannelStreamComponent } from './channels/channel-stream/channel-stream.component';
import { RetailerFeeComponent } from './retailer/retailer-fee/retailer-fee.component';
import { InfluenceListComponent } from './influence/influence-list/influence-list.component';
import { InfluenceDetailsComponent } from './influence/influence-details/influence-details.component';
import { CategoryStoreListComponent } from './category/category-store-list/category-store-list.component';
import { StreamComponent } from './channels/stream/stream.component';
import { SupportListingComponent } from './support/support-listing/support-listing.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { MerchantListComponent } from './merchant/merchant-list/merchant-list.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { DonationComponent } from './carbon/donation/donation.component';
import { TestimonialComponent } from './testimonial/testimonial/testimonial.component';
import { AddTestimonialComponent } from './testimonial/add-testimonial/add-testimonial.component';
import { AuthGuard } from './gaurds/auth.gaurd';
export const Approutes: Routes = [
 {path: 'login',component: LoginComponent},
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {path : 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
      {path : 'category/create',component: CategoryComponent,canActivate: [AuthGuard]},
      {path : 'category/update',component: CategoryComponent,canActivate: [AuthGuard]},
      {path : 'category/list',component: CategoryListComponent,canActivate: [AuthGuard]},
      {path : 'category/sub-caterory-list',component : SubCategotyListComponent,canActivate: [AuthGuard]},
      {path : 'category/sub-caterory',component : CreateSubcategoryComponent,canActivate: [AuthGuard]},
      {path : 'category/store-list',component : CategoryStoreListComponent,canActivate: [AuthGuard]},
      {path : 'users/list',component: UserlistComponent,canActivate: [AuthGuard]},
      {path : 'users/broadcastlist',component: UserBroadcastsComponent,canActivate: [AuthGuard]},
      {path : 'users/userdetails',component: UserdetailsComponent,canActivate: [AuthGuard]},
      {path : 'users/products/:user_id',component: UserproductsComponent,canActivate: [AuthGuard]},
      {path : 'order/list',component: OrderlistComponent,canActivate: [AuthGuard]},
      {path : 'order/report',component: OrderreportComponent,canActivate: [AuthGuard]},
      {path : 'order/order-details',component: OrderDetailsComponent,canActivate: [AuthGuard]},
      {path : 'channels/home',component: ChannelsComponent,canActivate: [AuthGuard]},
      {path : 'channel/listing',component: ListComponent,canActivate: [AuthGuard]},
      {path : 'channel/channel-details',component: ChannelDetailsComponent,canActivate: [AuthGuard]},
      {path : 'channel/channel-stream',component :ChannelStreamComponent,canActivate: [AuthGuard]},
      {path : 'channel/stream/:id',component : StreamComponent,canActivate: [AuthGuard]},
      {path : 'users/editusers/:user_id',component: EditusersComponent,canActivate: [AuthGuard]},
      {path : 'reports/sales-report',component: SalesReportComponent,canActivate: [AuthGuard]},
      {path : 'retailer/retailer-fee',component: RetailerFeeComponent,canActivate: [AuthGuard]},
      {path : 'influencer/influencer-list',component: InfluenceListComponent,canActivate: [AuthGuard]},
      {path : 'influencer/influencer-details',component: InfluenceDetailsComponent,canActivate: [AuthGuard]},
      {path : 'support/support-listing',component: SupportListingComponent,canActivate: [AuthGuard]},
      {path : 'calendar/calendar',component:CalendarComponent,canActivate: [AuthGuard]},
      {path : 'merchant/merchant-list',component: MerchantListComponent,canActivate: [AuthGuard]},
      {path : 'news/list',component: NewsListComponent,canActivate: [AuthGuard]},
      {path : 'news/add-news',component: AddNewsComponent,canActivate: [AuthGuard]},
      {path : 'blog/list',component: BlogListComponent,canActivate: [AuthGuard]},
      {path : 'blog/add-blog',component: AddBlogComponent,canActivate: [AuthGuard]},
      {path : 'carbon/donation',component : DonationComponent,canActivate: [AuthGuard]},
      {path : 'testomonial/testimonial', component : TestimonialComponent,canActivate: [AuthGuard]},
      {path : 'testomonial/add-testimonial', component : AddTestimonialComponent,canActivate: [AuthGuard]}
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  },
];

@NgModule({
  imports: [
  RouterModule.forRoot(Approutes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
