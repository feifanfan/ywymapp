export default {
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/user/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar:{
    selectedColor:"#1E8FEE",
    list:[{
      "pagePath": "pages/index/index",
      "iconPath": "public/images/icon/home.png",
      "selectedIconPath":"public/images/icon/home_click.png",
      "text": "首页"
    },{
      "pagePath":"pages/user/index",
      "iconPath": "public/images/icon/user.png",
      "selectedIconPath":"public/images/icon/user_click.png",
      "text":"我的"
    }]
  }
}
