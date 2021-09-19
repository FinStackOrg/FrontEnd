import React, { useEffect } from 'react';
import {
    useParams,
    useLocation
  } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const TDLink = () => {
    const [code, setCode] = React.useState('');
    const [hasCode, setHasCode] = React.useState(false);
    // let {getCode} = useParams();
    let query = useQuery().toString();
    console.log("Query: "+ query)
    console.log("Type: " + typeof query)
    // setCode(getCode)
    useEffect(() => {
        
        let searchTerm = "="
        let exists = query.indexOf(searchTerm);
        if (exists >= 0) {
            let currentCode = query.slice(exists+1)
            console.log("Code: " + currentCode)
            setCode(currentCode)
            setHasCode(true)
            // now send this code the TD ameritrade lambda
        }
    })
    return (
        <div>
            Hello Collecting your TD ameritrade Login
        </div>
    )
}

export default TDLink;