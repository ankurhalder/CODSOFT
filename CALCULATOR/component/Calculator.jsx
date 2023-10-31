// src/Calculator.js

import React, { Component } from "react";

class Calculator extends Component {
	constructor() {
		super();
		this.state = {
			display: "",
		};
	}

	handleClick = (value) => {
		if (value === "=") {
			try {
				const result = eval(this.state.display);
				this.setState({ display: result });
			} catch (error) {
				this.setState({ display: "Error" });
			}
		} else if (value === "C") {
			this.setState({ display: "" });
		} else {
			this.setState({ display: this.state.display + value });
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
					<button onClick={() => this.handleClick("C")}>C</button>
					<button onClick={() => this.handleClick("=")}>=</button>
					<button onClick={() => this.handleClick("/")}>/</button>
				</div>
			</div>
		);
	}
}

export default Calculator;
