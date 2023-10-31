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
			// Toggle history display
			this.setState((prevState) => ({
				isResult: !prevState.isResult,
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
				{this.state.isResult ? (
					<div className="history-display">
						<div className="history-tape">
							{this.state.history.map((entry, index) => (
								<div key={index} className="history-entry">
									{entry}
								</div>
							))}
						</div>
					</div>
				) : (
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
							onClick={() => this.handleClick("Math.PI")}
							className="number-button"
						>
							π
						</button>
						<button
							onClick={() => this.handleClick("n!")}
							className="function-button"
						>
							n!
						</button>
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
						{/* Add more buttons with appropriate classNames for other functionalities as needed */}
					</div>
				)}
			</div>
		);
	}
}

export default Calculator;
