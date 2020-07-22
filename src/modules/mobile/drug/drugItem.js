import React from "react";
import $ from 'jquery';
import {Button, Col, Divider, Input, Row, Switch} from "antd";




class DrugItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ordData: this.props.ordData,
            dosage: '',//用量
            note: '',//备注
            emergency:'',//加急
            own:'',//自备
            skin:'',//皮试
        };
    }

    change(e){
        console.log(e.target.value);    //获取修改后的值
        this.setState({
            dosage : e.target.value
        })
    }

    noteChange(e){
        console.log(e.target.value);    //获取修改后的值
        this.setState({
            note : e.target.value
        })
    }

    //加急
    emergency(checked, event) {
        console.log(checked);    //获取修改后的值
        this.setState({
            emergency : checked
        })
    }

    //自备
    own(checked, event) {
        console.log(checked);    //获取修改后的值
        this.setState({
            own : checked
        })
    }

    //皮试
    skin(checked, event) {
        console.log(checked);    //获取修改后的值
        this.setState({
            skin : checked
        })
    }

    render() {
        return(
            <div>
                <Row>
                    <Col span={14}>
                        <div>
                            <div>
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <span style={{fontSize:15}}>{this.state.ordData.name}</span>
                                    </Col>
                                    <Col span={9}>
                                        <Input addonBefore="用量:" addonAfter={this.state.ordData.unitPackName} value = {this.state.dosage} onChange={(event)=>{this.change(event)}} style={{width:200,marginLeft:20}}/>
                                    </Col>
                                    <Col span={9}>
                                        <Input addonBefore="备注:"  value={this.state.note} onChange={(event)=>{this.noteChange(event)}}  style={{width:200,marginLeft:20}}/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{marginLeft:20}}>
                            <div>
                                <span>加急：</span> <Switch checkedChildren="开启" unCheckedChildren="关闭" onChange={((checked, event) => this.emergency(checked,event))} />
                            </div>
                            <div>
                                <span>自备：</span> <Switch checkedChildren="开启" unCheckedChildren="关闭"  onChange={(checked, event) => this.own(checked,event)}/>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>

                        <div style={{marginLeft:20}}>
                            <Button type="primary">抗菌药信息</Button>
                            <Button danger type="primary">删除</Button>
                        </div>
                    </Col>
                </Row>
                <div style={{textAlign:'left',marginTop:10}}>
                    <Row>
                        <Col span={15}>
                                <span>
                                    【规格】{this.state.ordData.spec}   【单价】{this.state.ordData.price}   【剂量】 {this.state.ordData.packSize} {this.state.ordData.unitPackName}   【贵重级别】{this.state.ordData.flagPrecious==='1' ? "贵重物品":"普通物品"}
                                </span>
                        </Col>
                        <Col>
                            <span visible={this.state.ordData.flagSt===1? 1:0}> <span>皮试：</span> <Switch checkedChildren="待查" unCheckedChildren="不查" onChange={(checked, event) => this.skin(checked,event)}/> </span>
                        </Col>
                    </Row>
                </div>
                <Divider dashed={true}/>
            </div>
        );
    }



}

export default DrugItem;
