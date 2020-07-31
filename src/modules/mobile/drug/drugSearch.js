import React from "react";
import {Input, Divider, Table, Space} from "antd";
import $ from "jquery";

const { Search } = Input;

class DrugSearch extends React.Component{

    constructor(props) {
        super(props);
    }

    state = {
        listPkPd:[],//药品id数组
        ordData:null,
    };

    columns = [
        {
            title: '医嘱名称',
            dataIndex: 'nameOrd',
            render: (text, record) => <a>{text}</a>,
        },
        {
            title: '规格',
            dataIndex: 'spec',

            render: text => <a>{text}</a>,
        },
        {
            title: '包装单位',
            dataIndex: 'unit',

            render: text => <a>{text}</a>,
        },
        {
            title: '描述',
            dataIndex: 'desc',

            render: text => <a>{text}</a>,
        },
        {
            title: '参考价格',
            dataIndex: 'price',

            render: text => <a>{text}</a>,
        },
        {
            title: '库存量',
            dataIndex: 'amount',

            render: text => <a>{text}</a>,
        },
        {
            title: '医保类型',
            dataIndex: 'medicareType',

            render: text => <a>{text}</a>,
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <a href='#!' onClick={()=>this.props.handleOk(record.key)}>添加</a>
            ),
        },

    ];

    //检索药品
    listOrd(value){
        console.log(value);
        if(value!=""){
            $.ajax({
                url: window.g.nhisApi+"/nhis/mobile/ord/search?spCode="+value,
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

    //点击行
    rowClick(record){
        var pkPds=[];
        pkPds.push(record.key)
        this.setState({listPkPd:pkPds})
    }

    render(){
        return(
            <div style={{margin: 20}}>
                <div >
                    <Search  onSearch={value => this.listOrd(value)}  enterButton />
                </div>
                <Divider/>
                <div>
                    <Table
                        onRow={record => {
                            return {
                                onClick: event => {this.rowClick(record)}, // 点击行
                                onDoubleClick: event => {},
                                onContextMenu: event => {},
                                onMouseEnter: event => {}, // 鼠标移入行
                                onMouseLeave: event => {},
                            };
                        }}
                        bordered
                        columns={this.columns}
                        dataSource={this.state.ordData}
                        pagination={false}
                        scroll={{y: 500 }}
                    />
                </div>
            </div>
        );
    }

}

export default DrugSearch;
