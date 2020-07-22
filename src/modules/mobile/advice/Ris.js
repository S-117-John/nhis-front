import React from "react";
import {Button, Col, Input, Row, Table, Select, Radio, Tree, Divider, Space, Spin, Form, DatePicker,Modal} from "antd";
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {SnippetsOutlined, CheckOutlined, RollbackOutlined} from '@ant-design/icons';
const { Option } = Select;

const {Search} = Input;


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
class Ris extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ordData: this.props.ordData,
            loading:false,
        };
    }

    state = {
        data: [],
        ordData: null,
        treeData: [],
        loading: false,
        startTime:'',
        exeDept:'',
        body:'',//检查部位
        purpose:'',//检查目的
        description:'',//病情描述
        notice:'',//注意事项
        note:'',//备注
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }




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

                            <Form.Item name="date-time-picker" label="开始时间" {...dateTimeonfig}>
                                <DatePicker showTime={{ format: 'HH:mm' }}  format="YYYY-MM-DD HH:mm" onChange={(data,dateString)=>this.state.startTime=dateString} />
                            </Form.Item>

                            <div style={{textAlign:'center'}}>
                                <h1>{this.state.ordData.dataList[0].NAME}</h1>
                                <span>类型：{this.state.ordData.dataList[0].NAME_TYPE} 单价:{this.state.ordData.dataList[0].PRICESTR} 申请单号：{this.state.ordData.codeApple[0]}</span>
                            </div>

                            <Form.Item label="执行科室" rules={[{required: true, message: '请选择执行科室'}]} name="exDept">
                                <Select style={{ width: 290 }} defaultValue={this.state.ordData.exDeptList[0].PK_DEPT} onSelect={value=>this.state.exeDept=value} >
                                    {this.state.ordData.exDeptList.map((item,index) => <Option  key={item.PK_DEPT} value={item.PK_DEPT} >{item.NAME_DEPT}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="检查部位"
                                name="body"
                                rules={[{required: false, message: '请输入检查部位!'}]}
                            >
                                <Input defaultValue={this.state.ordData.dataList[0].DESC_BODY} onChange={event => this.state.body = event.target.value}/>
                            </Form.Item>

                            <Form.Item
                                label="检查目的"
                                name="purpose"
                                rules={[{required: false, message: '请输入检查目的!'}]}
                            >
                                <Input onChange={event => this.state.purpose=event.target.value}/>
                            </Form.Item>

                            <Form.Item
                                label="病情描述"
                                name="description"
                                rules={[{required: false, message: '请输入病情描述!'}]}
                            >
                                <Input onChange={event => this.state.description = event.target.value}/>
                            </Form.Item>

                            <Form.Item
                                label="注意事项"
                                name="notice" defaultValue={this.state.ordData.dataList[0].DESC_ATT}
                                rules={[{required: false, message: '请输入注意事项!'}]}
                            >
                                <Input onChange={event => this.state.notice = event.target.value}/>
                            </Form.Item>

                            <Form.Item
                                label="备注"
                                name="note"
                                rules={[{required: false, message: 'Please input your password!'}]}
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
export default Ris;
