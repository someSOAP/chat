import * as React from "react";
import ResizableList from "./ResizableList";
import {Layout} from 'antd';


const Content  = ({data, listRef}) => {

    const resizableListRef = React.useRef(null);

    const [listHeight, setListHeight] = React.useState(0);

    React.useEffect(() => {
        setListHeight(resizableListRef.current.offsetHeight);
    });

    React.useEffect(() => {
        if(!!listRef.current){
            listRef.current.resetAfterIndex(0);
        }
    });

    return (
        <Layout.Content style={{height: "100%", position: 'relative'}}>
            <ResizableList
                resizableListRef = {resizableListRef}
                listRef          = {listRef}
                listHeight       = {listHeight}
                data             = {data}
            />
        </Layout.Content>
    )

};


export default Content;
