import * as Cesium from "cesium";
export const addBaiduMap = (viewer) => {
  const baiduMapKey = import.meta.env.VITE_APP_BAIDUMAPKEY
  // 百度地图的URL模板，其中{x}、{y}、{z}会被相应的瓦片坐标替换
  var baiduMapUrl = 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20170101&scaler=1&udt=20170101&tn=baiduimageyle&udt=20170101';
  // 创建一个Cesium.CustomDataSource，并设置其图片图层
  var customDataSource = new Cesium.CustomDataSource('百度地图');
  // 获取瓦片服务的图像图层
  var imageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: baiduMapUrl,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    // 其他参数根据需要设置
  });
  // 将图像图层添加到CustomDataSource
  viewer.imageryLayers.addImageryProvider(imageryProvider);
  // 将CustomDataSource添加到Cesium.Viewer中
  viewer.dataSources.add(customDataSource);
  // 你可以选择是否隐藏Cesium自带的地图
  viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
}

