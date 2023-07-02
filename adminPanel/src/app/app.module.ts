// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FullCalendarModule } from '@fullcalendar/angular';

import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CategoryComponent } from './category/create-category/category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { UsersComponent } from './users/users.component';
import { UserlistComponent } from './users/userlist/userlist.component';
import { UserBroadcastsComponent } from './users/user-broadcasts/user-broadcasts.component';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';
import { UserproductsComponent } from './users/userproducts/userproducts.component';
import { OrderlistComponent } from './order/orderlist/orderlist.component';
import { OrderreportComponent } from './order/orderreport/orderreport.component';
import { ChannelsComponent } from './channels/channels.component';
import { ListComponent } from './channels/list/list.component';
import { EditusersComponent } from './editusers/editusers.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChannelDetailsComponent } from './channels/channel-details/channel-details.component';
import { ChannelStreamComponent } from './channels/channel-stream/channel-stream.component';
import { RetailerFeeComponent } from './retailer/retailer-fee/retailer-fee.component';
import { TwoDigitDecimaNumberDirective } from './two-digit-decima-number.directive';
import { InfluenceListComponent } from './influence/influence-list/influence-list.component';
import { InfluenceDetailsComponent } from './influence/influence-details/influence-details.component';
import { SubCategotyListComponent } from './category/sub-categoty-list/sub-categoty-list.component';
import { CategoryStoreListComponent } from './category/category-store-list/category-store-list.component';
import { LiveStreamComponent } from './channels/live-stream/live-stream.component';
import { StreamComponent } from './channels/stream/stream.component';
import { SupportListingComponent } from './support/support-listing/support-listing.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { MerchantListComponent } from './merchant/merchant-list/merchant-list.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};   
import { CKEditorModule } from 'ckeditor4-angular';
import { DonationComponent } from './carbon/donation/donation.component';
import { TestimonialComponent } from './testimonial/testimonial/testimonial.component';
import { AddTestimonialComponent } from './testimonial/add-testimonial/add-testimonial.component';
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
    LoginComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    CategoryComponent,
    CategoryListComponent,
    CreateSubcategoryComponent,
    UsersComponent,
    UserlistComponent,
    UserBroadcastsComponent,
    UserdetailsComponent,
    UserproductsComponent,
    OrderlistComponent,
    OrderreportComponent,
    ChannelsComponent,
    ListComponent,
    EditusersComponent,
    OrderDetailsComponent,
    SalesReportComponent,
    ChannelDetailsComponent,
    ChannelStreamComponent,
    RetailerFeeComponent,
    TwoDigitDecimaNumberDirective,
    InfluenceListComponent,
    InfluenceDetailsComponent,
    SubCategotyListComponent,
    CategoryStoreListComponent,
    LiveStreamComponent,
    StreamComponent,
    SupportListingComponent,
    CalendarComponent,
    MerchantListComponent,
    NewsListComponent,
    AddNewsComponent,
    BlogListComponent,
    AddBlogComponent,
    DonationComponent,
    TestimonialComponent,
    AddTestimonialComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
	  PerfectScrollbarModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    HighchartsChartModule,
    FullCalendarModule,
    DataTablesModule,
    CKEditorModule,
    RouterModule.forRoot(Approutes, { useHash: false, relativeLinkResolution: 'legacy' })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
	{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
