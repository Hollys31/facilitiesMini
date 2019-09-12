const formatTime = (date, sign) => {//日期格式转化
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  if (sign) {
    return [year, month, day].map(formatNumber).join('/')
  } else {
    return [year, month, day].map(formatNumber).join('-')
  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const params = url => {//获取参数
  let URL = "/pages/facility/facility?type=on&&devId=YF000100008";
  let params = URL.split("&");
  console.log(params);
}
const doHandleMonth = month => {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}
const getDay = n => {//最近几天的日期和星期
  let now = new Date();
  let nowTime = now.getTime();
  let oneDayTime = 24 * 60 * 60 * 1000;
  let dayArr = [];
  for (var i = 0; i < n; i++) {
    let obj = {};
    let ShowTime = nowTime - i * oneDayTime;
    let myDate = new Date(ShowTime);
    let year = myDate.getFullYear();
    let month = doHandleMonth(myDate.getMonth() + 1);
    let date = doHandleMonth(myDate.getDate());
    let day = year + "-" + month + "-" + date;
    obj.day = day;
    obj.showday = day.split('-')[1] + "/" + day.split('-')[2];
    let str = "日一二三四五六".charAt(myDate.getDay());
    obj.week = str;
    dayArr.unshift(obj);
  }
  return dayArr;
}
const getMonth =()=> {//获取当前月份前今年的月份
  var data = new Date();
  //获取年
  var year = data.getFullYear();
  //获取月
  var mon = data.getMonth() + 2;
  let monLen = data.getMonth()+1;
  var arry = new Array();
  for (var i = 0; i < monLen; i++) {
    mon = mon - 1;
    if (mon <= 0) {
      year = year - 1;
      mon = mon + 12;
    }
    if (mon < 10) {
      mon = "0" + mon;
    }

    arry[i] = year + "/" + mon;
  }

  return arry;
}

module.exports = {
  doHandleMonth: doHandleMonth,
  getMonth: getMonth,
  formatTime: formatTime,
  params: params,
  getDay: getDay
}
