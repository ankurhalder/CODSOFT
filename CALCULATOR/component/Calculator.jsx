/* eslint-disable no-eval */
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
		} else if (value === "CE") {
			this.setState({ display: this.state.display.slice(0, -1) });
		} else if (value === "M+") {
		} else if (value === "M-") {
		} else if (value === "MR") {
		} else if (value === "MC") {
		} else if (value === "x^2") {
			this.setState({ display: `${this.state.display}^2` });
		} else if (value === "x^y") {
			this.setState({ display: `${this.state.display}^` });
		} else if (value === "sin(") {
			this.setState({ display: `${this.state.display}Math.sin(` });
		} else if (value === "cos(") {
			this.setState({ display: `${this.state.display}Math.cos(` });
		} else if (value === "tan(") {
			this.setState({ display: `${this.state.display}Math.tan(` });
		} else if (value === "log(") {
			this.setState({ display: `${this.state.display}Math.log10(` });
		} else if (value === "ln(") {
			this.setState({ display: `${this.state.display}Math.log(` });
		} else if (value === "Math.PI") {
			this.setState({ display: `${this.state.display}Math.PI` });
		} else if (value === "Math.E") {
			this.setState({ display: `${this.state.display}Math.E` });
		} else if (value === "e^") {
			this.setState({ display: `${this.state.display}Math.exp(` });
		} else if (value === "ScientificNotation") {
		} else if (value === "n!") {
			try {
				const n = parseInt(this.state.display);
				if (!isNaN(n)) {
					let factorial = 1;
					for (let i = 1; i <= n; i++) {
						factorial *= i;
					}
					this.setState({ display: factorial });
				} else {
					this.setState({ display: "Error" });
				}
			} catch (error) {
				this.setState({ display: "Error" });
			}
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
					<button onClick={() => this.handleClick(".")}>.</button>
					<button onClick={() => this.handleClick("CE")}>CE</button>
					<button onClick={() => this.handleClick("=")}>=</button>
					<button onClick={() => this.handleClick("/")}>/</button>
					<button onClick={() => this.handleClick("(")}>(</button>
					<button onClick={() => this.handleClick(")")}>)</button>
					<button onClick={() => this.handleClick("%")}>%</button>
					<button onClick={() => this.handleClick("x^2")}>x^2</button>
					<button onClick={() => this.handleClick("x^y")}>x^y</button>
					<button onClick={() => this.handleClick("sin(")}>sin</button>
					<button onClick={() => this.handleClick("cos(")}>cos</button>
					<button onClick={() => this.handleClick("tan(")}>tan</button>
					<button onClick={() => this.handleClick("log(")}>log</button>
					<button onClick={() => this.handleClick("ln(")}>ln</button>
					<button onClick={() => this.handleClick("Math.PI")}>π</button>
					<button onClick={() => this.handleClick("Math.E")}>e</button>
					<button onClick={() => this.handleClick("e^")}>e^</button>
					<button onClick={() => this.handleClick("ScientificNotation")}>
						Sci
					</button>
					<button onClick={() => this.handleClick("n!")}>n!</button>
				</div>
			</div>
		);
	}
}

export default Calculator;
