
import React from "react";
import { Input, Button, Form, Row, Col,  Select, Radio } from 'antd';
import styles from "./form.css";
import _ from "lodash";

const FormItem = Form.Item;
const {Option} =Select;
const RadioGroup = Radio.Group;
class ThredForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roadCode: '',
            bayonetBelong: false,
            editFlag: 0,
            addFlag: 0,
            newSelect: '' //添加设备的时候没有选择所在卡口，修改时又选择所在卡口是用
        };
    }

    componentDidMount() {
        // dispatch({type:QUERY_SYS_CODE,payload:''});
    }
    //整型数据校验func

    render() {
        const { getFieldDecorator } = this.props.form;

        let target = this.props.target;
        let viewMeteorologyDetail = false;
        let predict_level=[],road_kind=[],thred_kind=[];
        const formItemLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 },
        };
        const commentLayout = {labelCol: { span: 3 }, wrapperCol: { span: 12 }};
        console.log(this.props.sysCode,9887878666);
        if(!_.isEmpty(this.props.sysCode.dictionary)){
            predict_level = this.props.sysCode.dictionary.filter(function(item,index){
                                        if(item.code_type ==="0008"){
                                            return true;
                                        }

            });
            road_kind =  this.props.sysCode.dictionary.filter(function(item,index){
                                if(item.code_type ==="0010"){
                                                 return true;
                                }
            });
            thred_kind =   this.props.sysCode.dictionary.filter(function(item,index){
                                if(item.code_type ==="0009"){
                                               return true;
                                    }
            });
        }
        console.log(target,31313);
        return (
            <div>
                <Form
                    style={{ padding: '10px 0 0 0px' }}>
                    <div title="气象阀值" className={styles.box}>
                        <Row gutter={14} style={{ width: '100%' }}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label='阈值类型:'>
                                    {getFieldDecorator('threshold_type', {
                                        initialValue:target.threshold_type!==null?target.threshold_type+"":null,
                                        rules: [{
                                            required: true, message: '请输入阈值类型！',
                                        }],
                                    })(
                                        <Select placeholder="" size="small" style={{ display: 'inline-block', width: 130 }} allowClear onChange={this.thresholdTypeChange}>
                                            {thred_kind.map((item,index)=>{
                                                return <Option value={item.code_no} key={index}>{item.code_name}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label='道路类型:'>
                                    {getFieldDecorator('road_type', {
                                        initialValue:target.road_type!=null?target.road_type+"":null,
                                        rules: [{
                                            required: true, message: '请输入道路类型!',
                                        }, {
                                            validator: this.roadType,
                                        }],
                                    })(
                                        <Select placeholder="" size="small" style={{ display: 'inline-block', width: 130, marginTop: 4 }} allowClear>
                                            {road_kind.map((item,index)=>{
                                                return <Option value={item.code_no} key={index}>{item.code_name}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label='预警等级:'>
                                    {getFieldDecorator('level', {
                                        initialValue: target.level!=null?target.level+"":null,
                                        rules: [{
                                            required: true, message: '预警等级!',
                                        }, {
                                            validator: this.area_code,
                                        }],
                                    })(
                                        <Select placeholder="" size="small" style={{ display: 'inline-block', marginTop: 4, width: 130 }} allowClear>
                                                {predict_level.map((item,index)=>{
                                                    return <Option value={item.code_no} key={index}>{item.code_name}</Option>
                                                })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label='阈值最大值:'>
                                    {getFieldDecorator('max_value', {
                                        initialValue: target.max_value!=null?target.max_value-0:null,
                                        rules: [{
                                            required: true, message: '请输入阈值最大值!',
                                        }]
                                    })(
                                        <Input placeholder="必填" size='small' style={{ display: 'inline-block', marginTop: 4, width: 130 }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label='阈值最小值:'>
                                    {getFieldDecorator('min_value', {
                                        initialValue: target.min_value!=null?target.min_value-0:null,
                                        rules: [{
                                            required: true, message: '请输入阈值最小值!',
                                        }]
                                    })(
                                        <Input placeholder="必填" size='small' style={{ display: 'inline-block', marginTop: 4, width: 130 }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label='气象设备:'>
                                    {getFieldDecorator('meternbr', {
                                        initialValue: target.device_nbr,
                                        rules: [{
                                            required: true, message: '必填!',
                                        }],
                                    })(
                                        <Input  disabled={true}  size="small" style={{width:133}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem {...commentLayout} label='备注:'>
                                    {getFieldDecorator('ps', { initialValue: target.ps!=null? target.ps:null}, {
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <Input placeholder="" type='textarea' size='small' style={{ display: 'inline-block', marginTop: 4, width: 400 }} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
    thresholdTypeChange=()=>{

    }
}
export default Form.create()(ThredForm);