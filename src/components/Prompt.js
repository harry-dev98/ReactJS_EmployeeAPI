import React from 'react';

import Button from './Button';

import './Prompt.css';

const config = require('../config.json');

export default class APIPrompt extends React.Component{
    constructor(props){
        super(props);
        this.done = this.done.bind(this);
    }

    done(){
        let headers = {
            'Content-Type': 'application/json',        
            'Authorization' : `Token ${document.getElementById('token').value}`,
        };
        console.log(headers); 
        if(this.props.type === 'delete'){
            return fetch(config.change+'/'+this.props.id, {
                method: 'DELETE',
                headers: headers
            })
            .then((reponse)=>window.location.reload())
            .catch((err)=>{
                console.log(err);
                window.location.reload();
            })
        }
        let body = JSON.stringify({
            'name': document.getElementById('name').value,
            'salary' : document.getElementById('salary').value,
            'department': document.getElementById('dept').value
        });
        let url = undefined;
        let method = undefined;
        if(this.props.type === 'edit'){
            url = config.change + '/' + this.props.item.id;
            method = "PUT";
        }
        else{
            url = config.add;
            method = "POST"
        }
        return fetch(url, {
            method: method,
            headers: headers,
            body: body
        })
        .then((response)=>response.json())
        .then((json)=>{
            console.log(json);
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
            window.location.reload();
        })
    }
    
    render(){
        return (
            <div className='prompt'>
                <div className='prompt-items'>
                    <h4>API Token</h4>
                    <input id="token" type='text' />
                </div>
                {this.props.type !== 'delete'?
                <span>
                    <div className='prompt-items'>
                        <h4>Name</h4>
                        {this.props.type === 'edit'?
                            <input id="name" type='text' defaultValue={this.props.item.name} />:
                            <input id="name" type='text'/>
                        }
                    </div>
                    <div className='prompt-items'>
                        <h4>Salary</h4>
                        {this.props.type === 'edit'?
                            <input id="salary" type='text' defaultValue={this.props.item.salary} />:
                            <input id="salary" type='text'/>
                        }
                    </div>
                    <div className='prompt-items'>
                        <h4>Department</h4>
                        {this.props.type === 'edit'?
                            <input id="dept" type='text' defaultValue={this.props.item.department} />:
                            <input id="dept" type='text'/>
                        }
                    </div>
                    <Button name='Done' clickFunc={this.done} />
                </span>:
                <Button name='Delete' clickFunc={this.done} />
                }
            </div>
        )
    }
}