import React from "react";
import OrdSearch from "./ordSearch";
import {Tabs, Input} from "antd";
import Head from "../common/head";

const { TabPane } = Tabs;
const { Search } = Input;

class MedicalAdviceSearch extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Head pkPv={this.props.match.params.pkPv}/>
                <Tabs defaultActiveKey="1"  tabPosition={"left"}>
                    <TabPane tab="医嘱" key="1">
                        <OrdSearch value={this.props.match.params.value} pkPv={this.props.match.params.pkPv}/>
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

export default MedicalAdviceSearch;
