/* eslint-disable no-eval */
import React, { Component } from "react";

class Calculator extends Component {
	constructor() {
		super();
		this.state = {
			display: "",
			isResult: false, // New state to track whether the display is a result
			history: [], // New state to store calculation history
		};
	}

	handleClick = (value) => {
		if (value === "=") {
			try {
				const result = eval(this.state.display);
				this.setState((prevState) => ({
					display: result,
					isResult: true,
					history: [...prevState.history, prevState.display + "=" + result],
				}));
			} catch (error) {
				this.setState({ display: "Error", isResult: true });
			}
		} else if (value === "C") {
			this.setState({ display: "", isResult: false });
		} else if (value === "CE") {
			if (this.state.isResult) {
				this.setState({ display: "", isResult: false });
			} else {
				this.setState({ display: this.state.display.slice(0, -1) });
			}
		} else if (value === "Reset") {
			this.setState({ display: "", isResult: false });
		} else if (value === "History") {
			// Show calculation history in the display
			const historyString = this.state.history.join("\n");
			this.setState({ display: historyString, isResult: true });
		} else {
			this.setState({ display: this.state.display + value, isResult: false });
		}
	};

	render() {
		return (
			<div className="calculator">
				<input type="text" value={this.state.display} readOnly />
				<div className="buttons">
					<button onClick={() => this.handleClick("7")}>7</button>
					<button onClick={() => this.handleClick("8")}>8</button>
					<button onClick={() => this.handleClick("9")}>9</button>
					<button onClick={() => this.handleClick("+")}>+</button>
					<button onClick={() => this.handleClick("4")}>4</button>
					<button onClick={() => this.handleClick("5")}>5</button>
					<button onClick={() => this.handleClick("6")}>6</button>
					<button onClick={() => this.handleClick("-")}>-</button>
					<button onClick={() => this.handleClick("1")}>1</button>
					<button onClick={() => this.handleClick("2")}>2</button>
					<button onClick={() => this.handleClick("3")}>3</button>
					<button onClick={() => this.handleClick("*")}>*</button>
					<button onClick={() => this.handleClick("0")}>0</button>
					<button onClick={() => this.handleClick(".")}>.</button>
					<button onClick={() => this.handleClick("CE")}>CE</button>
					<button onClick={() => this.handleClick("=")}>=</button>
					<button onClick={() => this.handleClick("/")}>/</button>
					<button onClick={() => this.handleClick("(")}>(</button>
					<button onClick={() => this.handleClick(")")}>)</button>
					<button onClick={() => this.handleClick("x^2")}>x^2</button>
					<button onClick={() => this.handleClick("Math.PI")}>π</button>
					<button onClick={() => this.handleClick("n!")}>n!</button>
					<button onClick={() => this.handleClick("Reset")}>Reset</button>
					<button onClick={() => this.handleClick("History")}>History</button>
					{/* Add more buttons for other functionalities as needed */}
				</div>
			</div>
		);
	}
}

export default Calculator;
