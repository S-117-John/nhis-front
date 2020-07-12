import React from "react";
import {Button, Col, Input, Row, Table, Radio, Tree, Divider, Space} from "antd";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {SnippetsOutlined, CheckOutlined, RollbackOutlined} from '@ant-design/icons';


const { Search } = Input;


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

class Ord extends React.Component{
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        ordData:{},
        treeData: [],
    }
    componentDidMount() {

        this.serverRequest = this.listEmpOrd();

        console.log("医嘱ord:"+this.props.doctorCode);
    }

    componentWillUnmount() {

    }


    onLoadData = treeNode => {
        const { treeData } = this.state;
        return new Promise(resolve => {
            const { props } = treeNode;

            setTimeout(() => {

                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
        });
    };



    // 获取个人模板
    listEmpOrd(){
        $.ajax({
            url: global.constants.nhisApi+"nhis/mobile/doctor/personal/template?pkEmp=74f80fd350154f278c291828c7853ead",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ordData: data.data,treeData:data.data});   // 注意这里
            }.bind(this)
        });
    }

    //选择树节点
    onSelect = (selectedKeys, info) =>{

        console.log(selectedKeys);
    };

    toAdviceSearch(value){
        this.props.history.push('/medicalAdviceSearch/'+this.props.pkPv+"/"+this.props.doctorCode+"/"+value)
    }
    render(){
        // 跳转医嘱搜索页面


        return(
            <div>
                <div style={{width:500}}>
                    <Search  onSearch={value => this.toAdviceSearch(value)}  enterButton />
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
                                <Tree
                                    height={500}
                                    loadData={this.onLoadData}
                                    treeData={this.state.treeData}
                                    showIcon={true}
                                    icon={<SnippetsOutlined />}
                                    onSelect={this.onSelect}
                                />
                            </div>
                        </Col>
                        <Col span={1}>
                            <Divider style={{height:500}} type="vertical"/>
                        </Col>
                        <Col span={18}>

                            <div style={{marginBottom:5}}>
                                <Row>
                                    <Col flex={1}>
                                        <div style={{textAlign:"left"}}>
                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button value="a">长期</Radio.Button>
                                                <Radio.Button value="b">临时</Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col flex={1}>
                                        <div style={{textAlign:"right"}}>
                                            <Space>
                                                <Button type="primary"><CheckOutlined />确定</Button>
                                                <Button type="primary"><RollbackOutlined />取消</Button>
                                            </Space>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div>
                                <Table
                                    bordered
                                    columns={columns}
                                    dataSource={this.state.data}
                                    pagination={false}
                                    scroll={{y: 500 }}
                                />
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(Ord);
