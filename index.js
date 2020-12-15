//第一个参数是被克隆的对象，第二个参数是需要克隆的属性列表
export function cloneOwn() {
  var obj = arguments[0];
  if (typeof obj === 'undefined' || obj === null)
      return {};
  if (typeof obj !== 'object')
      return obj;
  //第二个参数是属性名称列表，就采用该列表进行刷选
  //否则就克隆所有属性
  var attrs = arguments[1];
  var enable_spec_attr = true;
  if (!(attrs instanceof Array)) {
      //console.log(attrs);
      attrs = obj;
      enable_spec_attr = false;
  }
  var result = {};
  var i;
  for (i in attrs) {
      attr = enable_spec_attr? attrs[i]: i;
      //console.log(attr);
      if (obj.hasOwnProperty(attr)) {
          if (obj[attr] instanceof Array) {
              result[attr] = cloneArray(obj[attr]);
          }
          else if (typeof obj[attr] === 'object') {
              result[attr] = cloneOwn(obj[attr]);
          } else {
              result[attr] = obj[attr];
          }
      }
  }
  return result;
}
//克隆数组
export function cloneArray(array) {
  if (typeof array === 'undefined' || array === null)
    return [];
  if (!(array instanceof Array))
    return [];
  result = [];
  var i;
  for(i in array) {
    if (typeof array[i] !== 'object') {
      result[i] = array[i];
      continue;
    }
    //clone object
    result[i] = cloneOwn(array[i]);
  }
  return result;
}

export function formatDate(cellValue) {
  if (cellValue == null || cellValue == "") return "";
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}
