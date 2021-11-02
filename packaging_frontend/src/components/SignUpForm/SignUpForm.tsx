import { Button, Dialog, DialogActions, DialogTitle, Grid, TextField, Typography } from '@material-ui/core'
import {FunctionComponent, useState} from 'react'
import {useStyles} from '../../views/Home/Home'

type SignUpProps={
    className:string;
    signUpOnChange:Function;
    username:string;
    password:string;
    email:string;
    phoneNo:string;
    handleSubmitSignUp:Function;
    setSignIn:Function;
}

const  SignupForm:FunctionComponent<SignUpProps> = (props) =>{
    const {
        className,
        signUpOnChange,
        username,
        password,
        email,
        phoneNo,
        handleSubmitSignUp,
        setSignIn
    } = props
    const classes = useStyles() 

    const [openModal,setIsOpenModal] = useState<boolean>(true)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
         signUpOnChange(e.target.name,e.target.value)
    }

    const handleCloseModal = () =>{
        setIsOpenModal(false)
        setSignIn()
    }
    
    const SignUpbody = () =>{
        return (
            <Grid container direction={"column"} alignItems={"center"} className={className}>
                <Typography component="h3" style={{paddingBottom:"10px"}}>Enter your username</Typography>
                <TextField 
                    id="outlined-basic" 
                    label="Username" 
                    name="username"
                    variant="outlined" 
                    value={username}
                    onChange={handleChange}
                />
                <Typography component="h3" style={{paddingTop:"10px",paddingBottom:"10px"}}>Enter your Password</Typography>
                <TextField 
                    id="outlined-basic" 
                    label="Password"
                    name="password" 
                    type="password"
                    variant="outlined" 
                    value={password}
                    onChange={handleChange}
                />
                <Typography component="h3" style={{paddingBottom:"10px",paddingTop:"10px"}}>Enter your Email</Typography>
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    name="email"
                    variant="outlined" 
                    value={email}
                    onChange={handleChange}
                />
                <Typography component="h3" style={{paddingTop:"10px",paddingBottom:"10px"}}>Enter your Phone no</Typography>
                <TextField 
                    id="outlined-basic" 
                    label="PhoneNo"
                    name="phoneNo" 
                    variant="outlined" 
                    value={phoneNo}
                    onChange={handleChange}
                />
                <Button 
                    variant="contained" 
                    color="primary"
                    disabled={!username || !password || !email || !phoneNo}
                    className={classes.button}
                    onClick={()=>{
                        handleSubmitSignUp()
                    }}
                >
                    Sign Up
                </Button>
            </Grid>
        )
    } 
    return (
        <Grid container direction={"column"} alignItems={"center"} className={className}>
            <Dialog
                classes={{ paper: classes.dialog }}
                open={openModal}
                onClose={handleCloseModal}
                maxWidth={'md'} 
                fullWidth={true} 
            >
                <DialogTitle id="alert-dialog-title">{"Sign up for your packaging id"}</DialogTitle>
                <Grid className={classes.root} container>
                    <Grid item  xs={6} sm={6} md={6} lg={6} xl={6} className={classes.leftSide}>
                        <Typography className={classes.toContinue}>To continue,</Typography>
                        <Typography className={classes.signIn}>Sign up to Packaging</Typography>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} className={classes.rightSide}> 
                        {SignUpbody()}
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default SignupForm
