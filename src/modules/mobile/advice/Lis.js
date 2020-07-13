import React from "react";
import {Button, Col, Input, Row, Table, Radio, Tree, Divider, Space, Spin} from "antd";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {SnippetsOutlined, CheckOutlined, RollbackOutlined} from '@ant-design/icons';


const { Search } = Input;


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}




class Lis extends React.Component{
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        ordData:null,
        treeData: [],
        loading: false
    }
    componentDidMount() {

        this.serverRequest = this.listEmpOrd();

        console.log("医嘱ord:"+this.props.doctorCode);
    }

    componentWillUnmount() {

    }


    onLoadData = treeNode => {
        const { treeData } = this.state;
        return new Promise(resolve => {
            const { props } = treeNode;

            setTimeout(() => {

                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
        });
    };



    // 获取检查模板
    listEmpOrd(){
        $.ajax({
            url: global.constants.nhisApi+"nhis/mobile/ord/ris/temp",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({treeData:data.data});   // 注意这里
            }.bind(this)
        });
    }

    //选择树节点
    onSelect = (selectedKeys, info) =>{

        console.log(selectedKeys);
        $.ajax({
            url: global.constants.nhisApi+"nhis/mobile/ord/temp/detail",
            dataType: 'json',
            data:{pkOrdSet:selectedKeys[0]},
            cache: false,
            success: function(data) {
                this.setState({ordData: data.data});   // 注意这里
            }.bind(this)
        });
    };

    toAdviceSearch(value){
        this.props.history.push('/medicalAdviceSearch/'+this.props.pkPv+"/"+this.props.doctorCode+"/"+value)
    }

    // 保存模板
    saveOrdTemp(){
        this.setState({ loading: true });

        sleep(2000).then(() => {
            this.setState({ loading: false });
        })
    }

    render(){
        return(
            <div>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    <div style={{width:500}}>
                        <Search  onSearch={value => this.toAdviceSearch(value)}  enterButton />
                    </div>

                    <div style={{marginTop:20}}>
                        <Row>
                            <Col span={5}>
                                <div>
                                    <Radio.Group defaultValue="a" buttonStyle="solid">
                                        <Radio.Button value="a">模板</Radio.Button>
                                        <Radio.Button value="b">常用</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <div>
                                    <Tree
                                        height={500}
                                        loadData={this.onLoadData}
                                        treeData={this.state.treeData}
                                        showIcon={true}
                                        icon={<SnippetsOutlined />}
                                        onSelect={this.onSelect}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Spin>

            </div>
        );
    }
}

export default withRouter(Lis);
