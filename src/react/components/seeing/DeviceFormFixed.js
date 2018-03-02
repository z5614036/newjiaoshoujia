/**
 * Created by dell on 2017/11/29.
 */
import React from "react";
import { Input, Button, Form, Row, Col,  Select, Radio } from 'antd';
import styles from "./form.css";
import _ from "lodash";

const FormItem = Form.Item;
const {Option} =Select;
const RadioGroup = Radio.Group;
class DeviceFormFixed extends React.Component {

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
    checkInteger = (rule, value, callback) => {
        let re = new RegExp('^[0-9]*[1-9][0-9]*$');
        if (value !== '') {
            if (re.test(value)) callback();
            else callback('填写数字');
        } else {
            callback();
        }
    }
    //道路、路段联动
    roadChange = (value) => {
   /*     let roadTemp = this.props.road.data;
        this.setState({ roadCode: value });*/
    }

    bayonetChange = (value) => {
        //;

    }

    periodSelect = (value) => {
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        let target = this.props.target;
        let viewMeteorologyDetail = false;
        let miter = false;
        let manage = [],roadName =[],sectionName = [],vendorTypeOptions = [];
        if(this.props.sysOrg.sysOrg&&Array.isArray(this.props.sysOrg.sysOrg)) {
            manage =  this.props.sysOrg.sysOrg.map((item,index)=>{
                return <Option value={item.org_code} key={index}>{item.org_name}</Option>
            })
        }
        if(this.props.sysRoad.sysRoad&&Array.isArray(this.props.sysRoad.sysRoad)) {
            roadName =  this.props.sysRoad.sysRoad.map((item,index)=>{
                return <Option value={item.road_code} key={index}>{item.road_name}</Option>
            })
        }
        if(this.props.sysSection.sysSection&&Array.isArray(this.props.sysSection.sysSection)){
            sectionName = this.props.sysSection.sysSection.map((item,index)=>{
                return <Option value={item.section_code} key={index}>{item.section_name}</Option>
            })
        }
        if(this.props.vendor.vendor&&Array.isArray(this.props.vendor.vendor)){
            vendorTypeOptions = this.props.vendor.vendor.map((item,index)=>{
                return <Option value={item.vendor_id.toString()} key={index}>{item.vendor_name}</Option>
            })
        }
        if(_.isEmpty(this.props.form.getFieldsValue())&&_.isEmpty(target.section_code)){
            miter = true
        }else if(!_.isEmpty(this.props.form.getFieldsValue())&&_.isEmpty(this.props.form.getFieldsValue().section_code)){
             miter = true
        }

        const formItemLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 },
        };
        const commentLayout = {labelCol: { span: 3 }, wrapperCol: { span: 12 }};
        return (
            <div>
                <Form
                    onSubmit={this.handleAddSbumit}
                    style={{ padding: '10px 0 0 0px' }}>
                    <div title="基本信息" className={styles.box}>
                        <Row gutter={14} style={{ width: '100%' }}>
                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='管辖单位:'>
                                        {getFieldDecorator('org_code',{
                                            initialValue: _.isEmpty(target)?"":target.org_code,
                                            rules: [{
                                                required: true, message: '必填!',
                                            }],
                                        })(
                                            <Select placeholder="Please select a country" size="small" style={{ display: 'inline-block', width: 130 }} disabled={viewMeteorologyDetail}>
                                                        {manage}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='设备编号:'>
                                        {getFieldDecorator('device_nbr', {
                                            initialValue: _.isEmpty(target)?"":target.device_nbr,
                                            rules: [{
                                                required: false
                                            }],
                                        })(
                                            <Input size='small' style={{ display: 'inline-block', width: 130 }}  />
                                        )}
                                    </FormItem>
                                </Col>
                            </div>

                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='道路名称:'>
                                        {getFieldDecorator('road_code', {
                                            initialValue: _.isEmpty(target)?"":target.road_code,
                                            rules: [{
                                                required: true, message: '必填!',
                                            }],
                                        })(
                                            <Select placeholder="Please select a country" size="small" allowClear={true} style={{ display: 'inline-block', width: 130 }} onChange={this.roadChange} disabled={viewMeteorologyDetail || this.state.bayonetBelong}>
                                                {roadName}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='路段名称:'>
                                        {getFieldDecorator('section_code', {
                                            initialValue: _.isEmpty(target)?"":target.section_code,
                                            rules: [{
                                                required: false, message: '必填!',
                                            }],
                                        })(
                                            <Select size="small" allowClear style={{ display: 'inline-block', width: 130 }} onSelect={this._onSelect}>
                                                {sectionName}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label=' 别名/公里数:'>
                                        {getFieldDecorator('mileage', {
                                            initialValue: _.isEmpty(target)?"":target.mileage,
                                            rules: [{
                                                required: miter, message: '必填!',
                                            }],
                                        })(
                                            <Input placeholder="" size='small' style={{ display: 'inline-block', width: 130 }} disabled={!miter} />
                                        )}
                                    </FormItem>
                                </Col>
                            </div>

                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='米数:'>
                                        {getFieldDecorator('metre', {
                                            initialValue:  _.isEmpty(target)?"":target.metre,
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input placeholder="" size='small' addonAfter="m" style={{ marginTop: 4, width: 130 }} disabled={viewMeteorologyDetail || this.state.bayonetBelong} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='经度:'>
                                        {getFieldDecorator('longitude', {
                                            initialValue: _.isEmpty(target)?"":target.longitude,
                                            rules: [{
                                                required: false,
                                            }, {
                                                pattern: /^\d+(\.\d+)?$/,
                                                message: '数字'
                                            }],
                                        })(
                                            <Input placeholder="最多4位小数位" size='small' style={{ display: 'inline-block', width: 130 }} disabled={viewMeteorologyDetail || this.state.bayonetBelong} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='纬度:'>
                                        {getFieldDecorator('latitude', {
                                            initialValue: _.isEmpty(target)?"":target.latitude, rules: [{
                                                required: false,
                                            }, {
                                                pattern: /^\d+(\.\d+)?$/,
                                                message: '数字'
                                            }],
                                        })(
                                            <Input placeholder="最多4位小数位" size='small' style={{ display: 'inline-block', width: 130 }} disabled={viewMeteorologyDetail || this.state.bayonetBelong} />
                                        )}
                                    </FormItem>
                                </Col>
                            </div>

                            <div className="form-row">
                                {
                                    viewMeteorologyDetail === true ?
                                        <Col span={8}>
                                            <FormItem {...formItemLayout} label='设备名称:'>

                                                {getFieldDecorator('device_name', {
                                                    initialValue: _.isEmpty(target)?"":target.device_name,

                                                })(
                                                    <Input size='small' style={{ display: 'inline-block', width: 130 }}  title={"4"} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        : null}
                            </div>
                        </Row>
                    </div>
                    <div title="功能参数" className={styles.box}>
                        <Row gutter={14} style={{ width: '100%' }}>
                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测降雨(积水):'>
                                        {getFieldDecorator('rain', {
                                            initialValue: _.isEmpty(target)?"":target.rain,
                                            rules: [{
                                                required: true, message: '必填!',
                                            }]
                                        })(
                                            <RadioGroup disabled={viewMeteorologyDetail} style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测降雪(积雪):'>
                                        {getFieldDecorator('snow', {
                                            initialValue: _.isEmpty(target)?"":target.snow,
                                            rules: [{
                                                required: true, message: '必填!',
                                            },]
                                        })(
                                            <RadioGroup disabled={viewMeteorologyDetail} style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测大风(横风):'>
                                        {getFieldDecorator('gale', {
                                            initialValue: _.isEmpty(target)?"":target.gale,
                                            rules: [{
                                                required: true, message: '必填!',
                                            }, {
                                                // validator: this.checkInteger,
                                            }]
                                        })(
                                            <RadioGroup disabled={viewMeteorologyDetail} style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                            </div>

                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测温度异常:'>
                                        {getFieldDecorator('temperature', {
                                            initialValue: _.isEmpty(target)?"":target.temperature,
                                            rules: [{
                                                required: true, message: '必填!',
                                            }, {
                                                // validator: this.checkInteger,
                                            }]
                                        })(
                                            <RadioGroup disabled={viewMeteorologyDetail} style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测结冰凝冻:'>
                                        {getFieldDecorator('frozen', {
                                            initialValue: _.isEmpty(target)?"":target.frozen,
                                            rules: [{
                                                // required: true, message: '必填!',
                                            },]
                                        })(
                                            <RadioGroup disabled={viewMeteorologyDetail} style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='上报周期(分钟):'>
                                        {getFieldDecorator('report_period', {
                                            initialValue: _.isEmpty(target)?"":target.report_period.toString(),
                                            rules: [{
                                                required: true, message: '必填!',
                                            }, {
                                                validator: this.checkInteger,
                                            }]
                                        })(
                                            <Select onChange={this.periodSelect} style={{ display: 'inline-block', width: 130 }} size='small' disabled={viewMeteorologyDetail} allowClear>
                                                <Option value="1">1 min</Option>
                                                <Option  value="10">10 min</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </div>
                        </Row>
                    </div>
                    <div title="联网接入" className={styles.box}>
                        <Row gutter={14} style={{ width: '100%' }}>
                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='ip:'>
                                        {getFieldDecorator('ip', {
                                            initialValue: _.isEmpty(target)?"":target.ip,
                                            rules: [{
                                                required: false,
                                            }, {
                                                pattern: /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/,
                                                message: '格式不正确！'
                                            }],
                                        })(
                                            <Input size='small' style={{ display: 'inline-block', width: 130 }} disabled={viewMeteorologyDetail} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='端口:'>
                                        {getFieldDecorator('port', {
                                            initialValue: _.isEmpty(target)?"":target.port,
                                            rules: [{
                                                required: false,
                                            }, {
                                                pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                                                message: '格式不正确！'
                                            }],
                                        })(
                                            <Input placeholder="" size='small' style={{ display: 'inline-block', width: 130 }} />
                                        )}
                                    </FormItem>
                                </Col>

                            </div>
                        </Row>
                    </div>
                    <div title="其他信息" className={styles.box}>
                        <Row gutter={14} style={{ width: '100%' }}>
                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='承建商:'>
                                        {getFieldDecorator('vendor', {
                                            initialValue: _.isEmpty(target)?"":target.vendor,
                                        })(
                                            <Select placeholder="Please select a country" size="small" style={{ display: 'inline-block', width: 130 }} allowClear disabled={viewMeteorologyDetail}>
                                                {vendorTypeOptions}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='厂商:'>
                                        {getFieldDecorator('construct', {
                                            initialValue: _.isEmpty(target)?"":target.construct,
                                        })(
                                            <Select placeholder="Please select a country" size="small" style={{ display: 'inline-block', width: 130 }} allowClear disabled={viewMeteorologyDetail}>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='品牌:'>
                                        {getFieldDecorator('model', {
                                            initialValue: _.isEmpty(target)?"":target.model,
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input placeholder="" size='small' style={{ display: 'inline-block', width: 130 }} disabled={viewMeteorologyDetail} />
                                        )}
                                    </FormItem>
                                </Col>
                            </div>

                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='规格:'>
                                        {getFieldDecorator('sn', {
                                            initialValue: _.isEmpty(target)?"":target.model,
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input placeholder="" size='small' style={{ display: 'inline-block', width: 130 }} disabled={viewMeteorologyDetail} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='序列号:'>
                                        {getFieldDecorator('spec', {
                                            initialValue: _.isEmpty(target)?"":target.spec,
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input placeholder="" size='small' style={{ display: 'inline-block', width: 130 }} disabled={viewMeteorologyDetail} />
                                        )}
                                    </FormItem>
                                </Col>
                            </div>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
    _onSelect=(value)=>{
        this.props.form.setFieldsValue({mileage:undefined});
    }
}
export default Form.create()(DeviceFormFixed);