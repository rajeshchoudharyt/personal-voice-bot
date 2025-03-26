"use client";

import { useVoice } from "@humeai/voice-react";

export default function Controls() {
	const { connect, disconnect, status } = useVoice();

	const handleClick = () => {
		if (status.value === "connected") {
			disconnect();
		} else {
			try {
				connect();
			} catch (error) {
				console.log("Error connecting:", error);
			}
		}
	};

	return (
		<button
			disabled={status.value === "connecting"}
			onClick={handleClick}
			className="btn btn-accent mx-auto mt-2 w-32 text-white disabled:bg-accent disabled:text-accent-content hover:bg-accent/90">
			{status.value === "connected"
				? "Stop"
				: status.value === "disconnected"
				? "Start"
				: ""}
			{status.value === "connecting" ? (
				<span className="loading loading-dots loading-xs"></span>
			) : (
				""
			)}
		</button>
	);
}
