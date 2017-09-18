const regx = {
  text: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, //中文，英文大小写，数字
  name: /^[\u4e00-\u9fa5a-zA-Z]+$/, //中文，英文大小写
  companyName: /^[\u4e00-\u9fa5a-zA-Z0-9()（）]+$/, //中文，英文大小写，数字，括号
  number: /^[0-9]+$/, //数字
  postCode: /^[0-9]{6}$/, //邮编
  cardId: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, //身份证
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  mobile: /^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\d{8}$/, //移动电话
  telephone: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/, //固定电话
  fax:  /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/, //传真
  money: /^(([1-9]\d*)(\.\d+)?)$|(0\.0?([1-9]\d+))$/, //可接收正整数,正浮点数
  moneyDot2: /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/, //可接收正整数,正浮点数，两位小数
  money0Dot2: /^(([1-9]\d*)|0)(\.\d{1,2})?$/, //与money区别,金额可以为0
  department: /^[\u4e00-\u9fa5a-zA-Z0-9-]+$/ //部门: 中文、英文、数字、横杠
  //银行卡校验
}

const msg = {
  required: '必填',
  maxleng(size) {
    return `最大长度为${size}`
  },
  minleng(size) {
    return `最小长度为${size}`
  },
  text: '只允许输入中文大小写字母数字',
  name: '请输入正确的姓名',
  companyName: '请输入正确的单位名称',
  number: '请输入数字',
  postCode: '请输入正确的邮编地址',
  cardId: '请输入正确的身份证',
  email: '请输入有效的电子邮件地址',
  mobile: '请输入正确的手机号码',
  money: '请输入正确的金额',
  address: '请输入正确的地址',
  date: '请选择日期',
  telephone: '请输入正确的固定电话',
  department: '只允许输入中文、大小写字母、数字、横杠',
  fax: '请输入正确的传真号码'
}

const cb = {
  checkDate(rule, value, callback) {
    if (+value && +value > +new Date()) {
      callback(new Error('日期不能大于当前日期!'))
    } else {
      callback()
    }
  }
}

const schema = {
  required: [{ required: true, message: msg.required }],
  maxLen(size) {
    return { max: size, message: msg.maxleng(size) }
  },
  minLen(size) {
    return { min: size, message: msg.minleng(size) }
  },
  text(size) {
    return [
      {
        max: size,
        message: msg.maxleng(size)
      },
      {
        pattern: regx.text,
        message: msg.text
      }
    ]
  },
  companyName(size) {
    return [
      {
        max: size,
        message: msg.maxleng(size)
      },
      {
        pattern: regx.companyName,
        message: msg.companyName
      }
    ]
  },
  name: [{ pattern: regx.name, message: msg.name }],
  number: [{ pattern: regx.number, message: msg.number }],
  postCode: [{ pattern: regx.postCode, message: msg.postCode }],
  cardId: [{ pattern: regx.cardId, message: msg.cardId }],
  email: [{ pattern: regx.email, message: msg.email }],
  mobile: [{ pattern: regx.mobile, message: msg.mobile }],
  telephone: [{ pattern: regx.telephone, message: msg.telephone }],
  money: [{ pattern: regx.money, message: msg.money }],
  department: [{ pattern: regx.department, message: msg.department }],
  fax: [{ pattern: regx.fax, message: msg.fax }],
  address: [
    { max: 100, message: msg.maxleng(100) },
    { pattern: regx.text, message: msg.address }
  ],
  datepicker: [{ message: msg.date }, { validator: cb.checkDate }]
}

export default schema
