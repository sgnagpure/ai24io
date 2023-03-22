module.exports = {
  webpack5: true,
  trailingSlash:true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  images: {
    loader: 'akamai',
    path: '',
  },
  eslint: {
    ignoreDuringBuilds: true,
},
headers: () => [
  {
    source: '/blog',
    headers: [
      {
        key: 'Cache-Control',
        value: 'no-store',
      },
    ],
  },
],
  exportPathMap: async function() {
    return {
      "/": { page: "/" },
      "/login":{page :"/users/login"},
      "/register":{page :"/users/register"},      
      "/blog":{page:"/users/blog"},

      "/users/login" : {page :"/users/login"},
      "/users/register" : {page :"/users/register"},
      "/users/dashboard" : {page :"/users/dashboard"},
      "/users/buy" : {page :"/users/buy"},
      "/users/buytoken" : {page :"/users/buytoken"},
      "/users/history" : {page :"/users/history"},
      "/users/forget_password" : {page :"/users/forget_password"},
      "/users/reset_password" : {page :"/users/reset_password"},
      
      "/admin":{page :"/admin/login"},
      "/admin/login":{page :"/admin/login"},
      "/admin/dashboard":{page :"/admin/dashboard"},
      "/admin/processed_request":{page :"/admin/processed_request"},
      "/admin/token_request":{page :"/admin/token_request"},
      "/admin/users":{page :"/admin/users"},
      "/admin/settings":{page :"/admin/settings"},
      "/admin/add_blogs":{page:"/admin/add_blogs"},
      "/admin/bank_details":{page:"/admin/bank_details"},
      "/admin/show_blogs":{page:"/admin/show_blogs"},
      "/admin/add_category":{page:"/admin/add_category"},
      "/admin/show_category":{page:"/admin/show_category"},

     
      
    };

    
  }
}