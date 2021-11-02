import ACTIONS from '../app.constants'


export const clientInfo = {
    pending:()=>({
        type: ACTIONS.GET_CLIENTS_INFO.PENDING,
    }),
    success: (data: any) => ({
        type: ACTIONS.GET_CLIENTS_INFO.SUCCESS,
        data
    }),
    error: (error: any) => ({
        type: ACTIONS.GET_CLIENTS_INFO.ERROR,
        error,
    }),
}


export const clientInfoBegin = () =>{
    return {
        type:ACTIONS.GET_CLIENTS_INFO_BEGIN
    }
}

