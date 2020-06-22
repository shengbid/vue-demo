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
  phoneReg: /^1[3|4|5|6|7|8][0-9]{9}$/
}