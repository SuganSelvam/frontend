import React,{useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

function Login(props) {

    // const url ="http://localhost:4040/"
    const url ="https://task1-backend.herokuapp.com/"

    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    

    async function submit(e){

        e.preventDefault();

        console.log("name :",Username)
        console.log("Password :",Password)

        try{
            let output = await fetch(url,{
                method:"POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({name : Username,password : Password})
            })

            let value = await output.json();

            if(Object.keys(value).length === 0){
                alert("User Not Found")
            }else{
                if(value[0].password === Password){
                    console.log("Sucessfully Logging in")
                    props.setstate("Dashboard")
                    props.setName(value[0].name)
                }
                else{
                    alert("Password Incorrect")
                }
            }
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div id="main">
            <div id="content">
                <div>
                    <input type="text" id="login"  placeholder="Login" onChange={e => setUsername(e.target.value)} ></input>
                </div>
                <div>
                    <input type="text" id="password"  placeholder="password" onChange={e => setPassword(e.target.value)}></input>
                </div>
                    <button type="submit" id="btn" onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default Login
