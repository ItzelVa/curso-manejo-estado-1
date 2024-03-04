import React from 'react';

const SECURITY_CODE = 'paradigma'

export function UseState({name}) {
    const [value,setValue] = React.useState('');
    const [error,setError] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    console.log(value)

    React.useEffect( ()=>{
        console.log('Empezando el efecto')
        
        if(!!loading){
            setTimeout(()=> {
                console.log('Haciendo la validación')
    
                if(value === SECURITY_CODE){
                    setLoading(false)
                    setError(false)
                }
                else{
                    setLoading(false)
                    setError(true)
                }
                
    
                console.log('Terminando la validación')
            }, 3000)
        }

        console.log('Terminando el efecto')
    }, [loading])

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad</p>

            {(error && !loading) && (
                <p>Error: El código es incorrecto</p>
            )}

            {loading && (
                <p>Cargando...</p>
            )}

            <input 
                value={value}
                placeholder='Código de seguridad'
                onChange={(event)=>{
                    setValue(event.target.value)
                }}/>
            <button 
                onClick={()=> {
                    setLoading(!loading)
                }}>
                Comprobar
            </button>
        </div>
    )
}