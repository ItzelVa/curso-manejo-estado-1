import React from 'react';

const SECURITY_CODE = 'paradigma'

export function UseState({name}) {

    const [state,setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })

    //const [value,setValue] = React.useState('');
    //const [error,setError] = React.useState(false);
    //const [loading,setLoading] = React.useState(false);

    console.log(state)

    const onConfirm = () => {
        setState({
            ...state,
            loading:false,
            error: false,
            confirmed: true,
        })
    }

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        })
    }

    const onWrite = (newValue) => {
        setState({ ...state,
            value:newValue})
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true})
    }

    const onDelete = () => {
        setState({...state,
            deleted:true,})
    }

    const onReset = () => {
        setState({...state,
            confirmed:false,
            deleted:false,
            value:'',})
    }

    React.useEffect( ()=>{
        console.log('Empezando el efecto')
        
        if(!!state.loading){
            setTimeout(()=> {
                console.log('Haciendo la validación')
    
                if(state.value === SECURITY_CODE){
                    onConfirm()
                    //setLoading(false)
                    //setError(false)
                }
                else{
                    onError()
                    //setLoading(false)
                    //setError(true)
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
                    onChange={(event) => {
                        onWrite(event.target.value)
                        //setValue(event.target.value)
                    }}/>
                <button 
                    onClick={()=> {
                        onCheck()
                        //setLoading(true)
                    }}>
                    Comprobar
                </button>
            </div>
        )
    }
    else if (!!state.confirmed && !state.deleted) {
        return(
            <React.Fragment>
                <p>¿Estás seguro de eliminar?</p>
                <button onClick={() => onDelete()}>
                    Sí, eliminar
                </button>
                <button onClick={() => onReset()}>
                    No eliminar
                </button>
            </React.Fragment>
        )
    }
    else{
        return(
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={() => onReset()}>
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        )
    }
}