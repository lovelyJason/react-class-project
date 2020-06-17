import React from 'react'
import moment from 'moment'
import { requestWrapper } from '@util/function-jason'
import Service from '@src/service/help/faq'
import { Card } from 'antd'
import { getQueryParamsBySearch } from '@util/function-jason'
// import './index.less'

const ApiOptions = {
  getFeqInfo: {
    api: Service.getFeqInfo
  }
}

const faqInfo = {
  "id": 1,
  "title": "全麦购",
  "content": "汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。春寒赐浴华清池，温泉水滑洗凝脂。侍儿扶起娇无力，始是新承恩泽时。云鬓花颜金步摇，芙蓉帐暖度春宵。春宵苦短日高起，从此君王不早朝。承欢侍宴无闲暇，春从春游夜专夜。",
  "categoryId": 1,
  "categoryName": "二级分类",
  "categoryFullName": "一级分类/二级分类",
  "sortValue": 1,
  "updatedAt": 1546478641,
  "isOnline": 0
}

class FaqDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      faqInfo: {}
    }
    this.id = getQueryParamsBySearch(this.props.location.search, 'id')
  }
  componentDidMount() {
    this.getFeqInfo()
  }
  async getFeqInfo() {
    process.env.NODE_ENV === 'development' && process.env.mock
      ?
      this.setState({
        faqInfo
      })
      :
      void (0)
    let id = this.id
    let res = await requestWrapper(ApiOptions.getFeqInfo)(id)
    if (res) {
      let { data } = res
      if (data) {
        this.setState({
          faqInfo: data
        })
      }
    }
  }
  renderFaqInfo() {
    const { faqInfo: { title, updatedAt, content } } = this.state
    const original = '正在加载中'
    return <div className="paragraph-item">
      <h4 className="title">{title || original}</h4>
      <div className="date">{updatedAt ? moment(updatedAt * 1000).format('YYYY-MM-DD') : original}</div>
      <div className="content" dangerouslySetInnerHTML ={{ __html: content }}>
        {/* {content || original} */}
      </div>
    </div>
  }
  render() {
    return (
      <Card className="faq-detail-card">
        {this.renderFaqInfo()}
      </Card>
    )
  }
}

export default FaqDetail
