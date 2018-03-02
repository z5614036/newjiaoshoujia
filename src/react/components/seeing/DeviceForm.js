import React from "react";
import { Input, Button, Form, Row, Col,  Select, Radio } from 'antd';
import styles from "./form.css";
import _ from "lodash";
const FormItem = Form.Item;
const {Option} =Select;
const RadioGroup = Radio.Group;
class DeviceForm extends React.Component {

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
    };
    //道路、路段联动
    roadChange = (value) => {
        /*let roadTemp = this.props.road.data;
        this.setState({ roadCode: value });*/
    };

    bayonetChange = (value) => {
        //;
        this.state.newSelect = ''; //初始化修改时，可能要改变的值
     /*   if (value !== undefined) {
            let bayonetData = this.props.bayonetList.bayonets.datas;
            for (let i = 0, len = bayonetData.length; i < len; i++) {
                if (value === bayonetData[i].site_nbr) {
                    this.props.form.setFieldsValue({
                        road_code: bayonetData[i].road_code,
                        section_code: bayonetData[i].section_code,
                        mileage: bayonetData[i].mileage,
                        metre: bayonetData[i].metre,
                        longitude: bayonetData[i].longitude,
                        latitude: bayonetData[i].latitude,
                        site_name: bayonetData[i].site_name
                    });
                }
            }
            this.state.bayonetBelong = true;
            if (this.props.title === "修改设备信息") {//添加设备的时候没有选择所在卡口，修改时又选择所在卡口的情况
                this.state.newSelect = value;
            }
        } else {
            this.props.form.setFieldsValue({
                road_code: '',
                section_code: '',
                mileage: '',
                metre: '',
                longitude: '',
                latitude: '',
                site_name: ''
            });
            this.state.bayonetBelong = false;

        }*/
    };

    periodSelect = (value) => {
    };
 /*  shouldComponentUpdate(nextProps,nextState){
       console.log(nextProps.sysRoad.sysRoad,"4141",nextProps.sysSection);
        if(!nextProps.sysRoad.sysRoad||!nextProps.sysSection.sysSection){
            return false
        }
        return true
    }*/
    render() {
        const { getFieldDecorator } = this.props.form;
        let manage = [],roadName =[],sectionName = [],vendorTypeOptions = [],miter=false;
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
                return <Option value={item.vendor_id} key={index}>{item.vendor_name}</Option>
            })
        }
        const formItemLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 },
        };
        const commentLayout = {labelCol: { span: 3 }, wrapperCol: { span: 12 }};
        if(_.isEmpty(this.props.form.getFieldsValue())){
            miter = true
        }else if(!_.isEmpty(this.props.form.getFieldsValue())&&_.isEmpty(this.props.form.getFieldsValue().section_code)){
            miter = true
        }
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
                                        {getFieldDecorator('org_code', {
                                            initialValue: "", rules: [{
                                                required: true, message: '必填!',
                                            }],
                                        })(
                                            <Select placeholder="Please select a country" size="small" style={{ display: 'inline-block', width: 130 }} >
                                                {manage}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='设备编号:'>
                                        {getFieldDecorator('device_nbr', {
                                            initialValue: "",
                                            rules: [{
                                                required: false
                                            }],
                                        })(
                                            <Input size='small' style={{ display: 'inline-block', width: 130 }}  />
                                        )}
                                    </FormItem>
                                </Col>

                                {false&&<Col span={8}>
                                    <FormItem {...formItemLayout} label='所在卡口:'>
                                        {getFieldDecorator('site_nbr', {
                                            initialValue: this.props.record === undefined ? '' : this.props.record.site_nbr + '',
                                            rules: [{
                                                required: false
                                            }],
                                        })(
                                            <Select size="small" style={{ display: 'inline-block', width: 130 }} onChange={this.bayonetChange}  allowClear>

                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>}
                            </div>

                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='道路名称:'>
                                        {getFieldDecorator('road_code', {
                                            initialValue: this.props.record === undefined ? '' : this.props.record.road_code + '',
                                            rules: [{
                                                required: true, message: '必填!',
                                            }],
                                        })(
                                            <Select placeholder="请选择" size="small" style={{ display: 'inline-block', width: 130 }} onChange={this.roadChange} >
                                                {roadName}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='路段名称:'>
                                        {getFieldDecorator('section_code', {
                                            rules: [{
                                                required: false, message: '必填!',
                                            }],
                                        })(
                                            <Select size="small" style={{ display: 'inline-block', width: 130 }} allowClear onSelect={this._sectionName}>
                                                {sectionName}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label=' 别名/公里数:'>
                                        {getFieldDecorator('mileage', {
                                            initialValue: "",
                                            rules: [{
                                                required: miter, message: '必填!',
                                            },{  pattern:/^[0-9]{1,4}$/,message:"必须数字(1-4位)"}],
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
                                            rules: [{
                                                required: false,
                                            },{  pattern:/^[0-9]{1,3}$/,message:"必须数字(1-3位)"}],
                                        })(
                                            <Input placeholder="" size='small' addonAfter="m" style={{ marginTop: 4, width: 130 }}  />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='经度:'>
                                        {getFieldDecorator('longitude', {
                                            initialValue: "", rules: [{
                                                required: false,
                                            }, {
                                                pattern: /^\d+(\.\d+)?$/,
                                                message: '数字'
                                            }],
                                        })(
                                            <Input placeholder="最多9位小数位" size='small' style={{ display: 'inline-block', width: 130 }} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='纬度:'>
                                        {getFieldDecorator('latitude', {
                                            initialValue: "", rules: [{
                                                required: false,
                                            }, {
                                                pattern: /^\d+(\.\d+)?$/,
                                                message: '数字'
                                            }],
                                        })(
                                            <Input placeholder="最多4位小数位" size='small' style={{ display: 'inline-block', width: 130 }}  />
                                        )}
                                    </FormItem>
                                </Col>
                            </div>

                            <div className="form-row">
                                        <Col span={8}>
                                            <FormItem {...formItemLayout} label='设备名称:'>
                                                {getFieldDecorator('device_name', {
                                                    initialValue: "",
                                                })(
                                                    <Input size='small' style={{ display: 'inline-block', width: 130 }}  title={"4"} />
                                                )}
                                            </FormItem>
                                        </Col>

                            </div>
                        </Row>
                    </div>
                    <div title="功能参数" className={styles.box}>
                        <Row gutter={14} style={{ width: '100%' }}>
                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测降雨(积水):'>
                                        {getFieldDecorator('rain', {
                                            initialValue: "0",
                                            rules: [{
                                                required: true, message: '必填!',
                                            }]
                                        })(
                                            <RadioGroup  style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测降雪(积雪):'>
                                        {getFieldDecorator('snow', {
                                            initialValue: "1",
                                            rules: [{
                                                required: true, message: '必填!',
                                            },]
                                        })(
                                            <RadioGroup style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测大风(横风):'>
                                        {getFieldDecorator('gale', {
                                            initialValue: "1",
                                            rules: [{
                                                required: true, message: '必填!',
                                            }, {
                                                // validator: this.checkInteger,
                                            }]
                                        })(
                                            <RadioGroup style={{ display: 'inline-block', width: 140 }}>
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
                                            initialValue: "1",
                                            rules: [{
                                                required: true, message: '必填!',
                                            }, {
                                                // validator: this.checkInteger,
                                            }]
                                        })(
                                            <RadioGroup style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='是否检测结冰凝冻:'>
                                        {getFieldDecorator('frozen', {
                                            initialValue: "1",
                                            rules: [{
                                                // required: true, message: '必填!',
                                            },]
                                        })(
                                            <RadioGroup  style={{ display: 'inline-block', width: 140 }}>
                                                <Radio value={'1'}>是</Radio>
                                                <Radio value={'0'}>否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='上报周期(分钟):'>
                                        {getFieldDecorator('report_period', {
                                            initialValue: "1",
                                            rules: [{
                                                required: true, message: '必填!',
                                            }, {
                                                validator: this.checkInteger,
                                            }]
                                        })(
                                            <Select onChange={this.periodSelect} style={{ display: 'inline-block', width: 130 }} size='small'  allowClear>
                                                <Option key={'1'} value={'1'}>1 min</Option>
                                                <Option key={'10'} value={'10'}>10 min</Option>
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
                                            rules: [{
                                                required: false,
                                            }, {
                                                pattern: /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/,
                                                message: '格式不正确！'
                                            }],
                                        })(
                                            <Input size='small' style={{ display: 'inline-block', width: 130 }}  />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='端口:'>
                                        {getFieldDecorator('port', {
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
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='时间服务器ip:'>
                                        {getFieldDecorator('time_server_ip', {
                                            initialValue: ""})(
                                            <Select size="small" style={{ display: 'inline-block', width: 130 }}  allowClear>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='关联视频:'>
                                        {getFieldDecorator('video_nbr', {
                                            rules: [{
                                                required: false, message: '请选择!',
                                            }, {
                                                //validator: this.virtual_flag,
                                            }]
                                        })(
                                            <Select placeholder="" size="small" style={{ display: 'inline-block', width: 130 }}  allowClear>
                                            </Select>
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
                                            initialValue: this.props.record === undefined ? '' : this.props.record.vendor,
                                        })(
                                            <Select placeholder="Please select a country" size="small" style={{ display: 'inline-block', width: 130 }} allowClear >
                                                {vendorTypeOptions}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='厂商:'>
                                        {getFieldDecorator('construct', {
                                            initialValue: this.props.record === undefined ? '' : this.props.record.construct,
                                        })(
                                            <Select placeholder="Please select a country" size="small" style={{ display: 'inline-block', width: 130 }} allowClear >
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='品牌:'>
                                        {getFieldDecorator('model', { initialValue: this.props.record === undefined ? '' : this.props.record.model }, {
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input placeholder="" size='small' style={{ display: 'inline-block', width: 130 }}  />
                                        )}
                                    </FormItem>
                                </Col>
                            </div>

                            <div className="form-row">
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='规格:'>
                                        {getFieldDecorator('sn', { initialValue: this.props.record === undefined ? '' : this.props.record.sn }, {
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input placeholder="" size='small' style={{ display: 'inline-block', width: 130 }}  />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='序列号:'>
                                        {getFieldDecorator('spec', {
                                            initialValue: this.props.record === undefined ? '' : this.props.record.spec,
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input placeholder="" size='small' style={{ display: 'inline-block', width: 130 }} />
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
    _sectionName=(value)=>{
        this.props.form.setFieldsValue({mileage:undefined});
    }
}
export default Form.create()(DeviceForm);