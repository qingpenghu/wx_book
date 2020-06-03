const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const decodeUrl =  utftext => { // utf-8解码
  var utftext = utftext.split("http")[1]
  utftext = "http" + utftext
  var string = decodeURIComponent(utftext)
  return string;
}

module.exports = {
  formatTime: formatTime,
  decodeUrl: decodeUrl
}
