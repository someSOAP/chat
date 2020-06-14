import * as React from "react";
import { VariableSizeList as List } from "react-window";
import ResizableMessage from "./ResizableMessage";
import { useWindowSize } from "./index";

export const ResizableListContext = React.createContext(null);

const ResizableList = ({listHeight, resizableListRef, listRef, data = []}) => {
    const sizeMap = React.useRef({});

    const setSize = React.useCallback((index, size) => {
        sizeMap.current = { ...sizeMap.current, [index]: size };
    }, []);


    const getSize = React.useCallback(
        (index) => sizeMap.current[index] + 10 || 150,
        []
    );
    const [windowWidth] = useWindowSize();

    return (
        <ResizableListContext.Provider value={{ setSize, windowWidth }}>
            <div style={{position: "relative", height: "100%"}} ref={resizableListRef}>
                <List
                    height    = {listHeight}
                    itemCount = {data.length}
                    itemSize  = {getSize}
                    width     = "100%"
                    ref       = {listRef}
                    onItemsRendered = {({overscanStartIndex}) => {
                        if(overscanStartIndex !== null && !!listRef.current){
                            listRef.current.resetAfterIndex(overscanStartIndex)
                        }
                    }}
                >
                    {
                        ({index, style}) => {
                            const {title, text, dateString} = data[index];
                            return (
                                <div style={style}>
                                    <ResizableMessage title={title} text={text} dateString={dateString} index={index}/>
                                </div>
                            )
                        }
                    }

                </List>
            </div>
        </ResizableListContext.Provider>
    );
};

export default ResizableList;
