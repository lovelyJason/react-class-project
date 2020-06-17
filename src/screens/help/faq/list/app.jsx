import React, { Fragment } from 'react'
import moment from 'moment'
import { Card, Pagination, Menu, Icon, Empty } from 'antd'
import { requestWrapper } from '@util/function-jason'
import Service from '@src/service/help/faq'
import { getQueryParamsBySearch } from '@util/function-jason'

const { SubMenu } = Menu;

const ApiOptions = {
  getSource: {
    api: Service.getFaqList
  }
}

const dataSource = [
  {
    "id": 1,
    "title": "全麦购",
    "categoryId": 1,
    "categoryName": "二级分类",
    "categoryFullName": "一级分类/二级分类",
    "sortValue": 1,
    "updatedAt": 1546478641,
    "isOnline": 0
  },
  {
    "id": 2,
    "title": "全麦购",
    "categoryId": 1,
    "categoryName": "二级分类",
    "categoryFullName": "一级分类/二级分类",
    "sortValue": 1,
    "updatedAt": 1546478641,
    "isOnline": 0
  },
  {
    "id": 3,
    "title": "全麦购",
    "categoryId": 1,
    "categoryName": "二级分类",
    "categoryFullName": "一级分类/二级分类",
    "sortValue": 1,
    "updatedAt": 1546478641,
    "isOnline": 0
  },
  {
    "id": 4,
    "title": "全麦购",
    "categoryId": 1,
    "categoryName": "二级分类",
    "categoryFullName": "一级分类/二级分类",
    "sortValue": 1,
    "updatedAt": 1546478641,
    "isOnline": 0
  },
  {
    "id": 5,
    "title": "全麦购",
    "categoryId": 1,
    "categoryName": "二级分类",
    "categoryFullName": "一级分类/二级分类",
    "sortValue": 1,
    "updatedAt": 1546478641,
    "isOnline": 0
  }
]

class Faq extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      dataSource: [],
      total: 0,
      categoryOptions: [],
      categoryId: undefined
    }
    this.pageSize = 5
    this.onPageChange = this.onPageChange.bind(this)
    this.wd = getQueryParamsBySearch(this.props.location.search, 'wd')
  }
  componentDidMount() {
    // 初始化详情页调整而来的状态
    // if(this.props.categoryId && this.wd) {
    //   this.getSource(+this.props.categoryId, this.wd)
    // }
    let { query: { fromDetail } = {} } = this.props.location
    // console.log(this.props)
    if (fromDetail) {
      let { source, title } = this.props
      if (source === 1) {    // 区分点击菜单还是搜索
        this.getSource(+this.props.categoryId)
      } else if (source === 2) {
        this.getSource(null, title )
      }
    } else {
      if(window.sessionStorage.getItem('help_title')) {
        this.getSource(null ,window.sessionStorage.getItem('help_title'))
        window.sessionStorage.removeItem('help_title')
        // 去往详情再返回时取不到值点击浏览器后退按钮
      } else {
        this.getSource(+this.props.categoryId)
      }

    }

  }
  // componentDidUpdate(nextProps) {
  //   let { categoryId } = nextProps

  // }
  // async componentWillUpdate(nextProps) {
  //   let search = this.props.location.search
  //   let title
  //   if (search) {
  //     title = getQueryParamsBySearch(search, 'wd')
  //   }
  //   console.log(nextProps.categoryId, this.state.categoryId)
  //   console.log('------')
  //   if (nextProps.categoryId !== this.state.categoryId) {
  //     console.log('come in')
  //     await this.setState({
  //       categoryId: nextProps.categoryId,     // 此处有坑,异步队列的关系此处回调不会执行
  //     })
  //     this.getSource(+nextProps.categoryId, title)
  //   }
  // }

  async getSource(categoryId, title) {
    categoryId = categoryId || undefined
    process.env.NODE_ENV === 'development' && process.env.mock
      ?
      this.setState({
        total: 50,
        dataSource
      })
      :
      void (0)
    // this.setState({
    //   dataSource: [],
    //   total: 0
    // })
    let req = { categoryId, isOnline: 0, pageNumber: this.state.currentPage, pageSize: this.pageSize, title: title || undefined }
    let res = await requestWrapper(ApiOptions.getSource)(req)
    if (res) {
      let { data } = res
      if (data) {
        this.setState({
          dataSource: data.list,
          total: data.total
        })
      }
    }
  }
  onPageChange(page) {
    let { source, categoryId, title } = this.props
    this.setState({ currentPage: page }, () => {
      if (source === 1) {
        this.getSource(+categoryId)
      } else {
        this.getSource(null, title)
      }
    })
  }
  toDetail(id) {
    let wd
    if(this.props.title) {
      wd = `&wd=${this.props.title}`
    } else {
      wd = ''
    }
    this.props.history.push({
      pathname: '/help/detail',
      search: `?id=${id}${wd}`
    })
    // this.props.history.push(`/help/detail?id=${id}`)
  }
  renderSubmenus() {
    return this.state.categoryOptions.map((val, index) => {
      return <SubMenu
        key={val.id}
        title={
          <span>
            <Icon type="setting" />
            <span>{val.name}</span>
          </span>
        }
      >
        {
          val.children && val.children.map((val1, index) => {
            return <Menu.Item key={val1.id}>{val1.name}</Menu.Item>
          })
        }
      </SubMenu>
    })
  }
  // highLightTitle(dataSource) {
  //   let keyword = this.props.title
  //   var reg = new RegExp(keyword, 'g')
  //   return dataSource.map(val => {
  //     let title = `<span style="color: #1E6CFF">${keyword}</span>`
  //     val.title = val.title.replace(reg, title)
  //     return val
  //   })
  // }
  warpTag(content, keyword, tagName) {
    const a = content.toLowerCase();
    const b = keyword.toLowerCase();

    const indexof = a.indexOf(b);
    const c = indexof > -1 ? content.substr(indexof, keyword.length) : '';
    const val = `<${tagName} style="color:#1E6CFF;">${c}</${tagName}>`;
    const regS = new RegExp(keyword, 'gi');
    return content.replace(regS, val);
}
  renderDataSource() {
    let { dataSource, total, currentPage } = this.state
    const { title, source } = this.props
    // if(source === 2) {
    //   // dataSource = this.highLightTitle(dataSource)
    //   console.log(this.highLightTitle(dataSource))
    // }
    // console.log(dataSource)
    return dataSource && dataSource.length >= 1 ? <Fragment>
      {
        dataSource.map((val) => {
          return <div className="faq-item" key={val.id}>
            <div className="content">
              <ul>
                <li>
                  {
                    source === 1
                      ?
                      <p onClick={this.toDetail.bind(this, val.id)} className="content-title">{val.title}</p>
                      :
                      this.props.title
                      ?
                      <p onClick={this.toDetail.bind(this, val.id)} className="content-title" dangerouslySetInnerHTML={{ __html: this.warpTag(val.title, this.props.title, "span")}}></p>
                      :
                      <p onClick={this.toDetail.bind(this, val.id)} className="content-title">{val.title}</p>
                  }
                  <p>{val.updatedAt ? moment(val.updatedAt * 1000).format('YYYY-MM-DD') : '数据获取失败'}</p>
                </li>

              </ul>
            </div>
          </div>
        })
      }
      <Pagination
        defaultPageSize={5}
        current={currentPage}
        total={total}
        pageSize={this.pageSize}
        onChange={this.onPageChange}
      />
    </Fragment>
      :
      source === 1
        ?
        <Empty />
        :
        <Fragment>
          <div className="search-result-desc" >搜索“{title}”的相关结果，共{total}条</div>
          <div className="empty-wrapper">
            <div>
              <img src={require(`./empty.webp`)} alt="" />
              <span>抱歉，搜索结果为空，请更换关键词</span>
            </div>
          </div>
        </Fragment>
  }
  render() {
    // let parentState = { setDataSource: this.setDataSource }
    const { total } = this.state
    const { categoryId, categoryName, source, title } = this.props
    return (
      <Card className="faq-list-card" >
        <div className="faq-list-container">
          {
            categoryId && <Fragment>
              <h4 className="title">{categoryId ? categoryName : ''}</h4>
              <div className="line"></div>
            </Fragment>
          }
          {
            (source === 2 && total !== 0) && <div className="search-result-desc">
              搜索“{title}”的相关结果，共{total}条
            </div>
          }
          {this.renderDataSource()}
        </div>
      </Card>
    )
  }
}

export default Faq
