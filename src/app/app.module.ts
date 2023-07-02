import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataTablesModule} from 'angular-datatables';


import { FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CommonModule,DatePipe } from '@angular/common';  
import { LoginComponent } from './account/login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './account/register/register.component';

import { MyaccountComponent } from './account/myaccount/myaccount.component';
import { HomeComponent } from './home/home.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { CreateStoreComponent } from './create-store/create-store.component';

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MyChannelComponent } from './my-channel/my-channel.component';
import { StreamComponent } from './streaming/stream/stream.component';

import { InventoryComponent } from './inventory/inventory.component';
import { LogoutComponent } from './account/logout/logout.component';
import { BroadcastingComponent } from './broadcasting/broadcasting.component';
import { CreateStreamComponent } from './streaming/create-stream/create-stream.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CountdownModule } from 'ngx-countdown';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';

import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingAddressComponent } from './account/shipping-address/shipping-address.component';


import { CartComponent } from './cart/cart.component';
import { OrderListComponent } from './account/order-list/order-list.component';
import { TrackOrderComponent } from './account/track-order/track-order.component';


import { ListllivestreamComponent } from './streaming/listllivestream/listllivestream.component';
import { ListchannelsComponent } from './channel/listchannels/listchannels.component';
// import { ListproductsComponent } from './listproducts/listproducts.component';
import { EditStreamComponent } from './streaming/edit-stream/edit-stream.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

import { TagInputModule } from 'ngx-chips';
import { NgxUiLoaderModule } from "ngx-ui-loader";

import { GooglePayButtonModule } from '@google-pay/button-angular';
import { ViewStreamComponent } from './streaming/view-stream/view-stream.component';
// import { ApplePay } from '@ionic-native/apple-pay/ngx';
// import {PaymentRequestModule} from "ng-payment-request-api";

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { PaymentDataComponent } from './account/payment-data/payment-data.component';
import { ShippingFeeComponent } from './account/shipping-fee/shipping-fee.component';
import { StripeComponent } from './stripe/stripe.component';
import { RetailerFeeComponent } from './account/retailer-fee/retailer-fee.component';
import { MySalesComponent } from './account/my-sales/my-sales.component';
// import { NgxStripeModule } from 'ngx-stripe';
import { CKEditorModule } from 'ckeditor4-angular';
import { ConfirmationComponent } from './account/confirmation/confirmation.component';
import { TruncatePipePipe } from './truncate-pipe.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { FilePickerModule } from  'ngx-awesome-uploader';
import { NgxFileDropModule } from 'ngx-file-drop';
import { StripePaymentComponent } from './common/stripe-payment/stripe-payment.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FollowersListComponent } from './account/followers-list/followers-list.component';
import { SalesDashboardComponent } from './account/sales-dashboard/sales-dashboard.component';
import { MyProductsComponent } from './account/my-products/my-products.component';
import { HighchartsChartModule } from 'highcharts-angular';

import { ViewProductComponent } from './product/view-product/view-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { GetProductComponent } from './product/get-product/get-product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { LiveSessionsComponent } from './account/live-sessions/live-sessions.component';
import { InterestComponent } from './interest/interest.component';
import { GuidComponent } from './guid/guid.component';
import { RecommendComponent } from './account/recommend/recommend.component';
import { StoresListComponent } from './account/stores-list/stores-list.component';
import { GoogleCalendarComponent } from './google-calendar/google-calendar.component';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './fcm-messaging/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { InfluencerProfileComponent } from './influencer-profile/influencer-profile.component';

import { ChimeComponent } from './chime/chime.component';
import { LivestreamComponent } from './livestream/livestream.component';

import { RecentLiveEventsComponent } from './account/recent-live-events/recent-live-events.component';
import { LiveEngagementComponent } from './account/live-engagement/live-engagement.component';
import { PaymentsComponent } from './account/payments/payments.component';
import { InfulencerSalesComponent } from './account/infulencer-sales/infulencer-sales.component';
import { MyInfluencerPageComponent } from './account/my-influencer-page/my-influencer-page.component';
import { InvalidUrlComponent } from './invalid-url/invalid-url.component';

import { TestimonialComponent } from './account/testimonial/testimonial/testimonial.component';
import { AddTestimonialComponent } from './account/testimonial/add-testimonial/add-testimonial.component';
import { InvitationsComponent } from './account/invitations/invitations.component';
import { AcceptedBroadcastComponent } from './account/accepted-broadcast/accepted-broadcast.component';


import { CarouselModule } from 'ngx-owl-carousel-o';
import {BreadcrumbModule} from 'xng-breadcrumb';
import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";
import { BillingDetailComponent } from './account/billing-detail/billing-detail.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LiveStreamingListComponent } from './streaming/live-streaming-list/live-streaming-list.component';
import { UpcomingStreamingListComponent } from './streaming/upcoming-streaming-list/upcoming-streaming-list.component';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])
import {CancelService} from './cancel.service';
import { AllNewsComponent } from './news/all-news/all-news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ShopperComponent } from './shopper/shopper.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { StoresBrandsComponent } from './stores-brands/stores-brands.component';
import { LiveStreamComponent } from './common/live-stream/live-stream.component';
import { UpcomingLiveStreamComponent } from './common/upcoming-live-stream/upcoming-live-stream.component';
import { FaqComponent } from './common/faq/faq.component';
import { ViewMoreRecommendationComponent } from './common/view-more-recommendation/view-more-recommendation.component';
import { ViewMoreInfluencersComponent } from './common/view-more-influencers/view-more-influencers.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    MyaccountComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CreateStoreComponent,
    SidebarComponent,
    MyChannelComponent,
    StreamComponent,
    CreateProductComponent,
    InventoryComponent,
    LogoutComponent,
    BroadcastingComponent,
    CreateStreamComponent,
    EditProductComponent,
    CheckoutComponent,
    ShippingAddressComponent,
    GetProductComponent,
    CartComponent,
    OrderListComponent,
    TrackOrderComponent,
    ListchannelsComponent,
    ListllivestreamComponent,
    EditStreamComponent,
    ThankYouComponent,
    ViewStreamComponent,
    PaymentDataComponent,
    ShippingFeeComponent,
    StripeComponent,
    RetailerFeeComponent,
    MySalesComponent,
    ConfirmationComponent,
    TruncatePipePipe,
    StripePaymentComponent,
    FollowersListComponent,
    SalesDashboardComponent,
    MyProductsComponent,
    ViewProductComponent,
    LiveSessionsComponent,
    InterestComponent,
    GuidComponent,
    RecommendComponent,
    StoresListComponent,
    GoogleCalendarComponent,
    InfluencerProfileComponent,
    ChimeComponent,
    LivestreamComponent,
    RecentLiveEventsComponent,
    LiveEngagementComponent,
    PaymentsComponent,
    InfulencerSalesComponent,
    MyInfluencerPageComponent,
    InvalidUrlComponent,
    TestimonialComponent,
    AddTestimonialComponent,
    InvitationsComponent,
    AcceptedBroadcastComponent,
    BillingDetailComponent,
    LiveStreamingListComponent,
    UpcomingStreamingListComponent,
    AllNewsComponent,
    NewsDetailComponent,
    ShopperComponent,
    InfluencersComponent,
    StoresBrandsComponent,
    LiveStreamComponent,
    UpcomingLiveStreamComponent,
    FaqComponent,
    ViewMoreRecommendationComponent,
    ViewMoreInfluencersComponent
  ],
  imports: [
    MatStepperModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatListModule,
    CommonModule,
    DataTablesModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    CountdownModule,
    SocialLoginModule,
    TagInputModule,
    NgxUiLoaderModule,
    GooglePayButtonModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    CKEditorModule,
    ImageCropperModule,
    //FilePickerModule,
    NgxFileDropModule,
    RecaptchaModule,
    NgxSliderModule,
    HighchartsChartModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FullCalendarModule,
    CarouselModule,
    BreadcrumbModule,
    NgDynamicBreadcrumbModule,
    DragDropModule,
   // BreadcrumbModule,
    NgDynamicBreadcrumbModule,
    PickerModule
  ],
   providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '215704000060-cc8r1qrgtt5b7gig1eig7ci8252t1b05.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('987254075415659')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    MessagingService, AsyncPipe,DatePipe, CancelService
  ],
  bootstrap: [AppComponent]
})

// declare module "@angular/core" {
//   interface ModuleWithProviders<T = any> {
//     ngModule: Type<T>;
//     providers?: Provider[];
//   }
// }
export class AppModule { }
