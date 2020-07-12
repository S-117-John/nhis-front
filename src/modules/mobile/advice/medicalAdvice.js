import React from 'react';
import {Tabs, Input, Divider} from "antd";
import Ord from "./ord";
import Head from "../common/head";
import { MedicineBoxOutlined, DeploymentUnitOutlined,ExperimentOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;


class MedicalAdvice extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div style={{margin: 20}}>
                <Head pkPv={this.props.match.params.pkPv} doctorCode={this.props.match.params.doctorCode}/>

                <Divider/>

                <Tabs defaultActiveKey="1"  tabPosition={"left"}>
                    <TabPane tab={<span><MedicineBoxOutlined />医嘱</span>} key="1">
                        <Ord pkPv={this.props.match.params.pkPv} doctorCode={this.props.match.params.doctorCode}/>
                    </TabPane>
                    <TabPane tab={<span><DeploymentUnitOutlined />检查</span>} key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab={<span><ExperimentOutlined />检验</span>} key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        );
    }

}

export default MedicalAdvice;

