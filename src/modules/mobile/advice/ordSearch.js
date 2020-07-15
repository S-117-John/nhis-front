import React from "react";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {Button, Col, Divider, Input, Modal, Popconfirm, Row, Table} from "antd";
import { RollbackOutlined} from '@ant-design/icons';
import Ris from "./Ris";

const { Search } = Input;

function confirm(e) {
    console.log(e);
    this.props.history.push('/drugIndex/'+this.props.pkPv+"/"+this.props.doctorCode+"/"+this.state.listPkPd);
}

function cancel(e) {
    console.log(e);
}

//选择医嘱项
const ordData = [];

class OrdSearch extends React.Component{

    constructor(props) {
        super(props);
        confirm = confirm.bind(this);
    }

    state = {
        data: this.data,
        ordData:ordData,
        searchValue: "",
        listPkPd:[],//药品id数组
        visible: false,
        modalTitle:'',
    };

    componentDidMount() {

    }

    componentWillUnmount() {
        // this.serverRequest.abort();
    }

    onSelect (selectedKeys, info){
        console.log(selectedKeys);
    };

    //选择医嘱项
    choose(record) {
        console.log(record)
        if(record.flagDurg!=null&&record.flagDurg=='1'){
            //跳转至药品明细界面
            this.state.listPkPd.push(record.key);
            this.props.history.push('/drugIndex/'+this.props.pkPv+"/"+this.props.doctorCode+"/"+this.state.listPkPd);
        }
        else if(record.codeOrdType!=null&&record.codeOrdType=='02'){
            this.showModal('新开检查项目');
        }
    }


    columns = [
        {
            title: '医嘱名称',
            dataIndex: 'nameOrd',
            render: (text, record) => <a href="#!" onClick={()=>this.choose(record)}>{text}</a>,
        },
        {
            title: '规格',
            dataIndex: 'spec',

            render: text => <a>{text}</a>,
        },
        {
            title: '包装单位',
            dataIndex: 'unit',

            render: text => <a>{text}</a>,
        },
        {
            title: '描述',
            dataIndex: 'desc',

            render: text => <a>{text}</a>,
        },
        {
            title: '参考价格',
            dataIndex: 'price',

            render: text => <a>{text}</a>,
        },
        {
            title: '库存量',
            dataIndex: 'amount',

            render: text => <a>{text}</a>,
        },
        {
            title: '医保类型',
            dataIndex: 'medicareType',

            render: text => <a>{text}</a>,
        },

    ];


    showModal = (title) => {
        this.setState({
            visible: true,
            modalTitle: title,
        });
        // const modal = Modal.info({
        //     title: title,
        //     content: <Ris destroyModal={this.destroyModal.bind(this)}/>,
        // });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    listOrd(value){
        console.log(value);
        if(value!=""){
            $.ajax({
                url: global.constants.nhisApi+"/nhis/mobile/ord/search?spCode="+value,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({
                        ordData: data.data,
                    });

                }.bind(this)
            });
        }
    }

    //点击行
    rowClick(record){
        var pkPds=[];
        pkPds.push(record.key)
        pkPds.push("123213")
        this.setState({listPkPd:pkPds})
    }

    //销毁弹出框
    destroyModal(){
        console.log('aaaaaaaaaaaaaa')
        Modal.destroyAll();
    }

    goBack(){
        window.history.back(-1)
    }

    render(){
        return(
            <div>
                <div >
                    <Row>
                        <Col span={12}>
                            <Search  onSearch={value => this.listOrd(value)}  enterButton />
                        </Col>
                        <Col span={1}></Col>
                        <Col>
                            <Button type="primary" onClick={this.goBack}><RollbackOutlined />取消</Button>
                        </Col>
                    </Row>


                </div>
                <Divider/>
                <div>
                    <Table
                        onRow={record => {
                            return {
                                onClick: event => {this.rowClick(record)}, // 点击行
                                onDoubleClick: event => {},
                                onContextMenu: event => {},
                                onMouseEnter: event => {}, // 鼠标移入行
                                onMouseLeave: event => {},
                            };
                        }}
                        bordered
                        columns={this.columns}
                        dataSource={this.state.ordData}
                        pagination={false}
                        scroll={{y: 500 }}
                    />
                </div>

                <Modal
                    title={this.state.modalTitle}
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    // onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            签署
                        </Button>,
                        <Button key="save" type="primary" onClick={this.handleOk}>
                            保存
                        </Button>,
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                        </Button>,
                    ]}
                >
                   <Ris destroyModal={this.destroyModal.bind(this)}/>
                </Modal>


            </div>
        );
    }
}

export default withRouter(OrdSearch);
