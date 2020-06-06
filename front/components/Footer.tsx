import * as React from "react";
import { Input, Layout } from "antd";
import { SendOutlined } from '@ant-design/icons';
const { Footer } = Layout ;

export interface AppContentProps {
    socket: WebSocket,
    onChange: Function,
    input: string
}

export const AppContent : React.FC<AppContentProps> = ({socket, onChange, input}) => {
    const sendMessage = () => {
        socket.send(JSON.stringify({title: "Name", text: input}));
        onChange("");
    };

    return (
        <Footer style={{ width: '100%' }}>
            <Input
                onChange={({target}) => {
                    onChange(target.value)
                }}
                allowClear
                value={input}
                suffix={<SendOutlined onClick={sendMessage}/>}
                onPressEnter = {sendMessage}
            />
        </Footer>
    )
};

export default AppContent;
