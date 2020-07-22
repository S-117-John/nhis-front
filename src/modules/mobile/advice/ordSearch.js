import React from "react";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {Button, Col, Divider, Input, Modal, Popconfirm, Row, Table} from "antd";
import { RollbackOutlined} from '@ant-design/icons';
import Ris from "./Ris";
import LisNew from "./LisNew";
import DiagTreat from "./DiagTreat";

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
const risData=null;
const lisData=null;
const DiagTreatData=null;

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
        visibleLis:false,
        visibleDiagTreat:false,
        modalTitle:'',
        risData:null,
        lisData:null,

        DiagTreatData:null,
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
            $.get(global.constants.nhisApi + "nhis/mobile/ord/pd/getLisOrRisDetail?pkOrd=" + record.key+"&LisOrRis="+record.codeOrdType, function (result) {
                console.log(result);
                if (result.code == 200) {
                    this.setState({
                        risData: result.data
                    });
                    this.showModal('新开检查项目');
                }

            }.bind(this));

        }else if(record.codeOrdType!=null&&record.codeOrdType=='03'){
            $.get(global.constants.nhisApi + "nhis/mobile/ord/pd/getLisOrRisDetail?pkOrd=" + record.key+"&LisOrRis="+record.codeOrdType, function (result) {
                console.log(result);
                if (result.code == 200) {
                    this.setState({
                        lisData: result.data
                    });
                    this.showModalLis('新开检验项目');
                }

            }.bind(this));

        }else{//诊疗
            $.get(global.constants.nhisApi + "nhis/mobile/ord/pd/getLisOrRisDetail?pkOrd=" + record.key+"&LisOrRis="+record.codeOrdType, function (result) {
                console.log(result);
                if (result.code == 200) {
                    this.setState({
                        DiagTreatData: result.data
                    });
                    this.showModalDiagTreat('新开诊疗项目');
                }

            }.bind(this));

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
    showModalLis = (title) => {
        this.setState({
            visibleLis: true,
            modalTitle: title,
        });
        // const modal = Modal.info({
        //     title: title,
        //     content: <Ris destroyModal={this.destroyModal.bind(this)}/>,
        // });
    };
    showModalDiagTreat = (title) => {
        this.setState({
            visibleDiagTreat: true,
            modalTitle: title,
        });
        // const modal = Modal.info({
        //     title: title,
        //     content: <Ris destroyModal={this.destroyModal.bind(this)}/>,
        // });
    };
    handleOk = (e,type) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        if('ris'==type){
            console.log("检查："+JSON.stringify(this.refs['ris'].state.ordData))
            console.log("检查部位："+JSON.stringify(this.refs['ris'].state.body))
        }
        // Modal.destroyAll();
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancelLis = e => {
        console.log(e);
        this.setState({
            visibleLis: false,
        });
    };
    handleCancelDiagTreat = e => {
        console.log(e);
        this.setState({
            visibleDiagTreat: false,
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
    //销毁弹出框
    destroyModalLis(){
        Modal.destroyAll();
    }
    destroyModalDiagTreat(){
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
                {/* 检查 */}
                <div>
                    <Modal
                        title={this.state.modalTitle}
                        visible={this.state.visible} onCancel={this.handleCancel}
                        destroyOnClose={true}
                        footer={[

                            <Button key="save" type="primary" onClick={(event,type) => this.handleOk(event,'ris')}>
                                保存
                            </Button>,
                            <Button key="back" onClick={this.handleCancel}>
                                返回
                            </Button>,
                        ]}
                    >
                    <Ris ref={'ris'} destroyModal={this.destroyModal.bind(this)} ordData={this.state.risData}/>
                    </Modal>
                </div>
                {/* 检验 */}
                <div>
                    <Modal
                        title={this.state.modalTitle}
                        visible={this.state.visibleLis} onCancel={this.handleCancelLis}
                        // onOk={this.handleOk}
                        // onCancel={this.handleCancel}
                        footer={[
                            // <Button key="submit" type="primary" onClick={this.handleOk}>
                            //     签署
                            // </Button>,
                            <Button key="save" type="primary" onClick={this.handleOk}>
                                保存
                            </Button>,
                            <Button key="back" onClick={this.handleCancelLis}>
                                返回
                            </Button>,
                        ]}
                    >
                    <LisNew destroyModal={this.destroyModalLis.bind(this)} ordData={this.state.lisData}/>
                    </Modal>
                </div>
                {/* 诊疗 */}
                <div>
                    <Modal
                        title={this.state.modalTitle}
                        visible={this.state.visibleDiagTreat} onCancel={this.handleCancelDiagTreat}
                        // onOk={this.handleOk}
                        // onCancel={this.handleCancel}
                        footer={[
                            // <Button key="submit" type="primary" onClick={this.handleOk}>
                            //     签署
                            // </Button>,
                            <Button key="save" type="primary" onClick={this.handleOk}>
                                保存
                            </Button>,
                            <Button key="back" onClick={this.handleCancelDiagTreat}>
                                返回
                            </Button>,
                        ]}
                    >
                    <DiagTreat destroyModal={this.destroyModalDiagTreat.bind(this)} ordData={this.state.DiagTreatData}/>
                    </Modal>
                </div>

            </div>
        );
    }
}

export default withRouter(OrdSearch);
