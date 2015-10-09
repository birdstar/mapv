/**
 * @file 示例代码
 */

bmap.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5); // 初始化地图,设置中心点坐标和地图级别

// 第一步创建mapv示例
var mapv = new Mapv({
    drawTypeControl: true,
    map: bmap  // 百度地图的map实例
});

var data = []; // 取城市的点来做示例展示的点数据

data = data.concat(getCityCenter(cityData.municipalities));
data = data.concat(getCityCenter(cityData.provinces));
data = data.concat(getCityCenter(cityData.other));

for (var i = 0; i < cityData.provinces.length; i++) {
    var citys = cityData.provinces[i].cities;
    data = data.concat(getCityCenter(citys));
}

function getCityCenter(citys) {
    var data = [];
    for (var i = 0; i < citys.length; i++) {
        var city = citys[i];
        var center = city.g.split('|')[0];
        center = center.split(',');
        data.push({
            lng: center[0],
            lat: center[1],
            count: parseInt(Math.random() * 10)
        });
    }
    return data;
};

var layer = new Mapv.Layer({
    mapv: mapv, // 对应的mapv实例
    zIndex: 1, // 图层层级
    dataType: 'point', // 数据类型，点类型
    data: data, // 数据
    drawType: 'choropleth', // 展示形式
    drawOptions: { // 绘制参数
        size: 5, // 点大小
        // splitList数值表示按数值区间来展示不同颜色的点
        splitList: [
            {
                start: 0,
                end: 2,
                color: randomColor()
            },{
                start: 2,
                end: 4,
                color: randomColor()
            },{
                start: 4,
                end: 6,
                color: randomColor()
            },{
                start: 6,
                end: 8,
                color: randomColor()
            },{
                start: 8,
                color: randomColor()
            }
        ],
    }
});