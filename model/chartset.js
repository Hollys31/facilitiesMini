import F2 from '../f2-canvas/lib/f2';
const chartInit = (canvas, width, height, data, params, unit) => {
  const chart = new F2.Chart({
    el: canvas,
    width,
    height,
    padding: ['auto', 'auto', 40, 'auto']
  });
  chart.source(data, {
    month: {
      tickCount: 6
    },
    value: {
      tickCount: 6,
      alias: '',
      formatter(val) {
        return val
      }
    }
  });
  chart.axis(params.propertX, {
    label: {
      rotate: -Math.PI / 7,
      textAlign: 'end',
      textBaseline: 'middle'
    },
  });
  chart.legend();
  chart.tooltip({
    showCrosshairs: true,
    custom: true, // 自定义 tooltip 内容框
    onChange(params) {
      const legend = chart.get('legendController').legends.top[0];
      const tooltipItems = params.items;
      const legendItems = legend.items;
      const map = {};
      legendItems.map(item => {
        map[item.name] = Object.assign({}, item);
      });
      tooltipItems.map(item => {
        const {
          name,
          value
        } = item;
        if (map[name]) {
         
          map[name].value = value + " " + unit;
          let temp={};
          temp.currDate=item.title;
          temp.currVal=item.value;
          let pages = getCurrentPages();
          let currPage = pages[pages.length - 1]; //当前页面
          currPage.setData({
            temp: temp
          })
        }
      });
      legend.setItems(Object.values(map));
    },
  });
  chart.line().position(params.propertX + '*' + params.propertY).color('type', function (type) {
    if (type == '空气') {
      return '#00BADB'
    } else {
      return '#EB7526'
    }
  }).shape('smooth');
  chart.area().position(params.propertX + '*' + params.propertY).shape('smooth').style('type',{
    fill: function fill(type) {
      if (type == "空气") {
        return 'l(-90) 0.03:rgba(255,255,255,0.01) 1:#00BADB'
      } else {
        return 'l(-90) 0.03:rgba(255,255,255,0.01) 1:#EB7526'
      }
    },
    fillOpacity: 0.5
  }).color('type', function (type) {
    if (type == '空气') {
      return '#00BADB'
    }else{
      return '#EB7526'
    }
  });
  chart.point().position(params.propertX + '*' + params.propertY).color(params.color).style('type', {
    lineWidth: 1,
    fill: '#fff',
    stroke: function stroke(type) {
      if (type == '空气') {
        return '#00BADB'
      } else {
        return '#EB7526'
      }
    }
  });
  chart.render();
  return chart;
}

module.exports = {
  chartInit: chartInit
}