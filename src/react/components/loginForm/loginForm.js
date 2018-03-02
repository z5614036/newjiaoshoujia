import React from 'react';
import styles from './loginForm.css';
import logImg from "../../../public/images/logo.jpg";
import {reduxForReact} from "../../../utils/dataFetch";
import {bindActionCreators} from "redux";
import dataFetch from "../../../utils/dataFetch";
import * as LoginAction from "./action";
import { Form, Icon, Input, Button, Checkbox,Tooltip  } from 'antd';
const FormItem = Form.Item;

class LoginF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            loginFlag:0,
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentWillMount(){
        this.actions = bindActionCreators({reduxForReact},this.props.dispatch);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = {
                    username:values.userName,
                    password:values.password
                };
                this.setState({
                    loading:true,
                    loginFlag:0
                });
                this.actions.reduxForReact(function *(dispatch,getState) {
                    var result = yield dataFetch("/api/login",param);
                    if(result.ret===1){
                        dispatch({type:LoginAction.LoginSuccess,payload:result.datas});
                        that.setState({loading:false});
                        that.props.history.push("/main/monitor");
                        console.log()
                    }else if(result.ret===4){
                        that.setState({loading:false,loginFlag:1});
                    }
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.formLogin}>
                <div className={styles.header}>
                    <img src={logImg} className={styles.hImg}/>
                    <span className={styles.hTitle}>
                         团 雾 预 警 防 控 平 台
                    </span>
                </div>
                <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <Button type="primary" htmlType="submit" className={styles.loginFormButton} loading={this.state.loading}>
                            登陆
                        </Button>
                        <div style={{display:this.state.loginFlag>0?'block':'none'}}>
                            <Tooltip title="登录失败" >
                                <span style={{color:"red"}}>用户名密码不匹配.</span>
                            </Tooltip>
                        </div>
                    </FormItem>
                </Form>
            </div>

        );
    }
}


 const LoginForm = Form.create()(LoginF);
export default LoginForm;






