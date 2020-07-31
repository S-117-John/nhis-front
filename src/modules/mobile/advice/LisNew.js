import React from "react";
import {Button, Col, Input, Row, Table,Select, Radio, Tree, Divider, Space, Spin, Form, DatePicker,Modal} from "antd";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {SnippetsOutlined, CheckOutlined, RollbackOutlined} from '@ant-design/icons';

const { Option } = Select;
const {Search} = Input;

//检验
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
class LisNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ordData: this.props.ordData,
            loading:false,
        };
    }

    state = {
        data: [],
        ordData: null,
        treeData: [],
        listType:[],
        loading: false,
        startTime:null,//开始时间
        exeDept:null,//执行科室
        dtSamptype:null,//标本类型
        note:null,//备注
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
            url: window.g.nhisApi + "nhis/mobile/ord/ris/temp",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({treeData: data.data});   // 注意这里
            }.bind(this)
        });
    }

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

                            <Form.Item name="date-time-picker" label="开始时间" {...dateTimeonfig} onChange={(data,dateString)=>this.state.startTime=dateString} >
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>

                            <div style={{textAlign:'center'}}>
                                <h1>{this.state.ordData.dataList[0].name}</h1>
                                <span>类型：{this.state.ordData.dataList[0].nameSamptype}   单价: {this.state.ordData.dataList[0].pricestr} 申请单号：{this.state.ordData.codeApple[0]}</span>
                                <br/>
                            </div>
                            <Form.Item label="执行科室" rules={[{required: true, message: '请选择执行科室'}]} name="exDept" onSelect={value=>this.state.exeDept=value}  >
                                <Select style={{ width: 290 }} defaultValue={this.state.ordData.exDeptList[0].pkDept}>
                                    {this.state.ordData.exDeptList.map((item,index) => <Option  key={item.pkDept} value={item.pkDept} >{item.nameDept}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="标本类型"  name="dtType">
                                <Select style={{ width: 290 }} defaultValue={this.state.ordData.dataList[0].dtSamptype} onSelect={value=>this.state.dtSamptype=value}>
                                    {this.state.ordData.listType.map((item,index) => <Option  key={item.code} value={item.code} >{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="采集方式"
                                name="password"
                                rules={[{required: false, message: 'Please input your password!'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="备注"
                                name="password"
                                rules={[{required: false, message: 'Please input your password!'}]}
                            >
                                <Input onChange={event => this.state.note = event.target.value}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>

            </div>
        );
    }
}

// export default withRouter(Ris);
export default LisNew;
