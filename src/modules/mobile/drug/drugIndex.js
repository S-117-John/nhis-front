import React from "react";
import $ from 'jquery';
import {Button, DatePicker, Select, Radio, Input, Switch, Row, Col, Spin, Space, Divider, Modal} from "antd";
import Head from "../common/head";
import DrugItem from "./drugItem";
import DrugSearch from "./drugSearch";
import ord from "../advice/ord";

const { Option } = Select;

const ordDataList=[];

//医嘱信息



//获取药品明细








//长期/临时切换
function radioGroup(e) {
    console.log(e.target.value);
    this.state.euAlways = e.target.value;
}

class DrugIndex extends React.Component{

    constructor(props) {
        super(props);
        radioGroup = radioGroup.bind(this);
        this.listBdTermFreq();
        this.listSupply();
    }


    state = {
        ordDataList: [],//药品数据
        bdTermFreq: [],//频次列表
        listBdSupply:[],//医用用法列表
        ordFreqCode:null,//医嘱频次编码
        ordSupplyCode:null,//医嘱用法编码
        startTime:null,//开始时间
        cnOrd:null,//医嘱数据
        euAlways:'0',
        loading: false,
        visible: false,
        firstTime:''//首次
    };

    componentDidMount() {
        console.log("pkPd:"+this.props.match.params.pkPd);


        this.getBdPd(this.props.match.params.pkPd);
    }

    componentWillUnmount() {
        this.setState = ()=>false;

    }

    //频次
    listBdTermFreq() {
        $.ajax({
            url: window.g.nhisApi+"nhis/mobile/bd/term/freq",
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("获取到频次数据"+JSON.stringify(data))
                this.setState({bdTermFreq: data.data});
            }.bind(this)
        });
    }

    // 医嘱用法
    listSupply() {
        $.ajax({
            url: window.g.nhisApi+"nhis/mobile/bd/supply",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({listBdSupply: data.data});
            }.bind(this)
        });
    }

    //删除子组件
    deleteChild(id){
        var newArr = this.state.ordDataList.reduce((total, current) => {
            current.pkCnOrd !== id && total.push(current);
            return total;
        }, []);
        this.setState({
            ordDataList:newArr
        })
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    //查询药品明细
    getBdPd(pkPd) {
        $.ajax({
            url: window.g.nhisApi+"nhis/mobile/drug/list?ids="+pkPd,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("药品明细："+data.data);
                this.setState({ordDataList: data.data});
            }.bind(this)
        });
    }

    //弹出层选中药品
    handleOk = (key) => {
        console.log(key);
        this.setState({
            visible: false,
        });
        //根据药品主键查询药品信息
        $.ajax({
            url: window.g.nhisApi+"nhis/mobile/drug?pkPd="+key,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data.data);
                let ordList = [];

                this.state.ordDataList.map(function (item,index) {
                    ordList.push(item);
                })
                ordList.push(data.data);

                this.setState({
                    ordDataList: ordList
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


    onDateStartChange(date, dateString) {
        this.setState({
            startTime:dateString
        })
    }

    //数据整合
    resultDataFactory(){
        this.state.ordDataList.map((item,index) => {
            item.codeFreq = this.state.ordFreqCode;//频次
            item.codeSupply = this.state.ordSupplyCode;//医嘱用法编码
            item.firstNum = this.state.firstTime;//首日次数
            item.quan = this.refs[index].state.dosage;//用量
            item.flagSelf = this.refs[index].state.own?'1':'0';//自备药
            item.euSt = this.refs[index].state.skin?'1':'0';//皮试
            item.noteOrd = this.refs[index].state.note;//医嘱备注
            item.dateStart = this.state.startTime;//开始时间
            item.euAlways = this.state.euAlways;//长期or临时
            item.euPvtype = '3';//就诊类型
            item.descOrd = this.state.descOrd;
            item.pkOrd = item.pkPd;
            item.dosage = this.refs[index].state.dosage;//用量
        })
    }


    //保存并签署
    sign(e){
        this.resultDataFactory();

        var jsonData = {
                doctorCode:this.props.match.params.doctorCode,
                codeIp:this.props.match.params.pkPv,
                codeDept:this.props.match.params.currentDeptCode,
                cnOrderList : this.state.ordDataList,
        };
        $.ajax({
            contentType: "application/json;charset=UTF-8",//指定消息请求类型
            url: window.g.nhisApi+"nhis/mobile/ord/saveAndSignDrug",
            data:JSON.stringify(jsonData),
            type: "POST",
            cache: false,
            success: function(data) {
                this.setState({loading: false });
                if(data.code==200){
                    //跳转至首页
                    this.props.history.push('/home/'+this.props.match.params.pkPv+"/"+this.props.match.params.doctorCode+"/"+this.props.match.params.currentDeptCode);
                }

            }.bind(this),
            error:function (data) {
                this.setState({loading: false });
            }.bind(this)
        });
    }

    //首次
    firstTime(event) {
        console.log('首次'+event.target.value);    //获取修改后的值
        this.setState({
            firstTime : event.target.value
        })
    }


//保存
 save(event) {
    this.setState({loading: true });
    this.resultDataFactory();
     var jsonData = {
         doctorCode:this.props.match.params.doctorCode,
         codeIp:this.props.match.params.pkPv,
         codeDept:this.props.match.params.currentDeptCode,
         cnOrderList : this.state.ordDataList,
     };
    $.ajax({
        contentType: "application/json;charset=UTF-8",//指定消息请求类型
        url: window.g.nhisApi+"nhis/mobile/ord/saveDrug",
        data:JSON.stringify(jsonData),
        type: "POST",
        cache: false,
        success: function(data) {
            this.setState({loading: false });
            if(data.code==200){
                this.props.history.push('/home/'+this.props.match.params.pkPv+"/"+this.props.match.params.doctorCode+"/"+this.props.match.params.currentDeptCode);
            }

            //跳转至首页

        }.bind(this),
        error:function (data) {
            console.log("保存失败");
            this.setState({loading: false });
        }.bind(this)
    });
}

    render(){
        return(
            <div style={{margin:30}}>
                <Spin spinning={this.state.loading}>
                    <Head pkPv={this.props.match.params.pkPv} doctorCode={this.props.match.params.doctorCode}/>
                    <Divider/>
                    <div style={{textAlign:"right"}}>
                        <Space>
                            <Button type="primary" onClick={this.showModal}>新增子医嘱</Button>
                            <Button type="primary" onClick={(event)=>this.save(event)}>保存</Button>
                            <Button type="primary" onClick={(event)=>this.sign(event)}>签署</Button>
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
                                <DatePicker showTime={{ format: 'HH:mm' }}  onChange={(date,dateString)=>this.onDateStartChange(date,dateString)} />
                            </Col>
                            <Col>
                                <span>频次：</span>
                                <Select style={{ width: 120 }} onSelect={(value=>this.state.ordFreqCode=value)}>
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
                                <Input addonBefore="首:"  onChange={event => this.firstTime(event)} style={{width:100}}/>
                            </Col>
                        </Row>
                    </div>
                    <Divider/>
                    <div style={{marginTop:30}}>
                        {this.state.ordDataList.map((item,index) => <DrugItem ref={index} ordData={item} key={index} deleteChild={this.deleteChild.bind(this)}/>)}
                    </div>
                </Spin>


                <Modal
                    title="药品检索"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                    footer={null}
                >
                    <DrugSearch handleOk={this.handleOk}/>
                </Modal>

            </div>
        );
    }


}

export default DrugIndex;
