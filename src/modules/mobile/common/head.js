import React from 'react';
import {Button, Col, Row, Space, Table, Tag, notification, Radio} from "antd";

class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: "",
            bed: "",
            age: "",
        };
    }

    componentDidMount() {

        console.log("head"+this.props.name);

        // this.serverRequest = $.get(global.patientInfo+"/nhis/mobile/patient?pkPv="+document.getElementById('id').innerText, function (result) {
        //     console.log(result);
        //     if(result.code==400){
        //         notification.open({
        //             message: '提示',
        //             description: result.msg,
        //         });
        //     }
        //     if(result.code==200){
        //         this.setState({
        //             name: result.data.namePi,
        //             gender: result.data.gender,
        //             bed: result.data.bedNo,
        //             age: result.data.agePv,
        //         });
        //     }
        //
        // }.bind(this));

    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={6}><h1>{this.state.name}</h1></Col>
                    <Col span={6}><h3>{this.state.bed}床</h3></Col>
                    <Col span={6}> <h3>{this.state.gender}</h3></Col>
                    <Col span={6}> <h3>{this.state.age}</h3></Col>
                </Row>
                <h3>住院号：13423  身份：灵璧医保  入院：2020-5-30 12:23   诊断： 肺炎</h3>
            </div>
        );
    }
}

export default Head;
