import React from "react";
import {Button, Col, Input, Row, Table,Select, Radio, Tree, Switch,Divider, Space, Spin, Form, DatePicker,Modal} from "antd";
import $ from 'jquery'


const { Option } = Select;
const {Search} = Input;

//检验
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}



const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const Demo = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
}
const dateTimeonfig = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};
//长期/临时切换
function radioGroup(e) {
    console.log(e.target.value);
    this.state.euAlways = e.target.value;
}
//频次
function listBdTermFreq() {
    $.ajax({
        url: global.constants.nhisApi+"nhis/mobile/bd/term/freq",
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({bdTermFreq: data.data});
        }.bind(this)
    });
}
class DiagTreat extends React.Component {
    constructor(props) {
        super(props);

        listBdTermFreq = listBdTermFreq.bind(this);
        radioGroup = radioGroup.bind(this);

    }

    state = {
        ordData: this.props.ordData,
        loading:false,
        bdTermFreq: [],//频次列表
        ordFreqCode:'',//频次
        data: [],
        treeData: [],
        listType:[],
        first: '',//首
        amount:'',//用量
        exeDept:'',//执行科室
        note:'',//备注
    }

    componentDidMount() {
        listBdTermFreq();
        console.log("医嘱ord:" + this.props.doctorCode);
    }

    componentWillUnmount() {
        console.log("销毁")
    }


    onLoadData = treeNode => {
        const {treeData} = this.state;
        return new Promise(resolve => {
            const {props} = treeNode;

            setTimeout(() => {

                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
        });
    };


    toAdviceSearch(value) {
        this.props.history.push('/medicalAdviceSearch/' + this.props.pkPv + "/" + this.props.doctorCode + "/" + value)
    }

    // 保存模板
    saveOrdTemp() {
        this.setState({loading: true});

        sleep(2000).then(() => {
            this.setState({loading: false});
        })
    }

    destroyAll() {
        console.log(23123213213);
        this.props.destroyModal();
    }



    render() {
        return (
            <div>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    <div>
                        <Form
                            {...layout}
                            name="basic"
                        >
                            <div style={{textAlign:'left'}}>
                                <Space>
                                    <Radio.Group defaultValue="0" buttonStyle="solid" onChange={(event)=>radioGroup(event)}>
                                        <Radio.Button value="0">长期</Radio.Button>
                                        <Radio.Button value="1">临时</Radio.Button>
                                    </Radio.Group>
                                    <span>开始时间<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" /></span>
                                    <Switch checkedChildren="开启" unCheckedChildren="关闭"  />
                                </Space>
                            </div>
                            <div style={{textAlign:'center'}}>
                                <h2>{this.state.ordData.dataList[0].NAME}</h2>
                                <span>编码：{this.state.ordData.dataList[0].CODE}   单价: {this.state.ordData.dataList[0].PRICESTR} </span>
                                <br/>
                                <span>备注：{this.state.ordData.dataList[0].DESCORD} </span>
                                <br/>
                            </div>

                            <Form.Item label="频次：">
                                <Select  onSelect={(value=>this.state.ordFreqCode=value)}>
                                        {this.state.bdTermFreq.map((item,index) => <Option  key={item.code} value={item.code} >{item.name}</Option>)}
                                    </Select>
                            </Form.Item>
                            <Form.Item
                                label="首"
                                rules={[{required: false, message: '请输入首次!'}]}
                            >
                                <Input onChange={event => this.state.first = event.target.value}/>
                            </Form.Item>
                            <Form.Item
                                label="用量"
                                rules={[{required: false, message: '请输入用量!'}]}
                            >
                                <Input addonAfter={this.state.ordData.unitPackName} onChange={event => this.state.amount = event.target.value}/>
                            </Form.Item>
                            <Form.Item label="执行科室" rules={[{required: true, message: '请选择执行科室'}]}>
                                <Select onSelect={(value=>this.state.exeDept=value)}>
                                    {this.state.ordData.exDeptList.map((item,index) => <Option  key={item.PK_DEPT} value={item.PK_DEPT} >{item.NAME_DEPT}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="备注"
                                rules={[{required: false, message: '请输入备注!'}]}
                            >
                                <Input onChange={event => this.state.note = event.target.value}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>

            </div>
        );
    }
}

// export default withRouter(Ris);
export default DiagTreat;
