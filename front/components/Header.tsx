import * as React from "react";
import { Layout } from 'antd';

const { Header } = Layout ;
export const AppHeader = () => {
    return (
        <Header style={{ width: '100%', color: "white" }}>
            Chat available by <a href={`http://${process.env.URL_API}`}>Link</a>
        </Header>
    )
};

export default AppHeader;
