import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import  "./index.css";
import {Button} from "antd";
class App extends React.PureComponent{
            // 构造
              constructor(props) {
                super(props);
                // 初始状态
                this.state = {};
              }
                render(){
                    let {main}  = this.props;
                    return <div className="totalAll">
                        <Button>你好</Button>
                            <div className="footer">

                            </div>
                    </div>
                }
    _onClick = ()=>{
        this.props.dispatch(push("/main"))
    }
}


export default connect(null)(App);