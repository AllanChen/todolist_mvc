import React from 'react'
import Header from '../components/Header'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import MainSection from '../components/MainSection'
const App = ({todos, actions}) =>(
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos = {todos} actions = {actions}/>
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  todos: state.todos
})

const mapDispatchToProps = dispatch =>({
  actions:bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
