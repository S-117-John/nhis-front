import React from "react";
import $ from 'jquery';
import {Button, DatePicker, Select, Radio, Input, Switch, Row, Col, Spin, Space, Divider, Modal} from "antd";
import Head from "../common/head";
import DrugItem from "./drugItem";
import DrugSearch from "./drugSearch";

const { Option } = Select;

const ordDataList=[];

//医嘱信息


function onChange(date, dateString) {
    console.log(date, dateString);
}

//获取药品明细
function getBdPd(pkPd) {
    $.ajax({
        url: global.constants.nhisApi+"nhis/mobile/drug/list?ids="+pkPd,
        dataType: 'json',
        cache: false,
        success: function(data) {
            console.log(data.data);
            this.setState({ordDataList: data.data});
        }.bind(this)
    });
}

//频次
function listBdTermFreq() {
    $.ajax({
        url: global.constants.nhisApi+"nhis/mobile/bd/term/freq",
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({bdTermFreq: data.data});
        }.bind(this)
    });
}

// 医嘱用法
function listSupply() {
    $.ajax({
        url: global.constants.nhisApi+"nhis/mobile/bd/supply",
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({listBdSupply: data.data});
        }.bind(this)
    });
}

//保存
function save(event) {
    this.setState({loading: true });
    console.log(12313);
    var cnOrdList = [];
    this.state.ordDataList.map((item,index) => {
        var cnOrd = new Object();
        cnOrd.euAlways = this.state.euAlways;//长期or临时
        cnOrd.pkOrd = item.pkPd;//医嘱主键
        cnOrd.codeFreq = this.state.ordFreqCode;//医嘱频次编码
        cnOrd.codeSupply = this.state.ordSupplyCode;//医嘱用法编码
        cnOrd.pkPv = this.props.match.params.pkPv;
        cnOrd.euPvtype = '3';//就诊类型
        cnOrdList.push(cnOrd);
    });
    $.ajax({
        url: global.constants.nhisApi+"nhis/mobile/ord/save",
        dataType: 'json',
        data:{ordList:JSON.stringify(cnOrdList)} ,
        type: "POST",
        cache: false,
        success: function(data) {
            console.log("保存成功");
            this.setState({loading: false });
        }.bind(this),
        error:function (data) {
            this.setState({loading: false });
        }.bind(this)
    });
}


//长期/临时切换
function radioGroup(e) {
    console.log(e.target.value);
    this.state.euAlways = e.target.value;
}

class DrugIndex extends React.Component{

    constructor(props) {
        super(props);
        getBdPd = getBdPd.bind(this);
        listBdTermFreq = listBdTermFreq.bind(this);
        listSupply = listSupply.bind(this);
        save = save.bind(this);
        radioGroup = radioGroup.bind(this);
    }


    state = {
        ordDataList: ordDataList,//药品数据
        bdTermFreq: [],//频次列表
        listBdSupply:[],//医用用法列表
        ordFreqCode:null,//医嘱频次编码
        ordSupplyCode:null,//医嘱用法编码
        startTime:null,//开始时间
        cnOrd:null,//医嘱数据
        euAlways:'0',
        loading: false,
        visible: false,
    };

    componentDidMount() {
        console.log("pkPd:"+this.props.match.params.pkPd);
        getBdPd(this.props.match.params.pkPd);
        listBdTermFreq();
        listSupply();
    }

    componentWillUnmount() {
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
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


    render(){
        return(
            <div style={{margin:30}}>
                <Spin spinning={this.state.loading}>
                    <Head pkPv={this.props.match.params.pkPv} doctorCode={this.props.match.params.doctorCode}/>
                    <Divider/>
                    <div style={{textAlign:"right"}}>
                        <Space>
                            <Button type="primary" onClick={this.showModal}>新增子医嘱</Button>
                            <Button type="primary" onClick={(event)=>save(event)}>保存</Button>
                            <Button type="primary">签署</Button>
                            <Button type="primary">删除</Button>
                            <Button type="primary">返回</Button>
                        </Space>
                    </div>
                    <Divider/>
                    <div>
                        <Row gutter={16}>
                            <Col>
                                <Radio.Group defaultValue="0" buttonStyle="solid" onChange={(event)=>radioGroup(event)}>
                                    <Radio.Button value="0">长期</Radio.Button>
                                    <Radio.Button value="1">临时</Radio.Button>
                                </Radio.Group>

                            </Col>
                            <Col>
                                <span>开始时间：</span>
                                <DatePicker onChange={onChange} />
                            </Col>
                            <Col>
                                <span>频次：</span>
                                <Select defaultValue="" style={{ width: 120 }} onSelect={(value=>this.state.ordFreqCode=value)}>
                                    {this.state.bdTermFreq.map((item,index) => <Option  key={item.code} value={item.code} >{item.name}</Option>)}
                                </Select>
                            </Col>
                            <Col>
                                <span>用法：</span>
                                <Select style={{ width: 120 }} onSelect={(value=>this.state.ordSupplyCode=value)}>
                                    {this.state.listBdSupply.map((item,index) => <Option  key={item.code} value={item.code} >{item.name}</Option>)}
                                </Select>
                            </Col>
                            <Col>
                                <Input addonBefore="首:"  defaultValue="1" style={{width:100}}/>
                            </Col>
                        </Row>
                    </div>
                    <Divider/>
                    <div style={{marginTop:30}}>
                        {this.state.ordDataList.map((item,index) => <DrugItem ordData={item} key={index}/>)}
                    </div>
                </Spin>


                <Modal
                    title="药品检索"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                >
                    <DrugSearch/>
                </Modal>

            </div>
        );
    }
}

export default DrugIndex;
