import React from 'react';
import {Button, Col, Row, Space, Table, Tag, notification, Radio} from "antd";
import $ from 'jquery'
import Head from "../common/head";
import {Link} from "react-router-dom";

const columns = [
    {
        title: '组',
        dataIndex: 'group',
        key: 'group',
        width: 50,
        fixed: 'left',
    },

    {
        title: '分类',
        dataIndex: 'classification',
        key: 'classification',
        width: 60,
        fixed: 'left',
    },
    {
        title: '医嘱',
        dataIndex: 'nameOrd',
        key: 'nameOrd',
        render: text => <a>{text}</a>,
        width: 200,
        fixed: 'left',
    },
    {
        title: '长',
        key: 'euAlways',
        dataIndex: 'euAlways',
        render: text => {
            let color = text == "0"  ? 'geekblue' : 'green';
            if (text === '0') {
                text = '长期';
            }else if(text === '1'){
                text = '临时';
            }
            return (
                <Tag color={color} key={text}>
                    {text}
                </Tag>
            );
        },
    },
    {
        title: '开始时间',
        key: 'dateStart',
        dataIndex: 'dateStart',
        width: 200,
    },

    {
        title: '用量',
        dataIndex: 'quan',
        key: 'quan',
        render: text => <a>{text}</a>,
    },
    {
        title: '用法',
        dataIndex: 'codeSupply',
        key: 'codeSupply',
        render: text => <a>{text}</a>,
    },
    {
        title: '频次',
        dataIndex: 'codeFreq',
        key: 'codeFreq',
        render: text => <a>{text}</a>,
    },
    {
        title: '首',
        dataIndex: 'firstNum',
        key: 'firstNum',
        render: text => <a>{text}</a>,
    },
    {
        title: '停止时间',
        dataIndex: 'dateStop',
        key: 'dateStop',
        render: text => <a>{text}</a>,
    },
    {
        title: '末',
        dataIndex: 'lastNum',
        key: 'lastNum',
        render: text => <a>{text}</a>,
    },
    {
        title: '开立人',
        dataIndex: 'nameEmpOrd',
        key: 'nameEmpOrd',
        render: text => <a>{text}</a>,
    },
    {
        title: '签署',
        dataIndex: 'nameEmpOrd',
        key: 'nameEmpOrd',
        render: text => <a>{text}</a>,
    },
    {
        title: '停嘱',
        dataIndex: 'nameEmpStop',
        key: 'nameEmpStop',
        render: text => <a>{text}</a>,
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text) => (
            <Space size="middle">
                <a>详情</a>
            </Space>
        ),
        width: 100,
        fixed: 'right',
    },
];

const tableData = [];



class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            pkPv: this.props.match.params.pkPv,
            name: "",
            gender: "",
            bed: "",
            age: "",
            tableData: tableData,
        };
    }

    componentDidMount() {
        console.log("url中获取的参数"+this.props.match.params.pkPv);

        this.listPatientOrder();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    listPatientOrder(){
        this.serverRequest = $.get(global.constants.nhisApi+"/nhis/mobile/ord?pkPv="+this.props.match.params.pkPv, function (result) {
            console.log(result);
            if(result.code==400){
                notification.open({
                    message: '提示',
                    description: result.msg,
                });
            }
            if(result.code==200){
                this.setState({
                    tableData: result.data
                });
            }

        }.bind(this));
    }

    // 跳转到医嘱界面
    toMedicalAdvice(){
        // global.patientInfo+
        // window.location.href= "/mobile/advice?id="+document.getElementById('id').innerText;
    }

    render() {
        return (
            <div style={{margin: 20}}>

                <Head pkPv={this.state.pkPv}/>

                <div>
                    <Row>
                        <Col span={6}>
                            <div>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">全部</Radio.Button>
                                    <Radio.Button value="b">临时</Radio.Button>
                                    <Radio.Button value="c">长期</Radio.Button>
                                </Radio.Group>
                            </div>
                        </Col>

                        <Col span={6}>
                            <div>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">全部</Radio.Button>
                                    <Radio.Button value="b">当前</Radio.Button>
                                </Radio.Group>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div>
                                <Button type="primary" style={{marginLeft:20}}><Link to={"/medicalAdvice/"+this.props.match.params.pkPv}>新医嘱</Link></Button>
                                <Button type="primary" style={{marginLeft:20}}>停嘱</Button>
                                <Button type="primary" style={{marginLeft:20}}>签署</Button>
                                <Button type="primary" style={{marginLeft:20}}>删除</Button>
                            </div>

                        </Col>
                    </Row>
                    <div style={{marginTop: 20}}>
                        <Table
                            columns={columns}
                            dataSource={this.state.tableData}
                            scroll={{ x: 1500,y: 500 }}
                            pagination={ false }
                            bordered />
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;
