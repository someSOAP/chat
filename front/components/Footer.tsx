import * as React from "react";
import { Input, Layout } from "antd";

const { Footer } = Layout ;

export interface AppContentProps {
    socket: WebSocket,
    onChange: Function,
    input: string
}

export const AppContent : React.FC<AppContentProps> = ({socket, onChange, input}) => {
    return (
        <Footer style={{ width: '100%' }}>
            <Input
                onChange={({target}) => {
                    onChange(target.value)
                }}
                value={input}
                onPressEnter = {()=>{
                    socket.send(JSON.stringify({title: "Name", text: input}));
                    onChange("")
                }}
            />
        </Footer>
    )
};

export default AppContent;
