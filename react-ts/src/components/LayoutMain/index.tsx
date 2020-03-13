import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import './layoutMain.less'
import ISider from './component/ISider'

const { Header, Footer, Sider, Content } = Layout;
interface IProps {
    // history?:any;
    // userStore?: userStoreType;
    errors?: string;
    [key: string]: any
}

const initialState = {
    collapsed: false,
};
type State = typeof initialState;
class HomeLayout extends Component<IProps, State> {
    state: State = initialState;
    private toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { children } = this.props;

        return (
            <Layout className='main'>
                <ISider collapsed={this.state.collapsed}></ISider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Copyright © 2014-2020 浙江砺行教育科技有限公司版权所有 浙ICP备19037603号</Footer>
                </Layout>
            </Layout>
        )
    }
};

export default HomeLayout;