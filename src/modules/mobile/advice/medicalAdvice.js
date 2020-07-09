import React from 'react';
import {Tabs, Input} from "antd";
import Ord from "./ord";
import Head from "../common/head";

const { TabPane } = Tabs;


class MedicalAdvice extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div style={{margin: 20}}>
                <Head pkPv={this.props.match.params.pkPv} doctorCode={this.props.match.params.doctorCode}/>
                <Tabs defaultActiveKey="1"  tabPosition={"left"}>
                    <TabPane tab="医嘱" key="1">
                        <Ord pkPv={this.props.match.params.pkPv}/>
                    </TabPane>
                    <TabPane tab="检查" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="检验" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        );
    }

}

export default MedicalAdvice;

