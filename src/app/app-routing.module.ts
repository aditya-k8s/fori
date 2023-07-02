import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './gaurds/auth.gaurd';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyaccountComponent } from './account/myaccount/myaccount.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { MyChannelComponent } from './my-channel/my-channel.component';
import { StreamComponent } from './streaming/stream/stream.component';


import { InventoryComponent } from './inventory/inventory.component';
import { BroadcastingComponent } from './broadcasting/broadcasting.component';
import { CreateStreamComponent } from './streaming/create-stream/create-stream.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingAddressComponent } from './account/shipping-address/shipping-address.component';
import { CartComponent } from './cart/cart.component';
import { OrderListComponent } from './account/order-list/order-list.component';
import { TrackOrderComponent } from './account/track-order/track-order.component';

import { ListllivestreamComponent } from './streaming/listllivestream/listllivestream.component';
 import { ListchannelsComponent } from './channel/listchannels/listchannels.component';
//import { ListproductsComponent } from './listproducts/listproducts.component';
 import { EditStreamComponent } from './streaming/edit-stream/edit-stream.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ViewStreamComponent } from './streaming/view-stream/view-stream.component';

import { PaymentDataComponent } from './account/payment-data/payment-data.component';
import { ShippingFeeComponent } from './account/shipping-fee/shipping-fee.component';
import { StripeComponent } from './stripe/stripe.component';
import { RetailerFeeComponent } from './account/retailer-fee/retailer-fee.component';
import { MySalesComponent } from './account/my-sales/my-sales.component';
import { ConfirmationComponent } from './account/confirmation/confirmation.component';
import { FollowersListComponent } from './account/followers-list/followers-list.component';
import { SalesDashboardComponent } from './account/sales-dashboard/sales-dashboard.component';
import { MyProductsComponent } from './account/my-products/my-products.component';
import { LiveSessionsComponent } from './account/live-sessions/live-sessions.component';

import { ViewProductComponent } from './product/view-product/view-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { GetProductComponent } from './product/get-product/get-product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';

import { InterestComponent } from './interest/interest.component';
import { GuidComponent } from './guid/guid.component';
import { RecommendComponent } from './account/recommend/recommend.component';
import { StoresListComponent } from './account/stores-list/stores-list.component';

import { GoogleCalendarComponent } from './google-calendar/google-calendar.component';
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
import { BillingDetailComponent } from './account/billing-detail/billing-detail.component'
import { LiveStreamingListComponent } from './streaming/live-streaming-list/live-streaming-list.component';
import { UpcomingStreamingListComponent } from './streaming/upcoming-streaming-list/upcoming-streaming-list.component';
import { AllNewsComponent } from './news/all-news/all-news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { ShopperComponent } from './shopper/shopper.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { StoresBrandsComponent } from './stores-brands/stores-brands.component';
import { ViewMoreRecommendationComponent } from './common/view-more-recommendation/view-more-recommendation.component';
import { ViewMoreInfluencersComponent } from './common/view-more-influencers/view-more-influencers.component';
const routes: Routes = [
	{ path: '', component: HomeComponent,pathMatch: 'full'},
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent},
	{ path: 'register/:sponsor', component: RegisterComponent},
	{ path: 'account/profile', component: MyaccountComponent,canActivate: [AuthGuard]},
	{ path: 'account/orders', component: OrderListComponent,canActivate: [AuthGuard]},
	{ path: 'account/sales', component: MySalesComponent,canActivate: [AuthGuard]},
	{ path: 'account/fori-fee', component: RetailerFeeComponent,canActivate: [AuthGuard]},
	{ path: 'account/follow-list', component: FollowersListComponent,canActivate: [AuthGuard]},
	{ path: 'account/address', component: ShippingAddressComponent,canActivate: [AuthGuard]},
	//{ path: 'account/payment', component: PaymentDataComponent,canActivate: [AuthGuard]},
	{ path: 'account/shipping-fee', component: ShippingFeeComponent,canActivate: [AuthGuard]},
	{ path: 'account/sales-dashboard', component: SalesDashboardComponent,canActivate: [AuthGuard]},
	{ path: 'account/my-products', component: MyProductsComponent,canActivate: [AuthGuard]},
	{ path: 'account/live-session', component: LiveSessionsComponent,canActivate: [AuthGuard]},
	{ path: 'account/recommend', component: RecommendComponent,canActivate: [AuthGuard]},
	{ path: 'account/store', component: StoresListComponent,canActivate: [AuthGuard]},
	{ path: 'account/recent-live-events', component: RecentLiveEventsComponent,canActivate: [AuthGuard]},
	{ path: 'account/live-engagement/:id', component: LiveEngagementComponent,canActivate: [AuthGuard]},
	{ path: 'account/bank-info', component: PaymentsComponent,canActivate: [AuthGuard]},
	{ path: 'account/influencer-Sale-report', component: InfulencerSalesComponent,canActivate: [AuthGuard]},
	{ path: 'account/testimonials/list', component: TestimonialComponent,canActivate: [AuthGuard]},
	{ path: 'account/testimonial', component: AddTestimonialComponent,canActivate: [AuthGuard]},
	{ path: 'account/invitations', component: InvitationsComponent,canActivate: [AuthGuard]},
	{ path: 'account/accepted-broadcast', component: AcceptedBroadcastComponent,canActivate: [AuthGuard]},
	{ path: 'account/billing-detail', component: BillingDetailComponent,canActivate: [AuthGuard]},


	{ path: 'influencer/:name', component: MyInfluencerPageComponent,canActivate: [AuthGuard]},

	{ path: 'dashboard', component: DashboardComponent},
	//{ path: 'myaccount', component: MyaccountComponent},
	{ path: 'forgotPassword', component: ForgotPasswordComponent},
	{ path: 'reset-password/:token', component: ResetPasswordComponent},
	{ path: 'create-store', component: CreateStoreComponent,canActivate: [AuthGuard]},
	{ path: 'channel/:channel_name', component: MyChannelComponent},
	{ path: 'stream/:id', component: StreamComponent,canActivate: [AuthGuard]},
	{ path: 'inventory', component: InventoryComponent,canActivate: [AuthGuard]},
	{
    path: 'create/product',
    component: CreateProductComponent,
    data: {
      title: 'Create Product',
      breadcrumb: [
        {
          label: 'Inventory',
          url: '/inventory/'
        },
        {
          label: '{{dynamicText}}',
          url: ''
        }
      ]
    },
  },
	{ path: 'broadcasting', component: BroadcastingComponent,canActivate: [AuthGuard]},
	{ path: 'create/stream', component: CreateStreamComponent,canActivate: [AuthGuard]},
	{ path: 'checkout', component: CheckoutComponent,canActivate: [AuthGuard]},
	{ path: 'cart', component: CartComponent,canActivate: [AuthGuard]},
	{ path: 'track/orders/:order_id', component: TrackOrderComponent,canActivate: [AuthGuard]},
	{ path: 'list/channels', component: ListchannelsComponent},
	{ path: 'list/streaming', component: ListllivestreamComponent},
	{ path: 'edit-stream/:stream_id', component: EditStreamComponent,canActivate: [AuthGuard]},
	{ path: 'success', component: ThankYouComponent,canActivate: [AuthGuard]},
	{ path: 'view-stream/:stream_id', component: ViewStreamComponent},
	{ path: 'stripe', component: StripeComponent,canActivate: [AuthGuard]},
	{ path: 'confirmation/:activation_code', component: ConfirmationComponent},
	{ path: 'product/:product_id', component: EditProductComponent,canActivate: [AuthGuard]},
	{ path: 'products', component: GetProductComponent,canActivate: [AuthGuard]},
	// { path: 'create/product', component: CreateProductComponent,canActivate: [AuthGuard]},
	{ path: 'view/product/:productId', component: ViewProductComponent,canActivate: [AuthGuard]},
	{ path: 'confirmation/:activation_code', component: ConfirmationComponent},
	{ path: 'interests', component: InterestComponent,canActivate: [AuthGuard]},
	{ path: 'guid', component: GuidComponent,canActivate: [AuthGuard]},
	{ path: 'google', component: GoogleCalendarComponent},
	{ path: 'influencer-profile', component: InfluencerProfileComponent},
	{ path: 'chime', component: ChimeComponent},
	{ path: 'livestream', component: LivestreamComponent},
	{ path: 'invalid-url', component:InvalidUrlComponent},
	{ path: 'broadcast/live', component: LiveStreamingListComponent},
	{ path: 'broadcast/upcoming', component:UpcomingStreamingListComponent},
	{ path: 'news/all-news', component:AllNewsComponent},
	{ path: 'news/news-detail', component:NewsDetailComponent},
	{ path: 'shoppers', component: ShopperComponent},
	{ path: 'influencers', component: InfluencersComponent},
	{ path: 'stores-brands', component: StoresBrandsComponent},
	{ path: 'more-recommendation', component : ViewMoreRecommendationComponent,canActivate: [AuthGuard]},
	{ path: 'more-influencers', component : ViewMoreInfluencersComponent,canActivate: [AuthGuard]}
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
