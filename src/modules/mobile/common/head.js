import React from 'react';
import $ from 'jquery'
import {Button, Col, Row, Space, Table, Tag, notification, Radio} from "antd";

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
        };
    }

    componentDidMount() {

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
            <div>
                <Row>
                    <Col span={6}><h1>{this.state.name}</h1></Col>
                    <Col span={6}><h1>{this.state.bed}床</h1></Col>
                    <Col span={6}> <h1>{this.state.gender}</h1></Col>
                    <Col span={6}> <h1>{this.state.age}</h1></Col>
                </Row>
                <div style={{textAlign:"left"}}>
                    <h2>住院号：{this.state.hosId}  身份：{this.state.hosType}  入院：{this.state.hosDate}   诊断： {this.state.diagName}</h2>
                </div>
            </div>
        );
    }
}

export default Head;
