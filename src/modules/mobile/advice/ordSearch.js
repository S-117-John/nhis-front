import React from "react";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {Button, Col, Divider, Input, Modal, Spin, Popconfirm, Row, Table, message} from "antd";
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
        loading: false,
        DiagTreatData:null,
        exeDeptList:null,//执行科室
    };

    componentDidMount() {

    }

    componentWillUnmount() {
        this.setState = ()=>false;
    }

    onSelect (selectedKeys, info){
        console.log(selectedKeys);
    };

    //选择医嘱项
    choose(record) {
        if(record.flagDurg!=null&&record.flagDurg=='1'){
            //跳转至药品明细界面
            this.state.listPkPd.push(record.key);
            this.props.history.push('/drugIndex/'+this.props.pkPv+"/"+this.props.doctorCode+"/"+this.props.currentDeptCode+"/"+record.key);
        }
        else if(record.codeOrdType!=null&&record.codeOrdType=='02'){

            $.get(window.g.nhisApi + "nhis/mobile/ord/ris/info?pkOrd=" + record.key, function (result) {
                console.log(result);
                if (result.code == 200) {
                    this.setState({
                        risData: result.data
                    });
                    this.showModal('新开检查项目');
                }

            }.bind(this));

        }else if(record.codeOrdType!=null&&record.codeOrdType=='03'){
            $.get(window.g.nhisApi + "nhis/mobile/ord/pd/getLisOrRisDetail?pkOrd=" + record.key+"&LisOrRis="+record.codeOrdType, function (result) {
                console.log(result);
                if (result.code == 200) {
                    this.setState({
                        lisData: result.data
                    });
                    this.showModalLis('新开检验项目');
                }

            }.bind(this));

        }else{//诊疗
            record.pkOrd = record.key;
            this.setState({
                DiagTreatData: record
            });
            this.showModalDiagTreat('新开诊疗项目');

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

    //弹出诊疗项目页面
    showModalDiagTreat = (title) => {
        //获取当前科室业务线对应的执行科室
        this.setState({loading: true });
        $.ajax({
            url: window.g.nhisApi+"nhis/mobile/bd/ou/dept",
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function(data) {

                this.setState({
                    exeDeptList: data,
                    visibleDiagTreat: true,
                    modalTitle: title,
                    loading: false});


            }.bind(this)
        });

    };
    //检查确定保存方法
    handleOk = (e,type) => {
        this.setState({loading: true });
        $.ajax({
            url: window.g.nhisApi+"nhis/mobile/ord/saveRisApply",
            dataType: 'JSON',
            data:{
                doctorCode : this.props.match.params.doctorCode,
                codeIp : this.props.match.params.pkPv,
                codeDept:this.props.currentDeptCode,
                pkOrd:this.refs['ris'].state.ordData.pkOrd,
                pkDeptExec:this.refs['ris'].state.exeDept,
                dateStart:this.refs['ris'].state.startTime,
                descBody:this.refs['ris'].state.body,
                purpose:this.refs['ris'].state.purpose,
                noteDise:this.refs['ris'].state.description,
                note:this.refs['ris'].state.note,
                codeApply:this.refs['ris'].state.ordData.codeApply
            } ,
            type: "POST",
            cache: false,
            success: function(data) {
                if(data.code==200){
                    message.info('保存成功');
                }
                this.setState({
                    visible: false,
                    loading: false
                });

            }.bind(this),
            error:function (data) {
                this.setState({
                    visible: false,
                    loading: false
                });
            }.bind(this)
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //检验确定保存方法
    handleOkLis = (e,type) => {
        this.setState({loading: true });
        if('lis'==type){
            var dataOld=this.refs['lis'].state.ordData.dataList[0];
            var dataNew=this.refs['lis'].state;
            var exeDept=dataNew.exeDept;
            if(!exeDept){
                exeDept=this.refs['lis'].state.ordData.exDeptList[0].pkDept;
            }
            var dtSamptype=dataNew.dtSamptype;
            if(!dtSamptype){
                dtSamptype=dataOld.dtSamptype;
            }
            var saveData={dtSamptype:dtSamptype,dtTubetype:dataOld.dtContype,dtColtype:dataOld.dtColltype,delFlag:"0",
                dateStart:dataNew.startTime,codeApply:this.refs['lis'].state.ordData.codeApple[0],pkPv:null,pkPi:null,
                pkDeptExec:exeDept,euStatusOrd:"0",pkOrd:dataOld.pkOrd,codeOrd:dataOld.code,nameOrd:dataOld.name,
                codeOrdType:dataOld.codeOrdtype,flagBl:dataOld.flagCg,quan:1,flagEmer:"0",noteOrd:dataNew.note,
                priceCg:dataOld.pricestr,euOrdtype:dataOld.euOrdtype};
            var saveDataList=new Array();
            saveDataList[0]=saveData;
            var jsonData = {
                labApplyList : saveDataList,
                code : this.props.match.params.doctorCode,
                codeIp : this.props.match.params.pkPv,
                codeDept:this.props.currentDeptCode
            };
            $.ajax({
                url: window.g.nhisApi+"nhis/mobile/ord/saveLisApplyList",
                //dataType: 'json',
                data:{param:JSON.stringify(jsonData)} ,
                type: "POST",
                cache: false,
                success: function(data) {
                    console.log("保存成功");
                    this.setState({
                        visibleLis: false,
                    });
                    this.setState({loading: false });
                }.bind(this),
                error:function (data) {
                    this.setState({loading: false });
                }.bind(this)
            });
        }
        // Modal.destroyAll();
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
        this.setState({loading: true });
        if(value!=""){
            $.ajax({
                url: window.g.nhisApi+"/nhis/mobile/ord/search?spCode="+value,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({
                        ordData: data.data,
                        loading: false
                    });

                }.bind(this),
                error:function (data){
                    this.setState({
                        loading: false
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





    //保存诊疗数据
    saveTreatment(event) {
        this.setState({loading: true });
        $.ajax({
            url: window.g.nhisApi+"nhis/mobile/ord/saveTreatment",
            data:{
                doctorCode : this.props.match.params.doctorCode,
                codeIp : this.props.match.params.pkPv,
                pkOrd: this.refs['treatment'].state.ordData.pkOrd,
                codeDept:this.props.currentDeptCode,
                euAlways:this.refs['treatment'].state.euAlways,
                codeFreq:this.refs['treatment'].state.ordFreqCode,
                quan:this.refs['treatment'].state.amount,
                pkDeptExec:this.refs['treatment'].state.exeDept,
                dateStart:this.refs['treatment'].state.dateStart,
                firstNum:this.refs['treatment'].state.first,//首日次数
                noteOrd:this.refs['treatment'].state.note//医嘱备注
            },
            type: "POST",
            cache: false,
            success: function(data) {
                this.setState({visibleDiagTreat: false, loading:false});
            }.bind(this),
            error:function (data) {
                this.setState({visibleDiagTreat: false,loading:false });
            }.bind(this)
        });
    }


    render(){
        return(
            <div>
                <Spin spinning={this.state.loading}>
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

                                <Button key="save" type="primary" loading={this.state.loading} onClick={(event,type) => this.handleOk(event,'ris')}>
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
                            destroyOnClose={true}
                            // onOk={this.handleOk}
                            // onCancel={this.handleCancel}
                            footer={[
                                // <Button key="submit" type="primary" onClick={this.handleOk}>
                                //     签署
                                // </Button>,
                                <Button key="save" type="primary" loading={this.state.loading} onClick={(event,type) => this.handleOkLis(event,'lis')} >
                                    保存
                                </Button>,
                                <Button key="back" onClick={this.handleCancelLis}>
                                    返回
                                </Button>,
                            ]}
                        >
                            <LisNew ref={'lis'} destroyModal={this.destroyModalLis.bind(this)} ordData={this.state.lisData}/>
                        </Modal>
                    </div>


                </Spin>
                {/*诊疗项目*/}
                <Modal
                    title={this.state.modalTitle}
                    visible={this.state.visibleDiagTreat} onCancel={this.handleCancelDiagTreat}
                    destroyOnClose={true}
                    footer={[
                        <Button key="save" type="primary" onClick={this.saveTreatment.bind(this)}>
                            保存
                        </Button>,
                        <Button key="back" onClick={this.handleCancelDiagTreat}>
                            返回
                        </Button>,
                    ]}
                >
                    <DiagTreat ref={'treatment'} destroyModal={this.destroyModalDiagTreat.bind(this)} ordData={this.state.DiagTreatData} exeDeptList={this.state.exeDeptList}/>
                </Modal>
            </div>
        );
    }
}

export default withRouter(OrdSearch);
