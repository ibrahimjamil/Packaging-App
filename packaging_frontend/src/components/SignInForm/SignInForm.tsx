import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React,{FunctionComponent, useEffect, useRef} from 'react'

type SignUpProps = {
    className:string;
    signInOnChange:Function;
    username:string;
    password:string;
    handleSubmitSignIn:Function;
}

const useStyle = makeStyles(()=>({
    button:{
        marginTop:"10px"
    }
})) 

const  SignInForm:FunctionComponent<SignUpProps> = (props) => {
    const {
        className,
        signInOnChange,
        username,
        password,
        handleSubmitSignIn
    } = props
    const classes = useStyle() 
    const ref = useRef<any>()

    useEffect(() => {
        ref.current.focus();
      },[]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.name === 'username'){
            signInOnChange("username",e.target.value)
        }else if (e.target.name === 'password'){
            signInOnChange("password",e.target.value)
        }
    }
    
    return (
        <Grid container direction={"column"} alignItems={"center"} className={className}>
            <Typography component="h3" style={{paddingBottom:"10px"}}>Enter your username</Typography>
            <TextField 
                id="outlined-basic" 
                label="Username" 
                name="username"
                variant="outlined" 
                value={username}
                inputRef={ref}
                onChange={handleChange}
            />
            <Typography component="h3" style={{paddingTop:"10px",paddingBottom:"10px"}}>Enter your Password</Typography>
            <TextField 
                id="outlined-basic" 
                label="Password"
                name="password" 
                variant="outlined" 
                type="password"
                value={password}
                onChange={handleChange}
            />
            <Button 
                variant="contained" 
                color="primary"
                disabled={!username || !password}
                className={classes.button}
                onClick={()=>{
                    handleSubmitSignIn()
                }}
            >
                Sign In
            </Button>
        </Grid>
    )
}

export default SignInForm
