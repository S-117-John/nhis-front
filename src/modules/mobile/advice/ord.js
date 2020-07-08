import React from "react";
import {Button, Col, Input, Row, Table, Radio} from "antd";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
const { Search } = Input;

const treeData = [];

const data = [];
const columns = [
    {
        title: '医嘱名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '用量',
        dataIndex: 'dosage',
        key: 'dosage',
        render: text => <a>{text}</a>,
    },
    {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
        render: text => <a>{text}</a>,
    },
    {
        title: '用法',
        dataIndex: 'usage',
        key: 'usage',
        render: text => <a>{text}</a>,
    },
    {
        title: '频次',
        dataIndex: 'frequency',
        key: 'frequency',
        render: text => <a>{text}</a>,
    },
    {
        title: '执行科室',
        dataIndex: 'exeDept',
        key: 'exeDept',
        render: text => <a>{text}</a>,
    },

];

const ordColumns = [
    {
        title: '模板',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
];
const ordData = [];

class Ord extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            ordData:ordData
        }
    }

    componentDidMount() {

        this.listEmpOrd();
    }

    componentWillUnmount() {
        // this.serverRequest.abort();
    }

    // 获取个人模板
    listEmpOrd(){
        $.ajax({
            url: global.constants.nhisApi+"nhis/mobile/ord/set/emp?pkEmp=74f80fd350154f278c291828c7853ead",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ordData: data.data});   // 注意这里
            }.bind(this)
        });
    }

    onSelect (selectedKeys, info){

        console.log(selectedKeys);
    };
    toAdviceSearch(value){
        this.props.history.push('/medicalAdviceSearch/'+this.props.pkPv+"/"+value)
    }
    render(){
        // 跳转医嘱搜索页面


        return(
            <div>
                <div style={{width:500}}>
                    <Search placeholder="input search text"  onSearch={value => this.toAdviceSearch(value)}  enterButton />
                </div>
                <div style={{marginTop:20}}>
                    <Row>
                        <Col span={5}>
                            <div>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">个人</Radio.Button>
                                    <Radio.Button value="b">科室</Radio.Button>
                                </Radio.Group>
                            </div>
                            <div>
                                <Table
                                    columns={ordColumns}
                                    dataSource={this.state.ordData}
                                    scroll={{y: 300 }}
                                    pagination={false}
                                    bordered
                                />
                            </div>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={18}>
                            <div>
                                <Table
                                    bordered
                                    columns={columns}
                                    dataSource={this.state.data}
                                    pagination={false}
                                    scroll={{y: 300 }}
                                />
                            </div>
                            <div style={{marginTop:20}}>
                                <Row>
                                    <Col span={12}>
                                        <Radio.Group defaultValue="a" buttonStyle="solid">
                                            <Radio.Button value="a">长期</Radio.Button>
                                            <Radio.Button value="b">临时</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={12}>
                                        <Button type="primary">确定</Button>
                                        <Button type="primary">取消</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(Ord);
