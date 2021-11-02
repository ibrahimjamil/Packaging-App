import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { FunctionComponent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '../../components/AppBar'
import ClientBanner from '../../components/ClientsBanner'
import { BASE_URL } from '../../routes'
import { API } from '../../store/services/services'


type PackagingMainProp = {
    logOut:Function;
    signInData:Boolean;
    match: { params: { id: string } };
}

 const useStyles = makeStyles({
    clientBody:{
        display:"flex",
        flexDirection:"row",
        backgroundColor:"white !important",
        backgroundSize:"cover",
        height:"20vh !important",
        width:"80vw !important"
    },
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
    addClient:{
        height:"20vh",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    clientInfo:{
        backgroundColor:"rgb(42, 27, 38) !important",
        backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url("https://pl.tedcdn.com/ted-auth-assets/bg-fellows-001.svg")`,
        backgroundSize:"cover",
        height:"62vh",
        position:"relative",
        paddingRight:"10px"
    },
    clientChat:{
        backgroundColor:"rgb(42, 27, 38) !important",
        backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url("https://pl.tedcdn.com/ted-auth-assets/bg-fellows-001.svg")`,
        backgroundSize:"cover",
        height:"62vh",
        position:"relative"
    },
    clientInfoType:{
        color:"white",
        textAlign:"center",
    },
    clientInfoChat:{
        color:"white",
        textAlign:"center"
    },
    dialog:{
        minHeight: "40vh",
        padding: 10,
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
    rightSide:{
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
    },
})


const Packaging:FunctionComponent<PackagingMainProp> = (props) => {
    const {logOut} = props
    const history = useHistory()
    const classes = useStyles()
    const [openClientModel,setopenClientModel] = useState<boolean>(false)
    const [name,setName] = useState<string>('')
    const [openModal,setIsOpenModal] = useState<boolean>(false)
    const [file,setFile] = useState<any>(null)
    const [clientData,setClientData] = useState<object>({})
    const vendorId = props.match.params.id;
    useEffect( () => {
        API.getClientInfoDetais(vendorId).then((data)=>{
           setClientData(data)
        })
    }, [vendorId])
    const logOutHandler = () =>{
        logOut()
        history.push(BASE_URL+'/credentials')
    }
    const handleCloseModal = () =>{
        setIsOpenModal(false)
        API.getClientInfoDetais(vendorId).then((data)=>{
            setClientData(data)
        })
    }
    const handleChangeName = (e:any) =>{
        setName(e.target.value)
    }

    const handleClientSubmit = async(e: React.MouseEvent<HTMLElement>) =>{
        const formData = new FormData()
        formData.append("name",name)
        formData.append('vendorId',vendorId)
        formData.append('myImage',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const result = await API.clientImageUpload(formData,config)
        if (result){
            alert("client info uploaded")
        }
        e.preventDefault()
    }
    const fileOnChange = (e: any): void =>{
        setFile(e.target.files[0])
    }

    const clientHandler = (clientName:string) =>{
        
    }
    return (
        <Box>
            <AppBar LogOut={logOutHandler}/>
            <Grid container direction="column">
                <Grid item sm={12}>
                    <Typography variant="h5" component="p" >
                        Clients
                    </Typography>
                </Grid>
                <Grid item  container direction="row" >
                    <Grid item xs={10} sm={10} md={10} lg={10} container > 
                        <ClientBanner
                            clientData={clientData}
                            clientHandler={clientHandler}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2} classes={{root:classes.addClient}}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={()=>{
                                setopenClientModel(true)
                                setIsOpenModal(true)
                            }}
                            >
                                Add Clients
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6} classes={{root:classes.clientInfo}}>
                    <Typography variant="h5" component="h5" classes={{root:classes.clientInfoType}}>
                        CLIENT CHAT
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} classes={{root:classes.clientChat}}>
                    <Typography variant="h5" component="h5" classes={{root:classes.clientInfoChat}}>
                        CLIENT CALL
                    </Typography>
                </Grid>
            </Grid>
            {!!openClientModel && (
                <Dialog
                    classes={{ paper: classes.dialog }}
                    open={openModal}
                    onClose={handleCloseModal}
                    maxWidth={'md'} 
                    fullWidth={true} 
                >
                    <DialogTitle id="alert-dialog-title">{"ADD CLIENTS"}</DialogTitle>
                    <Grid className={classes.root} container>
                        <Grid item  xs={6} sm={6} md={6} lg={6} xl={6} className={classes.leftSide}>
                            <Typography className={classes.toContinue}>To continue,</Typography>
                            <Typography className={classes.signIn}>Sign up to Packaging</Typography>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} className={classes.rightSide}> 
                                <Typography component="h3" style={{paddingBottom:"10px"}}>Client Name</Typography>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Username" 
                                    name="username"
                                    variant="outlined" 
                                    value={name}
                                    onChange={handleChangeName}
                                />
                                <input type="file" name="myImage" onChange= {fileOnChange}/>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    type= "submit"
                                    disabled={!name}
                                    className={classes.button}
                                    onClick={handleClientSubmit}
                                >
                                    Add CLient
                                </Button>
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary" variant="contained">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                )
            }
        </Box>
    )
}

export default Packaging
