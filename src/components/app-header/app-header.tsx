import { Layout } from "antd";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'left',
    height: 82,
    fontSize: '22px',
    fontWeight: 500,
    lineHeight: '82px',
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
    paddingInline: '30px'
};

const appHeaderStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const AppHeader = () => (
    <>
        <div className="app-header-container" style={appHeaderStyle}>
            <Header style={headerStyle} >Hi Rubick</Header>
            <img src="src/assets/common/default-user.svg" alt="" />
        </div>
    </>
);

export default AppHeader;
