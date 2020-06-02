import * as React from "react";
import {Input, Layout} from "antd";

const { Footer } = Layout ;

export const AppContent = ({socket, onChange, input}) => {
    return (
        <Footer style={{ width: '100%' }}>
            <Input
                onChange={({target}) => {
                    onChange(target.value)
                }}
                value={input}
                onPressEnter = {(event)=>{
                    debugger;
                    socket.send(JSON.stringify({title: "Name", text: input }));
                    onChange("");
                    console.log(event);
                }}
            />
        </Footer>
    )
};

export default AppContent;
