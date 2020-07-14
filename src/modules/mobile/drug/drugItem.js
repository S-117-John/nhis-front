import React from "react";
import $ from 'jquery';
import {Button, Col, Divider, Input, Row, Switch} from "antd";




class DrugItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ordData: this.props.ordData,
        };
    }

    render() {
        return(
            <div>
                <Row>
                    <Col>
                        <div>
                            <div>
                                <span style={{fontSize:20}}>{this.state.ordData.name}</span>

                                <Input addonBefore="用量:" addonAfter="ml"  style={{width:200,marginLeft:20}}/>

                                <Input addonBefore="备注:"   style={{width:200,marginLeft:20}}/>
                            </div>
                            <div style={{textAlign:'left'}}>
                                <span>【规格】{this.state.ordData.spec}   【单价】{this.state.ordData.price}   【剂量】250.0000ml   【贵重级别】普通物品</span>
                            </div>
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
                <Divider dashed={true}/>
            </div>
        );
    }

}

export default DrugItem;
