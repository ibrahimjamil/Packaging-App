import {FunctionComponent, useEffect, useState} from 'react'
import { useContext } from 'react';
import { BASE_URL } from '../../routes';
import { useHistory } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';
import { Button, Grid, Snackbar, Typography} from '@material-ui/core';
import { AuthenticateContext } from '../Authentication/Authenticate';


export const useStyles = makeStyles({
    root:{
        height:"100vh",
    },
    leftSide:{
        backgroundColor:"rgb(42, 27, 38)",
        color:"white", 
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url("https://pl.tedcdn.com/ted-auth-assets/bg-fellows-001.svg")`,
        backgroundSize:"cover",
        backgroundPosition:"center center"
    },
    rightSide:{
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
    },
    toContinue:{
        fontSize:"2rem",
        fontWeight:100 
    },
    signIn:{
        fontSize: "2rem",
        fontWeight:100 
    },
    logo:{
        position:"absolute",
        bottom:"10px",
        fontSize:30,
        color:"#ff1a09"
    },
    loginPaper:{
        padding:"60px 30px 60px 30px",
    },
    button:{
        marginTop:"10px"
    },
    dialog:{
        minHeight: "40vh",
        padding: 10,
    }
})

const  Home:FunctionComponent <any>  = (props) =>{
    const authContext = useContext(AuthenticateContext)
    const [email,setEmail] = useState<string>('')
    const [phoneNo,setPhoneNo] = useState<string>('')
    const [username,setUserName] = useState<string>('') 
    const [password,setPassword] = useState<string>('')
    const [isSignin,setIsSignIn] = useState<boolean>(true)
    const [alertShowSignUp,setAlertShowSignUp] = useState<boolean>(false)
    const [alertShowSignIn,setAlertShowSignIn] = useState<boolean>(false)
    const history = useHistory()
    const classes = useStyles();
    useEffect(()=>{
        if (!!authContext?.signUpData){
            setIsSignIn(true)
            setAlertShowSignUp(true)
        }
        setTimeout(()=>{
            setAlertShowSignUp(false)
        },3000)
    },[authContext?.signUpData])

    useEffect(()=>{
        if (!!authContext?.signInData){
            setIsSignIn(true)
            setAlertShowSignIn(true)
            new Promise((res,_)=>{
                setTimeout(()=>{
                    setAlertShowSignIn(false)
                    history.push(BASE_URL+`/${authContext?.signInData}`)
                },3000)
            })   
            
        }else if (authContext?.signInData===false){
            setAlertShowSignIn(true)
            new Promise((res,_)=>{
                setTimeout(()=>{
                    setAlertShowSignIn(false)
                    history.push(BASE_URL+'/credentials')
                    res(true)
                },3000)
            })
            setIsSignIn(true)
        }
    },[authContext?.signInData,history])

    const handleChangeSignIn = (name:string,value:string) =>{
        if (name==='username'){
            setUserName(value)
        }else if (name==="password"){
            setPassword(value)
        }
    }

    const handleChangeSignUp = (name:string,value:string)=>{
        if (name==='username'){
            setUserName(value)
        }else if (name==="password"){
            setPassword(value)
        }else if (name==="email"){
            setEmail(value)
        }else if (name==="phoneNo"){
            setPhoneNo(value)
        }
    }
    const handleSignIn = () =>{
        setIsSignIn(true)
    }
    const handleSubmitSignIn = () =>{
        if (!!username && !!password){
            authContext?.signIn({username,password})
            authContext?.getToken()
        }
        setUserName('')
        setPassword('')
        setEmail('')
        setPhoneNo('')
    }
    const handleSubmitSignUp =  () =>{
        if (!!username && !!password && !!email && !!phoneNo){
            authContext?.signUp({username,password,email,phoneNo})
        }
        setUserName('')
        setPassword('')
        setEmail('')
        setPhoneNo('')
    }
    return (
        <Grid className={classes.root} container>
            <Grid item  xs={6} sm={6} md={6} lg={6} xl={6} className={classes.leftSide}>
                <Typography className={classes.toContinue}>To continue,</Typography>
                <Typography className={classes.signIn}>Sign in to Packaging</Typography>
                <Typography className={classes.logo}> Al-Bari </Typography>
            </Grid>
            <Grid item sm={6} md={6} lg={6} className={classes.rightSide}> 
                {isSignin ? (
                    <SignInForm
                        className={classes.loginPaper}
                        signInOnChange={handleChangeSignIn}
                        username={username}
                        password={password}
                        handleSubmitSignIn={handleSubmitSignIn}
                    />
                ):(
                    <SignUpForm
                        className={classes.loginPaper}
                        signUpOnChange={handleChangeSignUp}
                        username={username}
                        password={password}
                        email={email}
                        phoneNo={phoneNo}
                        handleSubmitSignUp={handleSubmitSignUp}
                        setSignIn={handleSignIn}
                    />
                )}
                <Grid container direction={"column"} alignItems={"center"} className={classes.loginPaper}>
                    <Typography>Didn't have account ?</Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        className={classes.button}
                        onClick={()=>{
                            setIsSignIn(false)
                            setUserName('')
                            setPassword('')
                        }}
                    >
                        Go to Sign Up Instead
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={alertShowSignUp}
                autoHideDuration={6000}
                message="you signed up hurray now sign in"
            />
            <Snackbar
                open={alertShowSignIn}
                autoHideDuration={6000}
                message={!!authContext?.signInData ? "you signed in ":"username or password is wrong"}
            />
        </Grid>
    )
}

export default Home
