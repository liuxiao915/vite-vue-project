import store from '@/store/index'
// 修改页面中的样式变量值
const changeStyle = (obj) => {
  for (let key in obj) {
    document
      .getElementsByTagName("body")[0]
      .style.setProperty(`--${key}`, obj[key]);
  }
};
// 改变主题的方法
export const changeTheme = () => {
  // let themeConfig = themes[theme.value];
  // // 如果有主题名称，那么则采用我们定义的主题
  // if (themeConfig) {
  //   changeStyle(themeConfig); // 改变样式
  // }
  const theme = JSON.parse(localStorage.getItem('theme')) || null
  let themeConfig = {
    primaryColor: theme?.backGroundColor,
    primaryTextColor: theme?.color,
  };
  changeStyle(themeConfig);
};

// 组件中css使用：
// background: rgba(@primaryColor, 1);
// color: @primaryTextColor;	