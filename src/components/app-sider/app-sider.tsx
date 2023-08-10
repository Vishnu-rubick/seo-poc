import React from "react";
import { Layout, Space, Col, Row } from "antd";

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#00235B',
    height: 1080,
};

const logoStyle: React.CSSProperties = { color: '#fff', padding: '8px 0', top: 46, position: 'relative' };

const menuStyle: React.CSSProperties = { color: '#fff', padding: '8px 0', top: 108, position: 'relative' };

const AppSider = () => (
    <Sider style={siderStyle} width={100}>
        <Row gutter={[24, 24]}>
            <Col className="gutter-row" span={24}>
                <div style={logoStyle}>textmercato</div>
            </Col>
        </Row>
        <Space direction="vertical" style={menuStyle} size={[0, 46]}>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" span={24}>
                    <div style={logoStyle}>Home</div>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" span={24}>
                    <div style={logoStyle}>Website IQ</div>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" span={24}>
                    <div style={logoStyle}>Key Metrics</div>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" span={24}>
                    <div style={logoStyle}>Keywords</div>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" span={24}>
                    <div style={logoStyle}>Backlinks</div>
                </Col>
            </Row>
        </Space>
    </Sider>
);

export default AppSider;