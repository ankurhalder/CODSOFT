/* eslint-disable no-eval */
import React, { Component } from "react";

class Calculator extends Component {
	constructor() {
		super();
		this.state = {
			display: "",
			isResult: false,
			history: [],
		};
	}

	// Custom factorial function
	factorial = (n) => {
		if (n === 0 || n === 1) return 1;
		let result = 1;
		for (let i = 2; i <= n; i++) {
			result *= i;
		}
		return result;
	};

	handleClick = (value) => {
		if (value === "=") {
			try {
				let modifiedDisplay = this.state.display;

				// Replace '!' with a call to the custom factorial function
				modifiedDisplay = modifiedDisplay.replace(
					/(\d+)!/g,
					"this.factorial($1)"
				);
				// Replace '^' with '**' for exponentiation
				modifiedDisplay = modifiedDisplay.replace(/\^/g, "**");

				const result = eval(modifiedDisplay);
				const historyEntry = `${this.state.display} = ${result}`;
				this.setState((prevState) => ({
					display: result,
					isResult: true,
					history: [historyEntry, ...prevState.history],
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
			this.setState((prevState) => ({
				display: prevState.history.join("\n"),
				isResult: true,
			}));
		} else {
			this.setState({ display: this.state.display + value, isResult: false });
		}
	};

	render() {
		return (
			<div className="calculator">
				<input
					type="text"
					className="display"
					value={this.state.display}
					readOnly
				/>
				<div className="buttons">
					<button
						onClick={() => this.handleClick("7")}
						className="number-button"
					>
						7
					</button>
					<button
						onClick={() => this.handleClick("8")}
						className="number-button"
					>
						8
					</button>
					<button
						onClick={() => this.handleClick("9")}
						className="number-button"
					>
						9
					</button>
					<button
						onClick={() => this.handleClick("+")}
						className="operator-button"
					>
						+
					</button>
					<button
						onClick={() => this.handleClick("4")}
						className="number-button"
					>
						4
					</button>
					<button
						onClick={() => this.handleClick("5")}
						className="number-button"
					>
						5
					</button>
					<button
						onClick={() => this.handleClick("6")}
						className="number-button"
					>
						6
					</button>
					<button
						onClick={() => this.handleClick("-")}
						className="operator-button"
					>
						-
					</button>
					<button
						onClick={() => this.handleClick("1")}
						className="number-button"
					>
						1
					</button>
					<button
						onClick={() => this.handleClick("2")}
						className="number-button"
					>
						2
					</button>
					<button
						onClick={() => this.handleClick("3")}
						className="number-button"
					>
						3
					</button>
					<button
						onClick={() => this.handleClick("*")}
						className="operator-button"
					>
						*
					</button>
					<button
						onClick={() => this.handleClick("0")}
						className="number-button"
					>
						0
					</button>
					<button
						onClick={() => this.handleClick(".")}
						className="number-button"
					>
						.
					</button>
					<button
						onClick={() => this.handleClick("CE")}
						className="function-button"
					>
						CE
					</button>
					<button
						onClick={() => this.handleClick("=")}
						className="equals-button"
					>
						=
					</button>
					<button
						onClick={() => this.handleClick("/")}
						className="operator-button"
					>
						/
					</button>
					<button
						onClick={() => this.handleClick("(")}
						className="number-button"
					>
						(
					</button>
					<button
						onClick={() => this.handleClick(")")}
						className="number-button"
					>
						)
					</button>
					<button
						onClick={() => this.handleClick("x^2")}
						className="function-button"
					>
						x^2
					</button>
					<button
						onClick={() => this.handleClick("!")}
						className="function-button"
					>
						!
					</button>
					<button
						onClick={() => this.handleClick("^")}
						className="operator-button"
					>
						^
					</button>{" "}
					{/* Add the '^' button */}
					<button
						onClick={() => this.handleClick("Reset")}
						className="function-button"
					>
						Reset
					</button>
					<button
						onClick={() => this.handleClick("History")}
						className="function-button"
					>
						History
					</button>
				</div>
			</div>
		);
	}
}

export default Calculator;
