import React from "react";
import $ from 'jquery'
import {Button, DatePicker, Select, Radio, Input, Switch, Row, Col} from "antd";
import Head from "../common/head";

const { Option } = Select;

const ordData={pkPd:"",name:'',spec:'',price:''};

function onChange(date, dateString) {
    console.log(date, dateString);
}

function getBdPd(pkPd) {
    $.ajax({
        url: global.constants.nhisApi+"nhis/mobile/drug?pkPd="+pkPd,
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({ordData: data.data});   // 注意这里
        }.bind(this)
    });
}


class DrugIndex extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ordData: ordData,
        };

        getBdPd = getBdPd.bind(this);
    }

    componentDidMount() {
        console.log("pkPd:"+this.props.match.params.pkPd);
        getBdPd(this.props.match.params.pkPd);
    }

    componentWillUnmount() {
    }

    render(){
        return(
            <div style={{margin:30}}>

                <Head pkPv={this.props.match.params.pkPv}/>

                <div style={{textAlign:"right"}}>
                    <Button style={{marginRight:10}} type="primary">新增</Button>
                    <Button style={{marginRight:10}} type="primary">保存</Button>
                    <Button style={{marginRight:10}} type="primary">签署</Button>
                    <Button style={{marginRight:10}} type="primary">删除</Button>
                    <Button style={{marginRight:10}} type="primary">返回</Button>
                </div>

                <div style={{marginTop:30}}>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">长期</Radio.Button>
                        <Radio.Button value="b">临时</Radio.Button>
                    </Radio.Group>

                    <span style={{marginLeft:20}}>开始时间：</span>
                    <DatePicker onChange={onChange} />
                    <span style={{marginLeft:20}}>频次：</span>
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    <span style={{marginLeft:20}}>用法：</span>
                    <Select defaultValue="lucy" style={{ width: 120 }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>

                    <Input addonBefore="首:"  defaultValue="1" style={{width:100,marginLeft:20}}/>

                    <Button style={{marginLeft:10}} type="primary">添加药品</Button>
                </div>

                <div style={{marginTop:30}}>
                    <Row>
                        <Col>
                            <div>
                                <div>
                                    <span style={{fontSize:20}}>{this.state.ordData.name}</span>

                                    <Input addonBefore="用量:" addonAfter="ml"  defaultValue="1" style={{width:200,marginLeft:20}}/>

                                    <Input addonBefore="备注:"   defaultValue="1" style={{width:200,marginLeft:20}}/>
                                </div>
                                <span>【规格】{this.state.ordData.spec}   【单价】{this.state.ordData.price}   【剂量】250.0000ml   【贵重级别】普通物品</span>
                            </div>
                        </Col>
                        <Col>
                            <div style={{marginLeft:20}}>
                                <div>
                                    <span>加急：</span> <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                                </div>
                                <div>
                                    <span>自备：</span> <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                                </div>
                            </div>
                        </Col>
                        <Col>

                            <div style={{marginLeft:20}}>
                                <Button type="primary">抗菌药信息</Button>
                                <Button danger type="primary">删除</Button>
                            </div>
                        </Col>
                    </Row>


                </div>
            </div>
        );
    }
}

export default DrugIndex;
