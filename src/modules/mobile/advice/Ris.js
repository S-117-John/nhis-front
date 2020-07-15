import React from "react";
import {Button, Col, Input, Row, Table, Radio, Tree, Divider, Space, Spin, Form, DatePicker,Modal} from "antd";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {SnippetsOutlined, CheckOutlined, RollbackOutlined} from '@ant-design/icons';


const {Search} = Input;


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}



const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const Demo = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
}
const dateTimeonfig = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};
class Ris extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        ordData: null,
        treeData: [],
        loading: false
    }

    componentDidMount() {

        this.serverRequest = this.listEmpOrd();

        console.log("医嘱ord:" + this.props.doctorCode);
    }

    componentWillUnmount() {
        console.log("销毁")
    }


    onLoadData = treeNode => {
        const {treeData} = this.state;
        return new Promise(resolve => {
            const {props} = treeNode;

            setTimeout(() => {

                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
        });
    };


    // 获取检查模板
    listEmpOrd() {
        $.ajax({
            url: global.constants.nhisApi + "nhis/mobile/ord/ris/temp",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({treeData: data.data});   // 注意这里
            }.bind(this)
        });
    }

    //选择树节点
    onSelect = (selectedKeys, info) => {

        console.log(selectedKeys);
        $.ajax({
            url: global.constants.nhisApi + "nhis/mobile/ord/temp/detail",
            dataType: 'json',
            data: {pkOrdSet: selectedKeys[0]},
            cache: false,
            success: function (data) {
                this.setState({ordData: data.data});   // 注意这里
            }.bind(this)
        });
    };

    toAdviceSearch(value) {
        this.props.history.push('/medicalAdviceSearch/' + this.props.pkPv + "/" + this.props.doctorCode + "/" + value)
    }

    // 保存模板
    saveOrdTemp() {
        this.setState({loading: true});

        sleep(2000).then(() => {
            this.setState({loading: false});
        })
    }

    destroyAll() {
        console.log(23123213213);
        this.props.destroyModal();
    }

    render() {
        return (
            <div>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    {/*<div>*/}
                    {/*    <Space>*/}
                    {/*        <Button type="primary">保存</Button>*/}
                    {/*        <Button type="primary">签署</Button>*/}
                    {/*        <Button type="primary">删除</Button>*/}
                    {/*        <Button type="primary" onClick={()=>this.destroyAll()}>返回</Button>*/}
                    {/*    </Space>*/}
                    {/*</div>*/}
                    {/*<Divider/>*/}
                    <div>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{remember: true}}

                        >

                            <Form.Item name="date-time-picker" label="开始时间" {...dateTimeonfig}>
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>

                            <div style={{textAlign:'center'}}>
                                <h1>检查项目名称</h1>
                                <span>类型：XX 单价: 123 申请单号：123213</span>
                            </div>

                            <Form.Item
                                label="执行科室"
                                name="username"
                                rules={[{required: true, message: '请选择执行科室'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="检查部位"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="检查目的"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="病情描述"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="注意事项"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="备注"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>

            </div>
        );
    }
}

// export default withRouter(Ris);
export default Ris;
