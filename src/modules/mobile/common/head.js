import React from 'react';
import $ from 'jquery'
import {notification, Radio, Descriptions, Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


class Head extends React.Component {
    constructor(props) {
        super(props);
        this.getDoctor();
    }

    state = {
        name: "",
        gender: "",
        bed: "",
        age: "",
        hosId:'',
        doctorName:'',
        deptName:'',
        api:window.g
    };

    componentDidMount() {



        this.serverRequest = $.get(this.state.api.nhisApi+"nhis/mobile/patient?code="+this.props.pvCOde, function (result) {
            if(result.code==400){
                this.props.setBtnDisable(true);
                notification.open({
                    message: '提示',
                    description: result.msg,
                });
            }
            if(result.code==200){

                this.setState({
                    // 姓名
                    name: result.data.namePi,
                    // 性别
                    gender: result.data.gender,
                    // 床位号
                    bed: result.data.bedNo,
                    // 年龄
                    age: result.data.agePv,
                    // 住院号
                    hosId: result.data.piMaster.codeIp,
                    // 患者类型
                    hosType: result.data.piMaster.piCate.name,
                    // 入院日期
                    hosDate: result.data.dateReg,
                    // 诊断
                    diagName: result.data.diagName,
                    deptName: result.data.deptName
                });
            }

        }.bind(this));

    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{ return; };
    }

    getDoctor(){
        console.log('获取医生信息')
        $.ajax({
            url: this.state.api.nhisApi+"nhis/mobile/doctor",
            dataType: 'json',
            data: {code:this.props.doctorCode},
            success: function(data) {
                if(data.code==200){
                    this.setState({doctorName: data.data.name});   // 注意这里
                }else{
                    this.props.setBtnDisable(true);
                }
            }.bind(this)
        });
    }

    goBack(){
        console.log('点击了退出方法')

        alert('退出')
    }

    render() {
        return (
            <div style={{marginBottom:20}}>
                <div style={{textAlign:'right'}}>
                    <Button type="primary" onClick={event => this.goBack()}>退出</Button>
                </div>
                <Descriptions title={<div style={{textAlign:"left"}}><h2>{this.state.name}</h2></div>}  column={6} size='small'>
                    <Descriptions.Item label="床位号">{this.state.bed}</Descriptions.Item>
                    <Descriptions.Item label="性别">{this.state.gender}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{this.state.age}</Descriptions.Item>
                    <Descriptions.Item label="医生">{this.state.doctorName}</Descriptions.Item>
                    <Descriptions.Item label="科室">{this.state.deptName}</Descriptions.Item>
                    <Descriptions.Item label="诊断">{this.state.diagName}</Descriptions.Item>
                </Descriptions>

            </div>
        );
    }
}

export default Head;
