import React from 'react';
import $ from 'jquery'
import {Button, Col, Row, Space, Table, Tag, notification, Radio, Descriptions} from "antd";



function doctor(code) {
    $.ajax({
        url: global.constants.nhisApi+"nhis/mobile/doctor",
        dataType: 'json',
        data: {code:code},
        cache: false,
        success: function(data) {
            this.setState({doctor: data.data});   // 注意这里
        }.bind(this)
    });
}


class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: "",
            bed: "",
            age: "",
            api: global.constants.nhisApi,
            hosId:'',
            doctor:{name:'',},
        };
        doctor = doctor.bind(this);
    }

    componentDidMount() {

        doctor(this.props.doctorCode);

        console.log("head"+this.props.pkPv);
        console.log("api"+global.constants.nhisApi);
        this.serverRequest = $.get(global.constants.nhisApi+"nhis/mobile/patient?pkPv="+this.props.pkPv, function (result) {
            console.log(result);
            if(result.code==400){
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
                    diagName: result.data.diagName
                });
            }

        }.bind(this));

    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <div style={{marginBottom:20}}>
                <Descriptions title={<div style={{textAlign:"left"}}><h2>{this.state.name}</h2></div>} bordered>
                    <Descriptions.Item label="床位号">{this.state.bed}</Descriptions.Item>
                    <Descriptions.Item label="性别">{this.state.gender}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{this.state.age}</Descriptions.Item>
                    <Descriptions.Item label="医生">{this.state.doctor.name}</Descriptions.Item>
                    <Descriptions.Item label="科室"></Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default Head;
