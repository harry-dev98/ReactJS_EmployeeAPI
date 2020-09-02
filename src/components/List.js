import React from 'react';

import './List.css';

import Button from './Button';
import APIPrompt from './Prompt';

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
        }
        this.popup = this.popup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }
    closePopup(){
        this.setState({
            isClicked: false,
        });
    }
    popup(){
        this.setState({
            isClicked: true,
        });
    }
    render(){
        return (
            <div className='container'>
                {this.state.isClicked?
                    <ListDetail closePopup={this.closePopup} item={this.props.item}/>:
                    <div className='list-items' onClick={this.popup} >
                        {this.props.item.name}
                    </div> 
                }
            </div>
        );
    }
}


class ListDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: '',
        }
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete(){
        this.setState({
            type: 'delete',
        });
    }

    edit(){
        this.setState({
           type: 'edit',
        });
    }

    render(){
        let content = undefined;
        if(this.state.type === 'delete'){
            content = (
                <APIPrompt id={this.props.item.id} type='delete'/>
            );
        }
        else if(this.state.type === 'edit'){
            content = (
                <APIPrompt item={this.props.item} type='edit'/>
            );
        }
        else{
            content = (
                <div className='list-details'>
                    <div className='list-detail-items'>
                        <h4>Employee Name</h4><h4>{this.props.item.name}</h4>
                    </div>
                    <div className='list-detail-items'>
                        <h4>Employee Salary</h4><h4>{this.props.item.salary}</h4>
                    </div>
                    <div className='list-detail-items'>
                        <h4>Employee Department</h4><h4>{this.props.item.department}</h4>
                    </div>
                    <div className='buttons'>
                        <Button name='Edit' clickFunc={this.edit} /> 
                        <Button name='Delete' clickFunc={this.delete}/>
                        <Button name='Close' clickFunc={this.props.closePopup}/>
                    </div>
                </div>
            )
        }
        return (
            content
        );
    }
}

function EmployeeList({emplist}){
    return (
        <div className="container" >
            <h2 className="heading">Employee Registered</h2>
            <div className="list-container">
                {emplist.map((item, _)=>(
                    <List item={item} key={item.id} />
                ))}
                <div id="add-sign" onClick={()=>{
                    document.getElementById("add-emp").style.display = 'block';
                }}>
                    +
                </div>
            </div>
            <div id="add-emp" style={{display: 'none'}} >
                    <APIPrompt type='add' />
            </div>
        </div>
    )
}

class EmptyList extends React.Component{
    render(){
        return (
            <div>
                Hello World!!
            </div>
        )
    }
}

export {
    EmployeeList,
    EmptyList,
}