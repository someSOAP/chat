import * as React from "react";
import { Layout } from "antd";
import Message from "./Message";

const { Content } = Layout ;

interface AppContentProps {
    messages: Array<any>,
    msgRef: React.Ref<HTMLDivElement>
}

export const AppContent:React.FC<AppContentProps> = ({messages, msgRef}) => {
    return (
        <Content style={{height: "100%", overflow: "auto"}} >
            {
                messages.map(({text, title, id}, index)=>(
                    <Message
                        text={text}
                        title={title}
                        key={id}
                        msgRef={index === messages.length-1 ? msgRef : null}
                    />
                ))
            }
        </Content>
    )
};

export default AppContent;
