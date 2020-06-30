export default {
  // 限制只能输入数字(可以输入两位小数点)
  limitInputPointNumber(val) {
    if (val === 0 || val === "0" || val === "" || val === undefined) {
      return "";
    } else {
      let value = null;
      value = val.replace(/[^\d.]/g, ""); // 清除“数字”和“.”以外的字符
      value = value.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的
      value = value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 只能输入两个小数
      return value;
    }
  },

  handleRouteToArray(route) {
    const matchs = route.path.split('/')
    matchs.shift()
    let newMatch = []
    matchs.map((item, i) => {
      if (matchs[i - 1]) {
        item = newMatch[i - 1] + '/' + item
      }
      newMatch.push(item)
    })
    newMatch = newMatch.map(item => {
      return `/${item}`
    })
    return newMatch
  },

  //  密码长度8位以上，须包含大写、小写、数字、特殊符号中的任意3种
  testPassWord: function (str) {
    var rC = {
      lW: '[a-z]',
      uW: '[A-Z]',
      nW: '[0-9]',
      sW: '[\\u0020-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E]'
    }
    function Reg (str, rStr) {
      var reg = new RegExp(rStr)
      if (reg.test(str)) return true
      else return false
    }
    if (str.length < 8) {
      return false
    } else {
      var tR = {
        l: Reg(str, rC.lW),
        u: Reg(str, rC.uW),
        n: Reg(str, rC.nW),
        s: Reg(str, rC.sW)
      }
      if ((tR.l && tR.u && tR.n) || (tR.l && tR.u && tR.s) || (tR.s && tR.u && tR.n) || (tR.s && tR.l && tR.n)) {
        // document.title = "密码符合要求"
        return true
      } else {
        return false
      }
    }
  },

  // 密码验证8-30位任意字符
  pwdReg: /^([0-9a-zA-Z]|(?:&)|(?:~)|(?:!)|(?:@)|(?:#)|(?:\$)|(?:%)|(?:\^)|(?:\*)){8,30}$/,

  // 电话号码验证
  phoneReg: /^1[3|4|5|6|7|8][0-9]{9}$/,

  // 格式化金钱
  formatUSD (val, currency) {
    if (val === '' || val === '--' || val === undefined) {
      return '--'
    }
    // 先判断数据是否有小数点
    let newVal = String(Number(val).toFixed(2))
    // 将科学计数转为正常的字符串显示
    if (newVal.includes('e+')) {
      newVal = Number(newVal).toLocaleString()
      newVal = this.unFormatAmount(newVal)
    }
    let dotIdx = newVal.lastIndexOf('.')
    let dotVal = '.00' // 保留小数点后面的数据
    if (dotIdx >= 0) {
      dotVal = newVal.substr(dotIdx, newVal.length)
      newVal = newVal.slice(0, dotIdx)
    }

    let len = newVal.length
    let arr = []
    let lastIndex = null
    while (len > 0) {
      lastIndex = len
      len -= 3
      arr.unshift(newVal.substring(len, lastIndex))
    }
    val = arr.join(',')

    if (currency) {
      newVal = `${currency} ${val}${dotVal}`
    } else {
      // newVal = `$ ${val}${dotVal}`
      newVal = `￥ ${val}${dotVal}` // 默认人民币
    }
    return newVal
  },

  // 格式化金额数字，不包含小数点，金额符等 输入整数
  formatAmount (val) {
    if (val === '' || val === '--' || val === undefined) {
      return '--'
    }
    if (val === 0 || val === '0') {
      return 0
    }
    // 先判断数据是否有小数点
    let newVal = String(val)
    let dotIdx = newVal.lastIndexOf('.')
    let dotLength = 0
    if (newVal.split('.').length > 1) {
      dotLength = newVal.split('.')[1].length
    }
    let dotVal = '' // 保留小数点后面的数据
    if (dotIdx >= 0) {
      newVal = String(Number(val).toFixed(5))
      dotVal = newVal.substr(dotIdx, dotLength + 1)
      newVal = newVal.slice(0, dotIdx)
    }
    let len = newVal.length
    let arr = []
    let lastIndex = null
    while (len > 0) {
      lastIndex = len
      len -= 3
      arr.unshift(newVal.substring(len, lastIndex))
    }
    val = arr.join(',')
    if (dotVal.length < 2) {
      dotVal = ''
    }
    return val + dotVal
  },

  // 判断数据是否为空
  isEmptyVal (val) {
    if (val === undefined || val === '') {
      return '--'
    } else {
      return val
    }
  },

    // 格式化年月日   type: 中国显示方式(ch)及拼接的方式
  // 注: 只有在接口传参时才需要中国的显示方式,其它为美式
  formatYMD (now, type='ch') {
    if (!now || now === 'null' || now === '--' || now === undefined) {
      return '--'
    }
    if (Number(now)) {
      now = new Date(now)
    }
    // 兼容IE浏览器 ， YY-MM-DD 格式
    if (typeof now === 'string' && now.includes('-')) {
      now = this.NewDate(now)
    }
    if (now) {
      let year = ''
      let month = ''
      let date = ''
      // 这里的8位用于返回如 20180423 这样的格式
      if (String(now).length === 8 && String(now).indexOf('-') === -1 && String(now).indexOf('/') === -1) {
        const getNow = String(now)
        return `${getNow.substring(4, 6)}/${getNow.substring(6, 8)}/${getNow.substring(0, 4)}`
      } else {
        now = new Date(now)
        year = now.getFullYear()
        month = now.getMonth() + 1
        date = now.getDate()
      }
      if (month < 10) {
        month = `0${month}`
      }
      if (date < 10) {
        date = `0${date}`
      }
      if (type === 'ch') {
        return `${year}-${month}-${date}`
      } else if (type) {
        return `${year}${type}${month}${type}${date}`
      } else {
        return `${month}/${date}/${year}`
      }
    } else {
      return ''
    }
  },

  // 格式化时间 年，月，日，时，分，秒
  formatDate (now, type) {
    if (!now || now === 'null' || now === '--' || now === undefined) {
      return '--'
    }
    if (now) {
      now = new Date(now)
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = now.getDate()
      let hour = now.getHours()
      let minute = now.getMinutes()
      let second = now.getSeconds()
      if (month < 10) {
        month = `0${month}`
      }
      if (date < 10) {
        date = `0${date}`
      }
      if (hour < 10) {
        hour = `0${hour}`
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      if (second < 10) {
        second = `0${second}`
      }
      if (type) {
        return `${month}/${date}/${year} ${hour}:${minute}:${second}`
      } else {
        return `${month}-${date}-${year}`
      }
    } else {
      return ''
    }
  },


}