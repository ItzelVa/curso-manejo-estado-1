import React from 'react';

const SECURITY_CODE = 'paradigma'

export function UseReducer({name}) {

    const [state,dispatch] = React.useReducer(reducer,initialState)

    // Action creators
    const onConfirm = () => { dispatch( {type: actionTypes.confirm} ) }
    const onError = () => { dispatch( {type: actionTypes.error} ) }
    const onCheck = () => { dispatch( {type: actionTypes.check} ) }
    const onDelete = () => { dispatch( {type: actionTypes.delete} ) }    
    const onReset = () => { dispatch( {type: actionTypes.reset} ) }
    const onWrite = ({target:{value}}) => {
        dispatch( {type: actionTypes.write, payload: value} )
    }

    console.log(state)

    React.useEffect( ()=>{
        console.log('Empezando el efecto')
        
        if(!!state.loading){
            setTimeout(()=> {
                console.log('Haciendo la validación')
    
                if(state.value === SECURITY_CODE){
                    onConfirm()
                }
                else{
                    onError()
                }
                
    
                console.log('Terminando la validación')
            }, 3000)
        }

        console.log('Terminando el efecto')
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
    
                {(state.error && !state.loading) && (
                    <p>Error: El código es incorrecto</p>
                )}
    
                {state.loading && (
                    <p>Cargando...</p>
                )}
    
                <input 
                    value={state.value}
                    placeholder='Código de seguridad'
                    onChange={onWrite}/>
                <button 
                    onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        )
    }
    else if (!!state.confirmed && !state.deleted) {
        return(
            <React.Fragment>
                <p>¿Estás seguro de eliminar?</p>
                <button onClick={onDelete}>
                    Sí, eliminar
                </button>
                <button onClick={onReset}>
                    No eliminar
                </button>
            </React.Fragment>
        )
    }
    else{
        return(
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        )
    }
}

// Action Types
const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET'
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const reducerObject = (state,payload) => ({
    [actionTypes.confirm]: {
        ...state,
            loading:false,
            error: false,
            confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        loading: false,
        error: true,
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.delete]:{
        ...state,
        deleted:true
    },
    [actionTypes.reset]: {
        ...state,
        confirmed:false,
        deleted:false,
        value:'',
    }
})

const reducer = (state,action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state,action.payload)[action.type]
    }
    else{
        return state
    }
}