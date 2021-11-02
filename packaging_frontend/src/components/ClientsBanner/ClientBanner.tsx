import { Box, makeStyles, Typography } from '@material-ui/core'
import { FunctionComponent, useEffect, useState } from 'react'

type ClientBannerProps = {
    clientData:any;
    clientHandler:Function;
}

export const useStyles = makeStyles({
    root:{
        display:"flex",
        flexDirection:"row",
        overflowY:"scroll",
        height:"100%",
    },
    innerRoot:{
        display:"flex",
        flexDirection:"column",
    }
})

const ClientBanner:FunctionComponent <ClientBannerProps> = (props) => {
    const classes = useStyles()
    const [clientDatas,setClientDatas] = useState<any>()
    const {clientData,clientHandler} = props

    useEffect(() => {
        let clients : any = []
        clientData?.client?.forEach((client:any)=>{
            console.log(client)
            clients.push({
                    logo:'http://localhost:5000/public/images/'+ client.image + '.jpeg',
                    name: client.name
                }
            )
        })
        setClientDatas(clients)
    }, [clientData])

    return (
        <Box className={classes.root}>
            {!!clientDatas ? clientDatas.map((client : any, index : any)=>(
                <Box 
                    className={classes.innerRoot}
                >
                    <img 
                        src={client.logo} 
                        alt={`client ${index}`} 
                        style={{height:"20vh",width:"25vw",marginRight:"10px",borderRadius:"2%"}}
                        onClick={()=>clientHandler(client.name)}
                    />
                    <Typography 
                        variant="h5" 
                        component="p" 
                        style={{textAlign:"center"}}
                        >
                            {client.name}
                    </Typography>
                </Box>
            )):(
                <Box className={classes.innerRoot}>
                    <Typography 
                        variant="h5" 
                        component="p" 
                        style={{textAlign:"center"}}
                    >
                        Please upload client info you dont have any clients
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default ClientBanner
