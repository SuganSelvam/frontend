import React,{useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

function Login(props) {

    // const url ="http://localhost:4040/"
    const url ="https://task1-backend.herokuapp.com/"

    const [LoginUsername, setLoginUsername] = useState("")
    const [LoginPassword, setLoginPassword] = useState("")


    const [RegisterUsername , setRegisterUsername] = useState("")
    const [RegisterPassword1 , setRegisterPassword1] = useState("")
    const [RegisterPassword2 , setRegisterPassword2] = useState("")
    

    async function submitLogin(e){

        e.preventDefault();

        console.log("name :",LoginUsername)
        console.log("Password :",LoginPassword)

        try{
            let output = await fetch(url,{
                method:"POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({name : LoginUsername,password : LoginPassword, SubmitType:"Login"})
            })

            let value = await output.json();

            console.log("Value in Login : ",value)

            if(Object.keys(value.dataUser).length === 0){
                alert("User Not Found")
            }else{
                if(value.result === true){
                    console.log("Sucessfully Logging in")
                    props.setstate("Dashboard")
                    props.setName(value.dataUser[0].name)
                }
                else{
                    alert("Password Incorrect")
                }
            }
        }catch(err){
            console.log(err)
        }

    }


    async function submitRegister(e){

        e.preventDefault();

        if(RegisterPassword1 === RegisterPassword2){
            try{

                let output = await fetch(url,{
                    method:"POST",
                    headers: {"Content-type":"application/json"},
                    body: JSON.stringify({name : RegisterUsername,password : RegisterPassword1, SubmitType:"Register"})
                })
    
                let value = await output.json();
                console.log("Value in Register : ",value)

                alert("User Sucessfully Registered")

            }catch(err){
                console.log(err)
            }
        }else{
            alert("Passwords Do Not Match")
        }


    }

    return (
        <div id="main">
            <div className="content">
                <div className="heading">Login</div>
                <div>
                    <input type="text" id="LoginName"  placeholder="Enter Your User Name" onChange={e => setLoginUsername(e.target.value)} ></input>
                </div>
                <div>
                    <input type="password" id="LoginPassword"  placeholder="Enter Your Password" onChange={e => setLoginPassword(e.target.value)}></input>
                </div>
                    <button type="submit" id="btn" onClick={submitLogin}>Submit</button>
            </div>

            <div className="content">
                <div className="heading">Registration</div>
                <div>
                    <input type="text" id="RegisterName"  placeholder="Enter A User Name" onChange={e => setRegisterUsername(e.target.value)} ></input>
                </div>
                <div>
                    <input type="password" id="RegisterPassword1"  placeholder="Enter A Password" onChange={e => setRegisterPassword1(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" id="RegisterPassword2"  placeholder="Enter The Password Again" onChange={e => setRegisterPassword2(e.target.value)}></input>
                </div>
                    <button type="submit" id="btn1" onClick={submitRegister}>Submit</button>
            </div>
        </div>
    )
}

export default Login
