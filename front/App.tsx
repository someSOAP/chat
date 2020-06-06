import * as React from "react";
import { Layout } from 'antd';
import Header from './components/Header'
// import Content from './components/Content'
import InfiniteTabList from "./components/InfiniteList";
import Footer from './components/Footer'

export const App:React.FC = () => {
    const socket : WebSocket = React.useMemo(() : WebSocket => new WebSocket(`ws://${process.env.URL_API}/chat`), []);

    const [messages, setMessages] = React.useState([]);
    const [input, onChange] = React.useState("");
    const msgRef : React.Ref<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

    socket.onmessage = ({data}) => {
        setMessages([...messages, JSON.parse(data)]);
    };

    React.useEffect(()=>{
        fetch('messages')
            .then(res=>res.json())
            .then(setMessages);

    }, []);

    React.useEffect(()=>{
        if(msgRef.current){
            msgRef.current.scrollIntoView();
        }
    }, [messages]);


    return (
        <Layout style = {{position: "relative", height: "100%"}}>
            <Header/>
            <InfiniteTabList data={messages}/>
            <Footer onChange={onChange} input={input} socket={socket} />
        </Layout>
    )
};
