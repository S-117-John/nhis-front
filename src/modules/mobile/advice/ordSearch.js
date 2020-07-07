import React from "react";
import $ from 'jquery'
import {Button, Col, Input, Popconfirm, Row, Table} from "antd";

function confirm(e) {
    console.log(e);
    window.location.href = "/mobile/drug/index"
}

function cancel(e) {
    console.log(e);

}
const treeData = [];

const data = [];
const columns = [
    {
        title: '医嘱名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <Popconfirm
            title={text}
            onConfirm={confirm}
            onCancel={cancel}
            okText="选中药品"
            cancelText="选中非药品"
        >
            <a href="#">{text}</a>
        </Popconfirm>,
    },
    {
        title: '规格',
        dataIndex: 'spec',
        key: 'spec',
        render: text => <a>{text}</a>,
    },
    {
        title: '包装单位',
        dataIndex: 'unit',
        key: 'unit',
        render: text => <a>{text}</a>,
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        render: text => <a>{text}</a>,
    },
    {
        title: '参考价格',
        dataIndex: 'price',
        key: 'price',
        render: text => <a>{text}</a>,
    },
    {
        title: '库存量',
        dataIndex: 'amount',
        key: 'amount',
        render: text => <a>{text}</a>,
    },
    {
        title: '医保类型',
        dataIndex: 'medicareType',
        key: 'medicareType',
        render: text => <a>{text}</a>,
    },

];

const ordData = [];

class OrdSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            ordData:ordData,
            searchValue: "",
        }
    }

    componentDidMount() {
        this.listOrd($("#value").text())

    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    onSelect (selectedKeys, info){
        console.log(selectedKeys);
    };

    listOrd(value){
        console.log(value);
        if(value!=""){
            $.ajax({
                url: "/nhis/mobile/ord/pd/list?spCode="+value,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({
                        ordData: data.data,
                    });

                }.bind(this)
            });
        }

    }

    render(){
        return(
            <div>
                <div style={{width:800}}>
                    <Row>
                        <Col span={12}>
                            <Input id="search" placeholder="Basic usage" />
                        </Col>
                        <Col span={4}>
                            <Button type="primary"  onClick={()=>this.listOrd($("#search").val())}>搜索</Button>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={4}>
                            <Button type="primary">取消</Button>
                        </Col>
                    </Row>


                </div>
                <div style={{marginTop:20}}>
                    <div>
                        <Table
                            bordered
                            columns={columns}
                            dataSource={this.state.ordData}
                            pagination={false}
                            scroll={{y: 300 }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default OrdSearch;