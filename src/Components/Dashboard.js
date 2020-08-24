import React, { useState } from 'react'
import io from "socket.io-client"

// const ENDPOINT = "http://localhost:4040/";
const ENDPOINT = "https://task1-backend.herokuapp.com/";


var socket = io.connect(ENDPOINT)

function Dashboard(props) {

    const [button1, setButton1] = useState(false)
    const [button2, setButton2] = useState(false)

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
        <div id="content">
            <h3>Welcome {props.name}</h3>
            <div>
                <button type="button"  id="button1" disabled={button1} onClick={clicked1}>Button 1</button>
            </div>
            <div>
                <button type= "button"  id="button2" disabled={button2} onClick={clicked2}>Button 2</button>
            </div>
        </div>
    )
}

export default Dashboard
