import React from 'react';
import {Button, Col, Row, Space, Table, Tag, notification, Radio, Drawer, Descriptions, Divider} from "antd";
import $ from 'jquery'
import Head from "../common/head";
import {Link} from "react-router-dom";
import ProTable, {ProColumns, TableDropdown} from '@ant-design/pro-table';
import {PlusOutlined,StopOutlined,DeleteOutlined,EditOutlined} from '@ant-design/icons';
import "./home.css"
const tableData = [
    {
        bdOrdType: {name: ''}
    }
];


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        pkPv: this.props.match.params.pkPv,
        tableData: null,
        selectedRowKeys: [],
        filteredInfo: null,
        drawerVisible: false,
        ordDetail: {nameOrd:'',euAlways:'',dateStart:'',codeFreq:''},
    };

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
                    filteredInfo: {euAlways: ['1']},
                });
                break;
            case 'c':
                this.setState({
                    filteredInfo: {euAlways: ['0']},
                });
                break;
        }

    }

    showDrawer = (record) => {
        console.log(record)
        $.ajax({
            url: global.constants.nhisApi+"nhis/mobile/ord/detail",
            dataType: 'json',
            data:{pkCnOrd:record.pkCnord},
            cache: false,
            success: function(data) {
                this.setState({
                    visible: true,
                    ordDetail: data.data
                });
            }.bind(this)
        });



    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {filteredInfo} = this.state;
        filteredInfo = filteredInfo || {};
        const columns: ProColumns = [
            {
                title: '组',
                dataIndex: 'group',
                width: 50,
                fixed: 'left',

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
                    if (text === '0') {
                        text = '长期';
                    } else if (text === '1') {
                        text = '临时';
                    }
                    return (
                        <Tag color={color} key={text}>
                            {text}
                        </Tag>
                    );
                },
                filters: [
                    {text: '长期', value: '0'},
                    {text: '临时', value: '1'},
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
                sortDirections: ['descend', 'ascend'],
                valueType: 'dateTime',

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
                render: (text, record) => (
                    <a href="#!"  onClick={()=>this.showDrawer(record)}>详情</a>
                ),
                fixed: 'right',
                width: 100

            },
        ];




        return (
            <div style={{margin: 20}}>

                <Head pkPv={this.props.match.params.pkPv} doctorCode={this.props.match.params.doctorCode}/>

                <Divider/>

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
                                <Link
                                    to={"/medicalAdviceSearch/" + this.props.match.params.pkPv + "/" + this.props.match.params.doctorCode}><Button
                                    type="primary" style={{marginLeft: 20}}><PlusOutlined/>
                                    新医嘱</Button></Link>
                                <Button type="primary" style={{marginLeft: 20}}><StopOutlined />停嘱</Button>
                                <Button type="primary" style={{marginLeft: 20}}><EditOutlined />签署</Button>
                                <Button type="primary" style={{marginLeft: 20}}><DeleteOutlined />删除</Button>
                            </div>

                        </Col>
                    </Row>
                    <Divider/>
                    <div style={{marginTop: 20}}>
                        <ProTable
                            columns={columns}
                            search={false}
                            options={false}
                            scroll={{x: 1500, y: 400}}
                            bordered
                            pagination={false}
                            dataSource={this.state.tableData}
                            rowSelection={rowSelection}
                            onChange={this.handleChange}
                            rowKey={record => record.key}
                            tableAlertRender={({ selectedRowKeys, selectedRows }) =>{
                                return(
                                    <div style={{ textAlign:"left"}}>
                                        当前共选中{selectedRowKeys.length} 项，共有 {selectedRows.reduce((pre, item) => {
                                        if (item.nameEmpOrd.length === 0) {
                                            return pre + 1;
                                        }
                                        return pre;
                                    }, 0)} 项未签署
                                    </div>
                                );
                            }}
                            tableAlertOptionRender={(props) => {
                                const { onCleanSelected } = props;
                                return (
                                    <div style={{ textAlign:"right"}}>
                                        <a onClick={onCleanSelected}>清空</a>
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>

                <Drawer
                    width={500}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <h1>医嘱执行情况</h1>

                    <div>
                        <Descriptions column={1}>
                            <Descriptions.Item label="医嘱期效">{this.state.ordDetail.euAlways==='1'?'临时':'长期'}</Descriptions.Item>
                            <Descriptions.Item label="开始时间">{this.state.ordDetail.dateStart}</Descriptions.Item>
                            <Descriptions.Item label="医嘱内容">{this.state.ordDetail.nameOrd}</Descriptions.Item>
                            <Descriptions.Item label="频次">{this.state.ordDetail.codeFreq}</Descriptions.Item>
                            <Descriptions.Item label="用量">1</Descriptions.Item>
                            <Descriptions.Item label="医生嘱托">1</Descriptions.Item>
                        </Descriptions>
                        <Divider/>
                        <Descriptions column={1}>
                            <Descriptions.Item label="执行时间">1</Descriptions.Item>
                            <Descriptions.Item label="执行科室">1</Descriptions.Item>
                            <Descriptions.Item label="执行状态">1</Descriptions.Item>
                            <Descriptions.Item label="执行说明">1</Descriptions.Item>
                            <Descriptions.Item label="执行情况">1</Descriptions.Item>
                        </Descriptions>
                        <Divider/>
                        <Descriptions column={1}>
                            <Descriptions.Item label="停止时间">1</Descriptions.Item>
                            <Descriptions.Item label="开嘱医生">1</Descriptions.Item>
                            <Descriptions.Item label="校对护士">1</Descriptions.Item>
                            <Descriptions.Item label="停嘱医生">1</Descriptions.Item>
                            <Descriptions.Item label="确认停止">1</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Drawer>

            </div>
        );
    }
}

export default Home;
