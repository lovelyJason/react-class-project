import { saveAs } from 'file-saver'
import _ from 'underscore'
import moment from 'moment'
import { message } from 'antd'

export function convertPrice(value) {
  if (typeof value !== 'number' || typeof +value !== 'number') {
    return value
  }
  if (value === undefined || value === null) {
    value = 0
  }
  let result = (+value / 100).toFixed(2)
  // if (result.split(".")[1] == "00") {
  //   result = result.split(".")[0]
  // }
  return result
}

export function transformDeductType(feeType) {
  switch (feeType) {
    case 1:
      return '普通商品'
    case 2:
      return '电影票'
    case 3:
      return '服务费'
    case 4:
      return '差异调整'
    default:
      return '未定义费用类型'
  }
}

export function transformTicketStatus(status) {   // 转换券类型
  switch (status) {
    case 0:
      return '未激活'
    case 1:
      return '激活'
    case 2:
      return '冻结'
    case 3:
      return '作废'
    default:
      return '未定义状态'
  }
}
export function transformConsultStatus(status) {
  // 转换工单状态
  switch (status) {
    case 0:
      return '全部'
    case 1:
      return '审核中'
    case 2:
      return '已完结'
    default:
      return '未定义工单状态'
  }
}
export function transformPiNameId(piNameId) {   // 转换流程名称
  switch (piNameId) {
    case 1:
      return '缴费申请'
    case 2:
      return '结算差异调整'
    case 3:
      return '400电话费结算'
    default:
      return '未定义流程名称'
  }
}
export function transformPiStatus(piStatus) {   // 转换流程状态
  switch (piStatus) {
    case 9999:
      return '全部'
    case 0:
      return '审批中'
    case 1:
      return '已完结'
    case 2:
      return '已关闭'
    default:
      return '未定义流程状态'
  }
}
export function transformTicketType(ticketType) {   // 转换券类型
  switch (ticketType) {
    case 1:
      return '次卡'
    case 2:
      return '储值卡'
    case 3:
      return '品类卡'
    case 4:
      return 'VIP卡'
    case 5:
      return '礼包卡'
    default:
      return '未定义券类型'
  }
}
export function transformTicketCardType(ticketCardType) {
  switch (ticketCardType) {
    case 0:
      return '旧次卡'
    case 1:
      return 'A类'
    case 2:
      return 'B类'
    case 3:
      return 'C类'
    default:
      return '未定义券类型'
  }
}
export function transformDeliverType(deliverType) {   // 发货类型
  switch (deliverType) {
    case 0:
      return '线下发货'
    case 1:
      return '自定义码'
    case 2:
      return '采购码'
    case 3:
      return '电影'
    case 4:
      return '蜂助手油卡'
    case 5:
      return '蜂助手话费'
    case 6:
      return '蜂助手流量'
    case 7:
      return '万里通'
    case 9:
      return '按摩椅服务'
    case 10:
      return '供应商自发货'
    case 12:
      return '品牌活动商品'
    case 13:
      return '卖座卡延期发货'
    case 14:
      return '海豚村发货'
    case 15:
      return '跃程油卡'
    case 16:
      return '欧飞话费'
    case 17:
      return '跃程油卡直充'
    case 18:
      return '跃程话费直充'
    case 19:
      return '跃程流量直充'
    case 20:
      return '门店自提'
    case 21:
      return '百果园'
    case 22:
      return '行云汇'
    case 23:
      return '第三方API发货'
    case 24:
      return '门店配送'
    case 25:
      return '爱奇艺会员供应商：思涵'
    case 26:
      return '腾讯视频会员供应商：汇昱达'
    default:
      return '未定义发货类型'
  }
}
export function transformMaterialName(materialName) {   // 发货类型
  switch (materialName) {
    case 1:
      return '企业手册'
    case 2:
      return '电影福利'
    case 3:
      return '生日福利'
    case 4:
      return '图书福利'
    case 5:
      return '团建福利'
    case 6:
      return '体检福利'
    case 7:
      return '年节福利'
    case 8:
      return '综合福利'
    case 9:
      return '福麟系统'
    case 10:
      return '卖座卡套'
    case 11:
      return '苏打卡套'
    case 12:
      return '生日卡套'
    case 13:
      return '年节折页'
    case 14:
      return '年节卡套'
    case 15:
      return '手提袋'
    default:
      return '未定义'
  }
}
export function transformOrderStatus(orderStatus) {   // 订单状态
  switch (orderStatus) {
    case 0:
      return '等待支付'
    case 1:
      return '支付成功'
    case 2:
      return '用户取消'
    case 3:
      return '订单失效'
    case 4:
      return '已发货'
    case 5:
      return '已退费'
    case 6:
      return '发货中'
    case 7:
      return '支付中'
    case 8:
      return '等待发货'
    case 9:
      return '发货失败'
    case 10:
      return '退费中'
    case 11:
      return '待确认收货'
    case 12:
      return '售后中'
    case 13:
      return '交易完成'
    case 14:
      return '交易关闭'
    case 15:
      return '商家或系统待审核'
    case 16:
      return '交易取消'
    case 9999:
      return '全部订单'
    default:
      return '未定义订单状态'
  }
}
export function transformCardOperatorBusinessType(businessType) {
  switch (businessType) {
    case 1:
      return '解冻'
    case 2:
      return '冻结'
    case 3:
      return '作废'
    case 4:
      return '延期'
    default:
      return '未定义类型'
  }
}
export function transformMaterialType(materialType) {
  switch (materialType) {
    case 1:
      return '联名'
    case 2:
      return '通用'
    default:
      return '未定义类型'
  }
}
export function priceConversion(value) {
  if (_.isNaN(+value)) {
    return ""
  }
  return (+value / 100).toFixed(2)
}
export function getClient() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}
export function requestWrapper(options) {
  const Api = options.api
  const DefaultMsg = options.defaultMsg || '请求失败'
  // const message = require('~antd/lib/message').default
  if (!Api) {
    console.error('requestWrapper Error: invaild Api option.', Api)
    return
  }
  return async (req, headers) => {
    const result = await Api(req, headers)
      .then(res => {
        return res || true
      })
      .catch(err => {
        console.error('Api Error: ', err, Api)
        // console.log(err)
        message.error(err.msg || err.message || DefaultMsg || '系统异常')
        return null
      })
    return result
  }
}
/**
 * 触发浏览器自动下载,注意api里需要接受headers,且请求里要带上{resposeType: 'blob'}
 * @param {*} data blob对象
 */
export function downloadByBlob(response, fileName = "用户数据") {
  if (!response) return
  let { type } = response.data
  if (type.includes('application/json')) {
    let reader = new FileReader()
    reader.onload = e => {
      if (e.target.readyState === 2) {
        let res = {}
        res = JSON.parse(e.target.result)
        message.error(res.msg)
      }
    }
    reader.readAsText(response.data)
    return
  }
  let filename_snippet = response.headers['content-disposition'].split(';')[1].split('=')[1]
  let filename_merged = `${fileName}_${filename_snippet}`
  var blob = new Blob([response.data])
  // var downloadElement = document.createElement('a');
  // // var downloadElement = document.getElementById('download')
  // var href = window.URL.createObjectURL(blob); //创建下载的链接
  // downloadElement.href = href;
  // downloadElement.download = filename; //下载后文件名
  // document.body.appendChild(downloadElement);
  // downloadElement.click(); //点击下载
  // document.body.removeChild(downloadElement); //下载完成移除元素
  // window.URL.revokeObjectURL(href); //释放掉blob对象
  // 火狐的安全策略可能导致无法下载
  saveAs(blob, filename_merged)
}
export function downloadByUrl(url, fileName) {
  saveAs(url, fileName)
}

export function saveFieldsValud(sesstionStoragekey, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(sesstionStoragekey, value)
}
/**
 *
 * @param {Object} instance
 * @param {Object} formInstance
 * @param {String} sesstionStoragekey
 * @param {String} datePickerName
 * @param {Object} state
 */
// 注,分页是无法保存的,点击查询必然会初始化分页
export function restoreFieldsValueAndState(instance, formCurrent, sesstionStoragekey, datePickerName, state, callback) {
  formCurrent = formCurrent ? formCurrent : instance
  let sessionStorageValue = window.sessionStorage.getItem(sesstionStoragekey)
  let formValues = sessionStorageValue ? JSON.parse(sessionStorageValue) : {}
  if (datePickerName && Array.isArray(formValues[datePickerName])) {
    let startTime = moment(formValues[datePickerName][0])
    let endTime = moment(formValues[datePickerName][1])
    formValues[datePickerName] = [startTime, endTime]
  }
  formCurrent.props.form.setFieldsValue(formValues)
  if (state) {
    instance.setState(state)
  }
}

export const getQueryParamsBySearch = function (search, query) {
  if (!search || !query) {
    if(process.env.NODE_ENV === 'development') {
      console.warn('请传入字符串search和字符串query')
    }
    return null
  }
  return new URLSearchParams(search).get(query)   // 返回的是字符串,如需赋值请自行转换
}
export function debounce(fn) {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, 300)
  }
}
