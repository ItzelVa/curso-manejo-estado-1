import React from 'react';

const SECURITY_CODE = 'paradigma'

export function UseState({name}) {

    const [state,setState] = React.useState({
        value: '',
        error: false,
        loading: false,
    })

    //const [value,setValue] = React.useState('');
    //const [error,setError] = React.useState(false);
    //const [loading,setLoading] = React.useState(false);

    console.log(state)

    React.useEffect( ()=>{
        console.log('Empezando el efecto')
        
        if(!!state.loading){
            setTimeout(()=> {
                console.log('Haciendo la validación')
    
                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        loading:false,
                        error: false,
                    })
                    //setLoading(false)
                    //setError(false)
                }
                else{
                    setState({
                        ...state,
                        loading: false,
                        error: true,
                    })
                    //setLoading(false)
                    //setError(true)
                }
                
    
                console.log('Terminando la validación')
            }, 3000)
        }

        console.log('Terminando el efecto')
    }, [state.loading])

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
                onChange={(event)=>{
                    setState({ ...state,
                                value:event.target.value,})
                    //setValue(event.target.value)
                }}/>
            <button 
                onClick={()=> {
                    setState({
                            ...state,
                            loading: true})
                    //setLoading(true)
                }}>
                Comprobar
            </button>
        </div>
    )
}