import React, {Component} from 'react';
import { connect } from 'react-redux';
import { decision } from '../table-logic'

class Options extends Component{
	render() {
		var { message, shouldShow, action, change, dispatch, position, canCheck, canRaise } = this.props;
		var raiseAmount;
		return (
			<div id="optionForm" className={ shouldShow === position ? '' : 'hidden'} >
				<div>
					<p>{ message }</p>
				</div>
				<form onSubmit={ e => {
					e.preventDefault();
					decision(this.props.action, raiseAmount);
					raiseAmount = undefined;
					// dispatch({ type: "OFFICIAL_ACTION"});
				} }>
					<div>
					<label>Fold</label>
					<input type="radio" name="action" value="fold" onChange={ e => dispatch({ type: "CHANGE_ACTION",
						action: e.target.value,
						canRaise: false
					}) }/>
					</div>
					<div className={ canCheck ? '' : 'hidden'}>
					<label>Check</label>
					<input type="radio" name="action" value="check" onChange={ e => dispatch({ type: "CHANGE_ACTION", 
						action: e.target.value,
						canRaise: false,
					}) }/>
					</div>
					<div className={ canCheck ? 'hidden' : ''}>
					<label>Call</label>
					<input type="radio" name="action"  value="call" onChange={ e => dispatch({ type: "CHANGE_ACTION",	
						action: e.target.value,
						canRaise: false
					}) }/>
					</div>
					<div>
					<label>Raise</label>
					<input type="radio" name="action" value="raise" onChange={ e => dispatch({ 
						type: "CHANGE_ACTION", 
						action: e.target.value,
						canRaise: true
					}) }/>
					</div>
					<div className={ canRaise ? '' : 'hidden'}>
					<label>Raise Value </label>
					<input type="text" name="raiseAmount" onChange={ e => raiseAmount = e.target.value }/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

module.exports = connect(
	(state) => {
		return {
			message: state.message,
			shouldShow: state.shouldShow,
			action: state.action,
			position: state.position,
			canCheck: state.canCheck,
			canRaise: state.canRaise
		}
	}
)(Options);



