import * as React from "react";
import {Layout} from "antd";
import Message from "./Message";

const { Content } = Layout ;

export const AppContent = ({messages}) => {
    return (
        <Content style={{height: "100%", overflow: "auto"}}>
            {
                messages.map((msg)=>(
                    <Message text={msg.text} title={msg.title} key={msg.id}/>
                ))
            }
        </Content>
    )
};

export default AppContent;
