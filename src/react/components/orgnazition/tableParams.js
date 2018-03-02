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
            columns: [{
                title: '序号',
                dataIndex: 'key',
                key: 'key',
            }, {
                title: '机构代码',
                dataIndex: 'org_code',
                key: 'org_code',
            }, {
                title: '机构名称',
                dataIndex: 'org_name',
                key: 'org_name',
            }, {
                title: '父机构代码',
                dataIndex: 'parent_org_code',
                key: 'parent_org_code',
            }, {
                title: '机构类型',
                dataIndex: 'org_type',
                key: 'org_type',
            }, {
                title: '机构级别',
                dataIndex: 'latest_login_time',
                key: 'latest_login_time',
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
            }, {
                title: '更新时间',
                dataIndex: 'create_time',
                key: 'upstring_time',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                    <a href="#" onClick={(e) => this.updateOrganiz(record, e)}><Icon type="edit" /></a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定删除 ?" onConfirm={(e) => this.deleteOrganiz(record.id, e,record)}>
                        <a href="#" className="ant-dropdown-link" onClick={(e) => this.stopViewData(e)}>
                            <Icon type="delete"/>
                        </a>
                    </Popconfirm>
                    <span className="ant-divider" />
                    <a href="#" onClick={(e) => this.checkOrganiz(record, e)}><Icon type="eye-o" /></a>
                </span>

                ),
            }]
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


       // that.actions.reduxForReact 可以用
    }

}

