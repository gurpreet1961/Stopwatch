import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
	const [time, setTime] = useState({
		min: 0,
		sec: 0,
	});

	const [isPause, setPause] = useState(true);
	useEffect(() => {
		let timerId;
		if (!isPause) {
			timerId = setInterval(() => {
				setTime((prevTime) => {
					if (prevTime.sec < 59) {
						return { ...prevTime, sec: prevTime.sec + 1 };
					} else {
						return { min: prevTime.min + 1, sec: 0 };
					}
				});
			}, 1000);
		}

		return () => clearInterval(timerId);
	}, [isPause]);
	const resetTime = () => {
		setPause(true);
		setTime({ min: 0, sec: 0 });
	};
	return (
		<div>
			<h1>Stopwatch</h1>
			<p>
				Time: {time.min}:{time.sec < 10 && 0}
				{time.sec}
			</p>
			{isPause ? (
				<button
					onClick={() => {
						setPause(!isPause);
					}}
				>
					Start
				</button>
			) : (
				<button
					onClick={() => {
						setPause(!isPause);
					}}
				>
					Stop
				</button>
			)}
			<button onClick={resetTime}>Reset</button>
		</div>
	);
};

export default App;
