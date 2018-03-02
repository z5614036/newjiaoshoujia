import React from "react";
import {Table,Button,Modal,Popconfirm,message} from "antd";
import {reduxForReact} from "../../../utils/dataFetch";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Action from "./action";
import dataFetch from "../../../utils/dataFetch";
import ReactMixin from "react-mixin";
import DeviceFormFixed from "./DeviceFormFixed";
import tableParams from "./tableParams";
import _ from "lodash";
import {withRouter} from "react-router-dom";
import FormSearch from "./FormSearch";
import DeviceForm from "./DeviceForm";
import ThredForm from "./thredForm";
const {Column}=Table;
class Tables extends React.Component{
                    constructor(props){
                        super(props);
                        this.state={
                            visible_add:false,
                            selectedRowKeys:[],
                            selectedRows:[],
                            visible_update:false,
                            fixed_Modal:false,
                            rowData:{},
                            visible_thred:false,
                            thred_Modal:false

                        };
                    }
                    componentWillMount(){
                        this.actions = bindActionCreators({reduxForReact},this.props.dispatch);
                    }
                    orgCode=(code)=>{
                     return    _.find(this.props.sysOrg.sysOrg,function(item,index){
                                        return item.org_code ==code
                          })
                    };
                    componentDidMount(){
                        this.actions.reduxForReact(function *(dispatch,getState) {
                            if(!getState().SysOrg.sysOrg){
                                var sysOrg = yield dataFetch("sysinit/sysOrg");
                                     dispatch({type:Action.SYSORG,payload:sysOrg.datas});
                            }
                            var result = yield dataFetch("/visibility/visibility",{});
                            dispatch({type:Action.SeeingSuccess,payload:result.datas});

                            if(!getState().SysRoad.sysRoad){
                                var sysRoad = yield dataFetch("sysinit/sysRoad");
                                dispatch({type:Action.SYSROAD,payload:sysRoad.datas})
                            }
                            if(!getState().SysSection.sysSection){
                                var sysSection = yield dataFetch("sysinit/sysSection");
                                     dispatch({type:Action.SYSSECTION,payload:sysSection.datas})
                            }
                            if(!getState().Vendor.vendor){
                                        var vendor = yield dataFetch("sysinit/selectVendor");
                                              dispatch({type:Action.VENDOR,payload:vendor.datas});
                            }

                                });
                    }
                    massDelete=()=>{
                        var that = this;
                        if(_.isEmpty(this.state.selectedRowKeys))return false;
                        this.actions.reduxForReact(function *(dispatch,getState) {
                            var response = yield dataFetch("visibility/batchDeleteVisibility",{device_ids:that.state.selectedRowKeys.join(",")});
                            dispatch({type:Action.SEEINGMASSDELETE,payload:that.state.selectedRowKeys});
                        });
                    };
                    render(){
                        let loading = this.props.seeingData.loading;
                        let column = this.tableDataConfig.columns;
                        let TableData = this.props.seeingData.TableData||[];
                        let rowSelection ={
                            selections:true,
                            selectedRowKeys:this.state.selectedRowKeys||[],
                            onChange :this._onChange.bind(this),
                            hideDefaultSelections:true
                        };
                        var pagination={
                            total:TableData.length ,  /*翻页查询*/
                            activePage: 1,  /*默认显示一页*/
                            showTotal: (count) => `共 ${count} 条`,
                            pageSize:10
                        };
                        return (
                            <div style={{padding:"0 10px"}}>
                                <FormSearch sysOrg={this.props.sysOrg} actions={this.actions}/>
                                <div style={{marginBottom:8}}>
                                    <Button type="primary" size="small" style={{backgroundColor:"#e09a00",color:"#fff",border:"1px solid #e09a00",margin:"0 10px"}}
                                        onClick={()=>{this.setState({visible_add:true})}}
                                    >添加设备</Button>
                                    <Popconfirm title="确定删除 ?" onConfirm={this.massDelete}>
                                        <Button type="primary" size="small" style={{backgroundColor:"#00924c",color:"#fff",border:"1px solid #00924c"}}>批量删除</Button>
                                    </Popconfirm>
                                </div>
                                <Table
                                loading={loading}
                                rowSelection={{...rowSelection}}
                                rowKey = {(record)=>{ return record.device_id}}
                                bordered
                                pagination={pagination}
                                dataSource={TableData}
                                >
                                {
                                    column.map(function(column,index){
                                        return <Column
                                            title={column.title}
                                            key={index}
                                            render={(text,record,index)=>{
                                                var dataIndex = column.dataIndex;
                                                if(column.render){
                                                    if(column.operatorList){
                                                        return column.render(text,record,index)
                                                    }
                                                    return column.render(text,record,index)
                                                }
                                                return (<div>{record[dataIndex]}</div>)
                                            }
                                            }
                                        />
                                    })
                                }
                            </Table>
                                <Modal
                                    key="1"
                                    title="添加设备信息"
                                    visible={this.state.visible_add}
                                    onOk={this.okModal}
                                    onCancel={this.handleCancel}
                                    width={860}
                                >
                                    <DeviceForm ref={(ref)=>{this.DeviceForm = ref}} {...this.props}
                                    />
                                </Modal>
                                <Modal
                                    key="2"
                                    title="修改设备信息"
                                    visible={this.state.visible_update}
                                    onOk={this.okModal_update}
                                    onCancel={this.handleCancel_update}
                                    width={860}
                                >
                                    {this.state.fixed_Modal&&<DeviceFormFixed ref={(ref)=>{this.DeviceFormFixed = ref;}} target={this.state.rowData} {...this.props} />}
                                </Modal>
                                <Modal
                                    key="3"
                                    title="气象阀值"
                                    visible={this.state.visible_thred}
                                    onOk={this.okModal_thred}
                                    onCancel={this.handleCancel_thred}
                                    width={860}
                                >
                                    {this.state.thred_Modal&&<ThredForm ref={(ref)=>{this.ThredForm = ref;}} target={this.state.rowData} {...this.props} />}
                                </Modal>
                            </div>
                        )
                    }
                _onChange(selectedRowKeys,selectedRows){

                    this.setState({selectedRowKeys:selectedRowKeys,selectedRows:selectedRows});
                }
                handleCancel=()=>{
                        this.setState({visible_add:false})
                };
                handleCancel_update = ()=>{
                    this.setState({visible_update:false,fixed_Modal:false})
                };
                handleCancel_thred = ()=>{
                    this.setState({visible_thred:false,thred_Modal:false})
                };
                okModal=()=>{
                    let that =this;
                    this.DeviceForm.validateFields((err,value)=>{
                        if(!err){
                           var  metre,mileage,site_code;
                            if(!value.metre){
                                metre = "000"
                            }
                            else {
                                if(value.metre.length==1){
                                    metre = "00"+value.metre;
                                }else if(value.metre.length==2){
                                    metre = "0"+value.metre
                                }else {
                                    metre = value.metre
                                }
                            }
                            if(!value.mileage){
                                mileage = value.section_code;
                            }else {
                                value.mileage = value.mileage.toString();
                                switch (value.mileage.length){
                                    case 1:  mileage ="000"+value.mileage;break;
                                    case 2:  mileage = "00"+value.mileage;break;
                                    case 3:  mileage = "0"+value.mileage;break;
                                    case 4:mileage = value.mileage;break;
                                }
                            }
                           site_code = value.road_code +mileage+metre;//转换后的编号
                            this.actions.reduxForReact(function *(dispatch,getState) {
                                var response = yield dataFetch("visibility/insertVisibility",{...value,site_code});
                                if(response.ret==1){
                                    message.success("添加成功");
                                    var result = yield dataFetch("/visibility/visibility",{});
                                    dispatch({type:Action.SeeingSuccess,payload:result.datas});
                                }
                            });
                            that.setState({visible_add:false});
                            that.DeviceForm.resetFields();

                        }

                    });
                };
                okModal_update=()=>{
                    let that =this;
                    this.DeviceFormFixed.validateFields((err,value)=>{
                        if(!err){

                            var  metre,mileage,site_code;
                            if(!value.metre){
                                metre = "000"
                            }
                            else {
                                if(value.metre.length==1){
                                    metre = "00"+value.metre;
                                }else if(value.metre.length==2){
                                    metre = "0"+value.metre
                                }else {
                                    metre = value.metre
                                }
                            }
                            if(!value.mileage){
                                mileage = value.section_code;
                            }else {
                                value.mileage = value.mileage.toString();
                                switch (value.mileage.length){
                                    case 1:  mileage ="000"+value.mileage;break;
                                    case 2:  mileage = "00"+value.mileage;break;
                                    case 3:  mileage = "0"+value.mileage;break;
                                    case 4:  mileage = value.mileage;break;
                                }
                            }
                            site_code = value.road_code +mileage+metre;//转换后的编号
                            this.actions.reduxForReact(function *(dispatch,getState) {
                                var response = yield dataFetch("visibility/updateVisibility",{...value,site_code,device_id:that.state.rowData.device_id});
                                if(response.ret==1){
                                    message.success("修改成功");
                                    var result = yield dataFetch("/visibility/visibility",{});
                                    dispatch({type:Action.SeeingSuccess,payload:result.datas});
                                }
                            });
                            that.setState({visible_update:false,fixed_Modal:false});

                        }

                    });
                };
                okModal_thred = ()=>{
                    let that =this;
                    this.ThredForm.validateFields((err,value)=>{
                        if(!err){
                            var  metre,mileage,site_code;
                          this.actions.reduxForReact(function *(dispatch,getState) {
                                var response = yield dataFetch("visibility/updateThreshold",{...value,id:value.threshold_type});
                                if(response.ret==1){
                                    message.success("修改成功");
                                    var result = yield dataFetch("/visibility/visibility",{});
                                    dispatch({type:Action.SeeingSuccess,payload:result.datas});
                                }
                            });

                            that.setState({visible_thred:false,thred_Modal:false});

                        }

                    });
                }
}

function mapStateToProps(state) {
    return {
            seeingData:state.Seeing,
            sysRoad:state.SysRoad,
            sysSection:state.SysSection,
            sysOrg:state.SysOrg,
            vendor:state.Vendor,
            sysCode:state.Dictionary
    }
}
export default withRouter(connect(mapStateToProps,null,null,{withRef:true})(Tables));
ReactMixin(Tables.prototype,tableParams);