import React from "react";
import {Icon,Button,Popconfirm} from "antd";
import * as Action from "./action";
import dataFetch from "../../../utils/dataFetch";

export default {

    componentWillMount(){
       this.tableDataConfig = {
            // 是否有搜索组件
            hasSearchForm: true,
            // 是否有批量选择框
            hasRowSelection: true,
            // 表头配置列表
            columns: [
                {
                    title: '设备编号',
                    dataIndex: 'deviceCode',
                    width:100,
                    render:(text,record,index) =>{
                            if(record){
                               return <div>{record.device_nbr}</div>
                            }
                            return <div></div>

                    }
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                    width: 100,
                    render:(text,record,index)=>{
                        if(record){
                            return <div>{record.device_name}</div>
                        }
                        return <div></div>
                    }
                },
                {
                    title: 'ip',
                    dataIndex: 'ip',
                    width: 100,
                    render:(text,record,index)=>{
                        if(record){
                            return <div>{record.ip}</div>
                        }
                        return <div></div>
                    }
                },
                {
                    title: '管辖单位',
                    dataIndex: 'manageIssue',
                    width: 100,
                    render:(text,record,index)=>{
                        if(record){
                            var item = this.orgCode(record.org_code);
                            if(item){
                                return <div>{item.org_name}</div>
                            }else {return <span />}
                        }
                        return <div></div>
                    }
                },
                {
                    title: '操作',
                    width: 60,
                    operatorList: {handle:"处理"},
                    render:(text,record,index)=>{
                        if(record)
                            return (
                                <span>
                                    <a title="编辑" onClick={(e) => this.editMeteorology(record,this)}><Icon type="edit" /></a>
                                    <span className="ant-divider"/>
                                    <a title="阀值" onClick={(e) => this.thredModal(record,this)}><Icon type="environment-o" /></a>
                                    <span className="ant-divider"/>
                                    <Popconfirm title="确定删除 ?" onConfirm={(e) => this.deletes(record.device_id, this)}>
                                            <a title="删除"  ><Icon type="delete" /></a>
                                    </Popconfirm>
                                </span>
                            )



                    }
                }
            ]
        }
    },
    editMeteorology:(item,e)=>{
        var that = e;
        that.setState({visible_update:true,fixed_Modal:true,rowData:item});
        },
    thredModal:(item,e)=>{
        var that = e;
        that.setState({visible_thred:true,thred_Modal:true,rowData:item});
    },

    deletes:(id,e)=>{
        var that = e;
        that.actions.reduxForReact(function *(dispatch,getState) {
            var response = yield dataFetch("visibility/deleteVisibility",{device_id:id});
            if(response.ret==1){
                that.props.dispatch({type:Action.SEEINGDELETE,payload:id});
            }
        });

       // that.actions.reduxForReact 可以用
    }

}

