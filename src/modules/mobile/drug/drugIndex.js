import React from "react";
import $ from 'jquery';
import {Button, DatePicker, Select, Radio, Input, Switch, Row, Col} from "antd";
import Head from "../common/head";
import DrugItem from "./drugItem";

const { Option } = Select;

const ordDataList=[];

//医嘱信息


function onChange(date, dateString) {
    console.log(date, dateString);
}

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
            this.setState({listBdSupply: data.data});
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

        this.state = {
            ordDataList: ordDataList,//药品数据
            bdTermFreq: [],//频次列表
            listBdSupply:[],//医用用法列表
            ordFreqCode:null,//医嘱频次编码
            ordSupplyCode:null,//医嘱用法编码
            startTime:null,//开始时间
            cnOrd:null,//医嘱数据
            euAlways:'0',
        };

        getBdPd = getBdPd.bind(this);
        listBdTermFreq = listBdTermFreq.bind(this);
        listSupply = listSupply.bind(this);
        save = save.bind(this);
        radioGroup = radioGroup.bind(this);
    }

    componentDidMount() {
        console.log("pkPd:"+this.props.match.params.pkPd);
        getBdPd(this.props.match.params.pkPd);
        listBdTermFreq();
        listSupply();
    }

    componentWillUnmount() {
    }



    render(){
        return(
            <div style={{margin:30}}>

                <Head pkPv={this.props.match.params.pkPv}/>

                <div style={{textAlign:"right"}}>
                    <Button style={{marginRight:10}} type="primary">新增</Button>
                    <Button style={{marginRight:10}} type="primary" onClick={(event)=>save(event)}>保存</Button>
                    <Button style={{marginRight:10}} type="primary">签署</Button>
                    <Button style={{marginRight:10}} type="primary">删除</Button>
                    <Button style={{marginRight:10}} type="primary">返回</Button>
                </div>

                <div style={{marginTop:30}}>
                    <Radio.Group defaultValue="0" buttonStyle="solid" onChange={(event)=>radioGroup(event)}>
                        <Radio.Button value="0">长期</Radio.Button>
                        <Radio.Button value="1">临时</Radio.Button>
                    </Radio.Group>

                    <span style={{marginLeft:20}}>开始时间：</span>
                    <DatePicker onChange={onChange} />
                    <span style={{marginLeft:20}}>频次：</span>

                    <Select defaultValue="" style={{ width: 120 }} onSelect={(value=>this.state.ordFreqCode=value)}>
                        {this.state.bdTermFreq.map((item,index) => <Option  key={item.code} value={item.code} >{item.name}</Option>)}
                    </Select>
                    <span style={{marginLeft:20}}>用法：</span>
                    <Select style={{ width: 120 }} onSelect={(value=>this.state.ordSupplyCode=value)}>
                        {this.state.listBdSupply.map((item,index) => <Option  key={item.code} value={item.code} >{item.name}</Option>)}
                    </Select>

                    <Input addonBefore="首:"  defaultValue="1" style={{width:100,marginLeft:20}}/>

                    <Button style={{marginLeft:10}} type="primary">添加药品</Button>
                </div>

                <div style={{marginTop:30}}>
                    {this.state.ordDataList.map((item,index) => <DrugItem ordData={item} key={index}/>)}
                </div>
            </div>
        );
    }
}

export default DrugIndex;
