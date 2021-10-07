import { React, useState } from "react";
import ReactDOM from "react-dom";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";
import "./styles.css";
import SimpleCard from "./Card";
import { CodeSharp } from "@mui/icons-material";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";


const TestGrid = ({accounts, setAccounts, username, reload, setReload}) =>{
    const [items, setItems] = useState({
        "left": [
            { name: "Bob" },
            { name: "joe" },
            { name: "jason" },
            { name: "chris" },
            { name: "heath" },
            { name: "Rich" }
        ],
    });
    const [expand, setExpand] = useState(false)

    const gridAccounts = () => {
        // console.log("CAme here????")
        return accounts.map((account, index) => {
            // console.log("account name: " + account.name)
            return (<GridItem key={account.name}>
                    <div className="grid-item">
                        <SimpleCard account={account} username={username} reload={reload} setReload={setReload}/>
                    </div>
                    </GridItem>
            )
        })
    }
    function onChange(sourceId, sourceIndex, targetIndex) {
        console.log("sourceId: ", sourceId)
        console.log("sourceIndex: ", sourceIndex)
        console.log("Target Index: ", targetIndex)
        console.log("Items type: "  + typeof(items))
    
        const result = swap(accounts, sourceIndex, targetIndex);
        
        setAccounts(result)
        for (var i = 0; i < accounts.length; i++) {
            console.log("Name: " + result[i].name)
        }
        return result;

    }
    return (
        <GridContextProvider onChange={onChange}>
            <div className="container">
                <GridDropZone
                    className="dropzone"
                    id="left"
                    boxesPerRow={2}
                    rowHeight={460}
                >
                    {/* {items.left.map(item => (
                        <GridItem key={item.name}>
                            <div className="grid-item">
                                <div className="grid-item-content">
                                {item.name.toUpperCase()}
                                </div>
                            </div>
                        </GridItem>
                    ))} */}
                    {gridAccounts()}

                </GridDropZone>
            </div>
        </GridContextProvider>
    );
}
export default TestGrid;
