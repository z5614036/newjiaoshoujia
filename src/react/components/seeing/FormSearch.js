import React from "react";
import {Button,Form,Input,Select} from "antd";
import styles from "./form.css";
import * as Action from "./action";
import dataFetch from "../../../utils/dataFetch";
const {Item} = Form;
const {Option} = Select;
class FormSearch extends React.PureComponent{
            constructor(props){
                super(props)

            }
            handleSubmit(event){
                    event.preventDefault();
                this.props.form.validateFields((err,value)=>{
                    if(!err){

                        this.props.actions.reduxForReact(function *(dispatch,getState) {
                                var response = yield dataFetch("visibility/visibility",value);
                                 dispatch({type:Action.SeeingSuccess,payload:response.datas});
                            });
                    }

                });
            }

            render(){
                const {getFieldDecorator} = this.props.form;
                let option = [];
                if(this.props.sysOrg.sysOrg&&Array.isArray(this.props.sysOrg.sysOrg)) {
                    option =  this.props.sysOrg.sysOrg.map((item,index)=>{
                                return <Option value={item.org_code} key={index}>{item.org_name}</Option>
                    })
                }
              return   (
                        <div className={styles.formHeader}>
                            <Form layout='inline' onSubmit={this.handleSubmit.bind(this)}>
                                <Item
                                                    label="设备编号"
                                                >
                                                    {getFieldDecorator('device_nbr')(
                                                        <Input size="small" style={{width:110}}/>
                                                    )}
                                </Item>
                                <Item label="设备名称">
                                    {getFieldDecorator('device_name')(
                                        <Input size="small" style={{width:110}}/>
                                          )}
                                </Item>
                                <Item
                                    label="管辖单位"
                                >
                                    {getFieldDecorator('org_code')(
                                        <Select placeholder="请选择" style={{width:110}} size="small">
                                            {option}
                                        </Select>
                                    )}
                                </Item>
                                <Item>
                                    <Button  style={{backgroundColor:"#00924c",color:"#fff",border:"1px solid #00924c"}} htmlType="submit" size="small">查询</Button>
                                </Item>
                                          </Form>
                        </div>
                        )
            }

}
export default Form.create()(FormSearch);