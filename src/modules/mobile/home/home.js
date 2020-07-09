import React from 'react';
import {Button, Col, Row, Space, Table, Tag, notification, Radio} from "antd";
import $ from 'jquery'
import Head from "../common/head";
import {Link} from "react-router-dom";
import "./home.css";

const tableData = [
    {
        bdOrdType: {name: ''}
    }
];


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pkPv: this.props.match.params.pkPv,
            tableData: tableData,
            selectedRowKeys: [],
            filteredInfo: null,
        };
    }

    componentDidMount() {
        console.log("url中获取的参数" + this.props.match.params.pkPv);

        this.listPatientOrder();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    listPatientOrder() {
        this.serverRequest = $.get(global.constants.nhisApi + "/nhis/mobile/ord?pkPv=" + this.props.match.params.pkPv, function (result) {
            console.log(result);
            if (result.code == 400) {
                notification.open({
                    message: '提示',
                    description: result.msg,
                });
            }
            if (result.code == 200) {
                this.setState({
                    tableData: result.data
                });
            }

        }.bind(this));
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    RadioGroup = (e) => {
        console.log(e.target.value);
        var type = e.target.value
        switch (type) {
            case 'a':
                this.setState({
                    filteredInfo: {euAlways: ['0', '1']},
                });
                break;
            case 'b':
                this.setState({
                    filteredInfo: {euAlways: ['0']},
                });
                break;
            case 'c':
                this.setState({
                    filteredInfo: {euAlways: ['1']},
                });
                break;
        }

    }
    // 行色
    setRowClassName(record){
        return 'clickRowStyle'
    }
    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {filteredInfo} = this.state;
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: '组',
                dataIndex: 'group',
                width: 50,
                fixed: 'left',
                key: 'key'
            },

            {
                title: '分类',
                dataIndex: 'bdOrdTypeName',
                width: 60,
                fixed: 'left',
                filters: [
                    {text: '西药', value: '西药'},
                    {text: '草药', value: '草药'},
                    {text: '检查', value: '检查'},
                    {text: '检验', value: '检验'},
                    {text: '手术', value: '手术'},
                    {text: '会诊', value: '会诊'},
                    {text: '卫材', value: '卫材'},
                    {text: '药品', value: '药品'},
                ],
                filteredValue: filteredInfo.bdOrdTypeName || null,
                onFilter: (value, record) => record.bdOrdTypeName.includes(value),

            },
            {
                title: '医嘱',
                dataIndex: 'nameOrd',
                render: text => <a>{text}</a>,
                width: 200,
                fixed: 'left',
            },
            {
                title: '长',
                dataIndex: 'euAlways',
                render: text => {
                    let color = text == "0" ? 'geekblue' : 'green';
                    if (text === '1') {
                        text = '长期';
                    } else if (text === '0') {
                        text = '临时';
                    }
                    return (
                        <Tag color={color} key={text}>
                            {text}
                        </Tag>
                    );
                },
                filters: [
                    {text: '长期', value: '1'},
                    {text: '临时', value: '0'},
                ],
                filteredValue: filteredInfo.euAlways || null,
                // onFilter: (value, record) => record.euAlways.includes(value),
                onFilter: (value, record) => record.euAlways.indexOf(value) === 0,
            },
            {
                title: '开始时间',
                dataIndex: 'dateStart',
                width: 200,
                sorter: (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime(),
                sortDirections: ['descend','ascend'],
            },

            {
                title: '用量',
                dataIndex: 'quan',
                render: text => <a>{text}</a>,
            },
            {
                title: '用法',
                dataIndex: 'codeSupply',
                render: text => <a>{text}</a>,
            },
            {
                title: '频次',
                dataIndex: 'codeFreq',
                render: text => <a>{text}</a>,
            },
            {
                title: '首',
                dataIndex: 'firstNum',
                render: text => <a>{text}</a>,
            },
            {
                title: '停止时间',
                dataIndex: 'dateStop',
                render: text => <a>{text}</a>,
            },
            {
                title: '末',
                dataIndex: 'lastNum',
                render: text => <a>{text}</a>,
            },
            {
                title: '开立人',
                dataIndex: 'nameEmpOrd',
                render: text => <a>{text}</a>,
            },
            {
                title: '签署',
                dataIndex: 'nameEmpOrd',
                render: text => <a>{text}</a>,
            },
            {
                title: '停嘱',
                dataIndex: 'nameEmpStop',
                render: text => <a>{text}</a>,
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text) => (
                    <Space size="middle">
                        <a>详情</a>
                    </Space>
                ),
                width: 100,
                fixed: 'right',
            },
        ];


        return (
            <div style={{margin: 20}}>

                <Head pkPv={this.state.pkPv}/>

                <div>
                    <Row>
                        <Col span={6}>
                            <div>
                                <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.RadioGroup}>
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
                                <Button type="primary" style={{marginLeft: 20}}><Link
                                    to={"/medicalAdvice/" + this.props.match.params.pkPv}>新医嘱</Link></Button>
                                <Button type="primary" style={{marginLeft: 20}}>停嘱</Button>
                                <Button type="primary" style={{marginLeft: 20}}>签署</Button>
                                <Button type="primary" style={{marginLeft: 20}}>删除</Button>
                            </div>

                        </Col>
                    </Row>
                    <div style={{marginTop: 20}}>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={this.state.tableData}
                            scroll={{x: 1500, y: 500}}
                            pagination={false}
                            bordered
                            onChange={this.handleChange}
                            />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
