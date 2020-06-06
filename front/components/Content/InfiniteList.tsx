import * as React from "react";
import ResizableList from "./ResizableList";

const { useEffect, useRef, useState } = React;

const InfiniteTabList  = ({data}) => {

    const listRef          = useRef(null);
    const resizableListRef = useRef(null);

    const [listHeight, setListHeight] = useState(0);


    useEffect(() => {
        setListHeight(resizableListRef.current.offsetHeight);
    });

    useEffect(() => {
        if(!!listRef.current){
            listRef.current.resetAfterIndex(0);
        }
    });

    return (
        <div style={{flex: 1, position: 'relative'}}>
            <ResizableList
                resizableListRef = {resizableListRef}
                listRef          = {listRef}
                listHeight       = {listHeight}
                data             = {data}
            />
        </div>
    )

};


export default InfiniteTabList;
