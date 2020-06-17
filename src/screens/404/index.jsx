import React from "react";
import "./index.less"
import {Button} from "antd"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberStyle:"translateX(50px)",
      hintStyle:"translateX(-50px)"
    }

  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        numberStyle:"",
        hintStyle:""
      })
    },0)

  }
  goBack(){
    window.history.go(-1);
  }
  render() {
    const {numberStyle,hintStyle}=this.state;
    return (
      <section>
        <div className="No-match">
          <div className="match-number" style={{transform: numberStyle}}>
            404
          </div>
          <div className="match-hint" style={{transform: hintStyle}}>
            抱歉，你访问的页面不存在!
          </div>
          <div>
            <Button type="primary" onClick={this.goBack}>返回</Button>
          </div>
        </div>
      </section>

    )
  }
}

export default App;
