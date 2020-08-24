
// Importing React and Client Socket Headers
import React, { useState } from 'react'
import io from "socket.io-client"


//Change Endpoint to local Host if You are runnign along with backend
// const ENDPOINT = "http://localhost:4040/";
const ENDPOINT = "https://task1-backend.herokuapp.com/";

//Creating socket to connect to SERVER 
var socket = io.connect(ENDPOINT)

function Dashboard(props) {


    //State to handle Button clicked to be disabled
    const [button1, setButton1] = useState(false)
    const [button2, setButton2] = useState(false)


    //On click event to send data to server to send every other Client
    function clicked1(){
        socket.emit("click1",{
            clicked:true
        })
    }

    function clicked2(){
        socket.emit("click2",{
            clicked:true
        })
    }

    //data coming from server to change the button state value
    socket.on("click1", data => {
        if (data.clicked === true)
        {
            setButton1(!button1)
        }
    })

    socket.on("click2", data => {
        if (data.clicked === true)
        {
            setButton2(!button2)
        }
    })


    return (
        <div id="main">
            <div className="content">
                <div className="heading">Welcome {props.name}</div>
                <div>
                    <button type="button"  id="button1" disabled={button1} onClick={clicked1}>Button 1</button>
                </div>
                <div>
                    <button type= "button"  id="button2" disabled={button2} onClick={clicked2}>Button 2</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
