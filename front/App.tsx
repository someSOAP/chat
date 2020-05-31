import * as React from "react";
import { Input, Layout } from 'antd';
import 'antd/dist/antd.css';
import Message from "./components/Message";

export interface HelloProps {
    compiler: string;
    framework: string;
}

const { Header, Footer, Content } = Layout;

export const App = (props: HelloProps) => {
    const socket : WebSocket = React.useMemo(() : WebSocket => new WebSocket(`ws://${process.env.URL_API}/chat`), []);


    const [messages, setMessages] = React.useState([]);
    const [input, onChange] = React.useState("");

    React.useEffect(()=>{
        fetch('messages')
            .then(res=>res.json())
            .then(setMessages);

    }, []);

    socket.addEventListener('message', (event) => {
        setMessages([...messages, JSON.parse(event.data)]);
    });

    return (
        <Layout>
            <Header style={{ position: 'fixed', top: 0, zIndex: 1, width: '100%', color: "white" }}>
                Hello from {props.compiler} and {props.framework}!
            </Header>
            <Content>
            {
                messages.map((msg)=>{
                    return (
                        <Message text={msg.text} title={msg.title} key={msg.id}/>
                    )
                })
            }
            </Content>
            <Footer style={{ position: 'fixed', bottom: 0, zIndex: 1, width: '100%' }}>
                <Input
                    onChange={(event) => {
                        onChange(event.target.value)
                    }}
                    value={input}
                    onPressEnter = {()=>{
                        socket.send(JSON.stringify({title: "Name TODO", text: input }));
                        onChange("");
                    }}
                />
            </Footer>
        </Layout>
    )
};
