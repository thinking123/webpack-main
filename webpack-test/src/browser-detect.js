/**
 * Zops only support chrome version > 61
 */
navigator.sayswho = (function () {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
      ) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return 'IE ' + (tem[1] || '')
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
  return M.join(' ')
})()
//document.getElementById('printVer').innerHTML=navigator.sayswho
var str = navigator.sayswho
var browser = str.substring(0, str.indexOf(' '))
var version = str.substring(str.indexOf(' '))
version = version.trim()
version = parseInt(version)
console.log(str, 'str')
console.log(browser)
console.log(version)

if (
  browser == 'Chrome' &&
  version < 61
  // (browser == 'Firefox' && version < 53) ||
  // (browser == 'Safari' && version < 5) ||
  // (browser == 'IE' && version < 11) ||
  // (browser == 'Opera' && version < 52)
) {
  alert('只支持Chrome 版本大于61')
}
