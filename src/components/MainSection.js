import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import {SHOW_ALL, SHOW_ACTIVE,SHOW_COMPLETED} from '../constants/TodoFilters'
import { completeAll } from '../actions/index';
const TODO_FILTERS = {
    [SHOW_ALL]: ()=> true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed    
}
export default class MainSection extends Component{

static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

state = {
    filter : SHOW_ALL
}

handleShow = filter =>{
    this.setState({filter})
}

renderToggleAll(completedCount){
    const { todos, actions } = this.props
    if(todos.lenght > 0){
        return(
            <span>
                <input className = "toggle-all"
                        type="checkbox"
                        checked={completedCount === todos.lenght} />
                <label onClick={actions.completeAll} />
            </span>
        )
    }
}

render(){
    const { todos, actions } = this.props
    const { filter } = this.state
    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo)=>
        todo.completed ? count + 1 : count,
        0
    )

    return(
    <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
            {filteredTodos.map(
                todo => 
                    <TodoItem key={todo.id} todo={todo} {...actions} />                    
            )}

        </ul>
    </section>
)
}

}