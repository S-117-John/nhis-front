import React from "react";
import $ from 'jquery';
import {Button, Col, Divider, Input, Row, Switch,InputNumber } from "antd";




class StopOrdItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ordData: this.props.ordData,
        };
    }



    render() {
        return(
            <div >
                <Row>
                    <Col>
                        <div>
                            <div >
                                <span >{this.state.ordData.dateStart}</span>
                                <span style={{width:100,marginLeft:30}}>频次：{this.state.ordData.nameFreq}</span>
                            </div>
                            <div>
                                <span >{this.state.ordData.nameFreq}</span>
                                <span>{this.state.ordData.nameOrd}</span>
                                <span style={{width:100,marginLeft:30}}>用量：{this.state.ordData.quan}</span>
                                <span style={{width:100,marginLeft:30}}>末次</span>
                                {/*onChange={event => this.state.ordData.lastNum = event.target.value*/}
                                <InputNumber name={this.props.index} addonBefore="末次:"  min={0} max={99999} defaultValue={this.state.ordData.quan} onChange={event => this.state.ordData.lastNum = event}/>
                               
                            </div>
                        </div>
                    </Col>
                </Row>
                <Divider dashed={true}/>
            </div>
        );
    }

}

export default StopOrdItem;
