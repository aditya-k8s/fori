 import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  // {
  //   path: "",
  //   title: "Personal",
  //   icon: "mdi mdi-dots-horizontal",
  //   class: "nav-small-cap",
  //   extralink: true,
  //   submenu: [],
  // },
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "mdi mdi-gauge",
    class: "",
    extralink: false,
    submenu: [],
  },
  /*{
    path: "",
    title: "UI Components",
    icon: "mdi mdi-dots-horizontal",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
  },*/
  /* {
    path: "/category/create",
    title: "Category",
    icon: "mdi mdi-sort-variant",
    class: "",
    extralink: false,
    submenu: 
    [
     {
        path: "/category/create",
        title: "Add Category",
        icon: "mdi mdi-plus",
        class: "",
        extralink: false,
        submenu: [],
      },
      {
        path: "/category/list",
        title: "Category List",
        icon: "mdi mdi-equal",
        class: "",
        extralink: false,
        submenu: [],
      },
    ]

  },*/
  {
    path: "/users/list",
    title: "Users",
    icon: "mdi mdi-account",
    class: "",
    extralink: false,
    submenu: 
    [
     /*{
        path: "/users/list",
        title: "User List",
        icon: "mdi mdi-users",
        class: "",
        extralink: false,
        submenu: [],
      }*/
    ]

  },{
    path: "/order/list",
    title: "Orders",
    icon: "mdi mdi-cart",
    class: "",
    extralink: false,
    submenu: 
    [
    //  {
    //     path: "/order/report",
    //     title: "Order Report",
    //     icon: "mdi mdi-chart-line",
    //     class: "",
    //     extralink: false,
    //     submenu: [],
    //   }
    ]

  },
  {
    path: "carbon/donation",
    title: "Donation",
    icon: "mdi mdi-account-card-details",
    class: "",
    extralink: false,
    submenu: []
  },
  {
    path: "channels/home",
    title: "Channels",
    icon: "mdi mdi-monitor",
    class: "",
    extralink: false,
    submenu: 
    [
    //  {
    //     path: "channel/listing",
    //     title: "Channel Listing",
    //     icon: "mdi mdi-cast",
    //     class: "",
    //     extralink: false,
    //     submenu: [],
    //   }
    ]

  },
  {
    path: "reports/sales-report",
    title: "Reports",
    icon: "mdi mdi-blur-radial",
    class: "",
    extralink: false,
    submenu: [],
  },{
    path: "/retailer/retailer-fee",
    title: "Retailer Fee",
    icon: "mdi mdi-backburger",
    class: "",
    extralink: false,
    submenu: [],
  },{
    path: "category/list",
    title: "Category",
    icon: "mdi mdi-plus",
    class: "",
    extralink: false,
    submenu: [{
      path: "/category/create",
      title: "Add Category",
      icon: "mdi mdi-plus",
      class: "",
      extralink: false,
      submenu: [],
    }],
  },{
    path: "/influencer/influencer-list",
    title: "Influencer",
    icon: "mdi mdi-poll",
    class: "",
    extralink: false,
    submenu: [],
  },{
    path: "/merchant/merchant-list",
    title: "Merchant",
    icon: "mdi mdi-sort-variant",
    class: "",
    extralink: false,
    submenu: [],
  },
  // ,{
  //   path: "/support/support-listing",
  //   title: "Support",
  //   icon: "mdi  mdi-toggle-switch",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  {
    path: "/calendar/calendar",
    title: "Calendar",
    icon: "mdi mdi-calendar-clock",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/news/list",
    title: "News",
    icon: "mdi mdi-newspaper",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/blog/list",
    title: "Blog",
    icon: "mdi mdi-tumblr-reblog",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/testomonial/testimonial",
    title: "Testomonials",
    icon: "mdi mdi-bandcamp",
    class: "",
    extralink: false,
    submenu: [],
  },
  // {
  //   path: "/component/card",
  //   title: "Card",
  //   icon: "mdi mdi-blur-radial",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/accordion",
  //   title: "Accordion",
  //   icon: "mdi mdi-equal",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/alert",
  //   title: "Alert",
  //   icon: "mdi mdi-message-bulleted",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/carousel",
  //   title: "Carousel",
  //   icon: "mdi mdi-view-carousel",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/dropdown",
  //   title: "Dropdown",
  //   icon: "mdi mdi-arrange-bring-to-front",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/modal",
  //   title: "Modal",
  //   icon: "mdi mdi-tablet",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/pagination",
  //   title: "Pagination",
  //   icon: "mdi mdi-backburger",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/poptool",
  //   title: "Popover & Tooltip",
  //   icon: "mdi mdi-image-filter-vintage",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/progressbar",
  //   title: "Progressbar",
  //   icon: "mdi mdi-poll",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/rating",
  //   title: "Ratings",
  //   icon: "mdi mdi-bandcamp",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/tabs",
  //   title: "Tabs",
  //   icon: "mdi mdi-sort-variant",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/timepicker",
  //   title: "Timepicker",
  //   icon: "mdi mdi-calendar-clock",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/buttons",
  //   title: "Button",
  //   icon: "mdi mdi-toggle-switch",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/component/toast",
  //   title: "Toast",
  //   icon: "mdi mdi-alert",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
   
];
