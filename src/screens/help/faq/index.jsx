import React from 'react'
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router-dom'
import { Menu, Input } from 'antd'
import Service from '@src/service/help/faq.js'
import SearchIconLeft from './layout/searchBar/SearchLeftIcon'
import SearchIconRight from './layout/searchBar/SearchRightIcon'
import './index.less'
import './layout/searchBar/style/index.less'
import qs from 'querystring'
import { debounce, requestWrapper } from '@util/function-jason'
import FaqList from './list/app'
import FaqDetail from './detail/app'

const Logo = require('../../../images/全麦购logo.webp')
const loading = () => <div>loading...</div>;
// const FaqList = Loadable({ loader: () => import('./list/app'), loading })
// const FaqDetail = Loadable({ loader: () => import('./detail/app'), loading })
const NoMatch = Loadable({ loader: () => import('../../404/index'), loading });

const { SubMenu } = Menu;

const ApiOptions = {
  getFaqCategoryList: {
    api: Service.getFaqCategoryList
  },
  getSource: {
    api: Service.getFaqList
  },
}

const categoryOptions = [
  {
    "id": 2,
    "name": "新人入门",
    "isLeaf": 0,
    "children": [
      {
        "id": 3,
        "name": "入门指导",
        "isLeaf": 1,
        "children": []
      },
      {
        "id": 4,
        "name": "入门须知",
        "isLeaf": 1,
        "children": []
      }
    ]
  },
  {
    "id": 5,
    "name": "商品中心",
    "isLeaf": 0,
    "children": [
      {
        "id": 6,
        "name": "价格管理",
        "isLeaf": 1,
        "children": []
      }
    ]
  }
]

let unlistenBack

class HelpApplication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      // title: undefined,
      categoryOptions: [],
      // categoryId: undefined,
      selectedKey: undefined,
      categoryName: '',
      openKeys: [],
      title: '',
      tempTitle: '',
      source: 1,    // 1: menu, 2: search
    }
    this.pageSize = 5
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.onOpenChange = this.onOpenChange.bind(this)
    this.onSearch = debounce(this.onSearch.bind(this))
    this.onChange = this.onChange.bind(this)
    this.indexRef = React.createRef()
    // this.wd = getQueryParamsBySearch(this.props.location.search, 'wd')
  }
  async componentDidMount() {
    // console.log(111)
    await this.getFaqCategoryList()
    // this.getListPageSource(+this.state.selectedKey)
    // console.log(this.props)
    unlistenBack = this.props.history.listen(location => {
      // console.log(location)
      if(location.pathname === '/help/detail') {
      //  this.props.history.push({obj})
        window.sessionStorage.setItem('help_title', this.state.title)
      }
    })
  }
  componentWillUnmount() {
    unlistenBack()
  }
  async handleMenuClick(obj) {
    if(this.state.source !== 1) {
      this.setState({
        source: 1
      })
    }
    let { key } = obj
    await this.setState({
      categoryId: +key,
      selectedKey: key,
      categoryName: obj.item.props.children
    })
    if (this.props.location.pathname === '/help') {   // 列表
      this.indexRef.current.setState({ currentPage: 1 }, () => {
        this.indexRef.current.getSource(+key)
      })
    } else {
      let obj = {
        pathname: '/help'
      }
      this.props.history.push({ ...obj, query: { fromDetail: true } })
      // 请求列表数据
    }
  }
  async onSearch() {
    await this.setState({
      title: this.state.tempTitle
    })
    if(this.state.source !== 2) {
      this.setState({
        source: 2
      })
    }
    if (this.props.location && this.props.location.pathname.indexOf('detail') !== -1) {
      // this.props.history.push(`/help?wd=${this.state.title}`)
      this.props.history.push({
        pathname: '/help',
        // search: `?wd=${this.state.title}`,
        query: { fromDetail: true }
      })
      this.setState({
        categoryId: null,
        selectedKey: null
      })
      // 调列表页方法请求数据???
    } else {
      // 清除已选菜单
      this.setState({
        categoryId: null,
        selectedKey: null
      })
      this.indexRef.current ? 
      this.indexRef.current.setState({ currentPage: 1 }, () => {
        this.indexRef.current.getSource(null, this.state.title)
      })
      :
      void(0)
    }
  }
  onChange(e) {
    let currentSearchStr = this.props.location.search.substring(1)
    let tempObj = qs.parse(currentSearchStr)
    tempObj.wd = e.target.value
    // let search = qs.stringify(tempObj)
    // 加搜索词加入url
    // if (tempObj.wd) {
    //   this.props.history.push({ search })
    // } else {
    //   this.props.history.push({ search: null })
    // }
    this.setState({
      tempTitle: e.target.value
    })
  }
  filterEmptyMenu(data) {
    return data.filter(val => {
      if(val.children && val.children.length >= 1 && val.faqCount >= 1) {
        let arr = []
        val.children.map(val1 => {
          if(val1.faqCount >= 1) {
            arr.push(val1)
            val.children = arr
          }
          return true
        })
        return true
      }
      return false
    })
  }
  async getFaqCategoryList() {
    process.env.NODE_ENV === 'development' && process.env.mock
      ?
      this.setState({
        categoryOptions,
        selectedKey: '3',
        openKey: '2'
      })
      :
      void (0)
    let req = { parentId: 1, distance: 0, faqCountFlag: 1 }
    let res = await requestWrapper(ApiOptions.getFaqCategoryList)(req)
    if (res) {
      let { data } = res
      if (data) {
        // let tempArr = data ? data.list : []
        let categoryOptions = data.list
        categoryOptions = this.filterEmptyMenu(categoryOptions)
        let openKeys = categoryOptions.length >= 1 ? [categoryOptions[0].id.toString()] : null
        let selectedKey = categoryOptions.length >= 1 && categoryOptions[0].children.length >= 1 ? categoryOptions[0].children[0].id.toString() : null
        let categoryName = categoryOptions.length >= 1 && categoryOptions[0].children.length >= 1 ? categoryOptions[0].children[0].name : null
        await this.setState({
          categoryOptions: categoryOptions,
          total: data.total,
          openKeys,
          selectedKey,
          categoryName
        })
      }
    }
  }

  onOpenChange(openKeys) {
    this.setState({
      openKeys
    })
  }
  renderSubmenus() {
    return this.state.categoryOptions.map((val, index) => {
      return <SubMenu
        key={val.id}
        title={
          <span>
            {/* <Icon type="setting" /> */}
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
  render() {
    const { selectedKey, categoryName, openKeys, tempTitle, title, source } = this.state
    return (
      <div className="help-application-container">
        <header>
          <img src={Logo} alt="logo"/>
          <div className="quanmaigou">全麦购开放平台</div>
          <div className="help-center">帮助中心</div>
        </header>
        <div className="search-area">
          <SearchIconLeft />
          <div className="searh-bar-wrapper">
            <Input placeholder="有什么问题搜索一下" value={tempTitle} onChange={this.onChange} />
            <i onClick={this.onSearch} className="btn-search">搜索</i>
          </div>
          <SearchIconRight />
        </div>
        <div className="faq-container">
          <aside className="sider">
            <Menu
              style={{ width: '100%' }}
              openKeys={openKeys}
              selectedKeys={[selectedKey]}
              mode="inline"
              theme="light"
              onClick={this.handleMenuClick}
              onOpenChange={this.onOpenChange}
            >
              {this.renderSubmenus()}
            </Menu>
          </aside>
          {/* <Route ref={(ref) => this.indexRef = ref} path="/help" exact component={FaqList} /> */}
          {
            ((selectedKey && source === 1) || source === 2) && (
              <Switch>
                <Route path="/help" exact render={props => { return <FaqList ref={this.indexRef} {...props} title={title} categoryId={selectedKey} categoryName={categoryName} source={source} /> }} />
                <Route path="/help/detail" exact component={FaqDetail} />
                {/* 受限于接口返回数据,无数据则不加载 */}
                <Route component={NoMatch} />
              </Switch>
            )
          }
        </div>
      </div >
    )
  }
}

export default HelpApplication
