import axios from "axios";
const { createContext, useState, useEffect } = require("react");
 export const userContext = createContext({});

 function UserContextProvider({children}){
    const [user,setUser]=useState(null);
    const [ready,setReady]=useState(false);
    useEffect(()=>{
        if(!user){
            axios.get('/profile').then(({data}) => {
                setUser(data);
                console.log(data);
                setReady(true);
            });
        };
    },[]);
    return( 
        <userContext.Provider value={{user,setUser,ready}}>
            {children}
        </userContext.Provider>);
 }

 export default UserContextProvider;

