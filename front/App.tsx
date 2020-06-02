import * as React from "react";
import { Input, Layout } from 'antd';
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

export interface HelloProps {
    compiler: string;
    framework: string;
}


export const App = (props: HelloProps) => {
    const socket : WebSocket = React.useMemo(() : WebSocket => new WebSocket(`ws://${process.env.URL_API}/chat`), []);

    const [messages, setMessages] = React.useState([]);
    const [input, onChange] = React.useState("");

    React.useEffect(()=>{
        fetch('messages')
            .then(res=>res.json())
            .then(setMessages);

    }, []);

    socket.addEventListener('message', ({data}) => {
        setMessages([...messages, JSON.parse(data)]);
    });

    return (
        <Layout style = {{position: "relative", height: "100%"}}>
            <Header/>
            <Content messages={messages}/>
            <Footer onChange={onChange} input={input} socket={socket}/>
        </Layout>
    )
};
