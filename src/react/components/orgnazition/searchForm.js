import React from "react";
import { Form, Input, Button, Checkbox, Table, Icon, Modal, Select, DatePicker, Col, Row, Popconfirm, Pagination, notification, message, Tree } from 'antd';
import moment from 'moment';
import styles from "./index.css";
const Option = Select.Option;
const FormItem = Form.Item;


 class OrganizSearchForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

        });

    };


    //页面渲染完成时 执行默认查询条件
    componentDidMount() {

        this.props.form.validateFields((err, values) => {
        });

    }
    render() {
        const { getFieldDecorator } = this.props.form;

        //数据字典数据
        const Option = Select.Option;

        let i = 0;
        let tempObj;
        let orgTypeOptions = [];
        let orgLevelOptions = [];


        //form layout
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 14 },
        };


        return (
            <div id="VideoComponet">
                <div className={styles.serchPael}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem  {...formItemLayout} label="机构名称：">
                            {getFieldDecorator('org_type')(
                                <Select size="small" style={{ width: 130, display: 'inline-block' }} allowClear>
                                    {orgTypeOptions}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="机构代码：">
                            {getFieldDecorator('org_level')(
                                <Input size="small" style={{ width: 130, display: 'inline-block' }} />

                            )}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="父机构：">
                            {getFieldDecorator('org_parent')(
                                <Select size="small" style={{ width: 130, display: 'inline-block' }} allowClear>
                                    {orgLevelOptions}
                                </Select>
                            )}
                        </FormItem>
                        <Button size='small' htmlType="submit" type="primary" style={{ marginTop: 5, padding: '0 16px' ,marginLeft:10}}>
                            查询
                        </Button>

                    </Form>
                </div>
            </div>

        );
    }
};
export default Form.create()(OrganizSearchForm);