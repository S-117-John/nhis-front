import React from "react";
import OrdSearch from "./ordSearch";
import {Tabs, Input, Divider} from "antd";
import Head from "../common/head";
import { MedicineBoxOutlined, DeploymentUnitOutlined,ExperimentOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Search } = Input;

class MedicalAdviceSearch extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div style={{margin: 20}}>
                <Head pkPv={this.props.match.params.pkPv} doctorCode={this.props.match.params.doctorCode}/>

                <Divider/>

                <OrdSearch doctorCode={this.props.match.params.doctorCode} pkPv={this.props.match.params.pkPv}/>
            </div>
        );
    }

}

export default MedicalAdviceSearch;
