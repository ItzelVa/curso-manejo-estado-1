import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma'

export class ClassState extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            value: '',
            error:false,
            loading:false,
        }
    }

    //UNSAFE_componentWillMount(){
    //    console.log('ComponentWillMount')
    //}
    //componentDidMount(){
    //    console.log('componentDidMount')
    //}

    componentDidUpdate(){
        console.log('actualización')

        if(!!this.state.loading){
            setTimeout(()=> {
                console.log('Haciendo la validación')
    
                if(SECURITY_CODE === this.state.value){
                    this.setState({error:false,loading:false})
                }
                else{
                    this.setState({error:true,loading:false})
                }
    
                console.log('Terminando la validación')
            }, 3000)
        }

    }

    render() { 
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
                {(this.state.error && !this.state.loading) && (
                    <p>Error: El código es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading/>
                )}
                <input 
                    value={this.state.value}
                    placeholder='Código de seguridad'
                    onChange={(event) => this.setState({value:event.target.value})}/>
                <button 
                    onClick={()=> this.setState({loading: true})}>
                Comprobar</button>
            </div>
        )
    }
}