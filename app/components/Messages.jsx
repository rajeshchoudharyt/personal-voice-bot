"use client";

import { useVoice } from "@humeai/voice-react";
import { useEffect, useRef } from "react";

export default function Messages() {
	const { messages } = useVoice();
	const scrollRef = useRef(null);

	useEffect(() => {
		if (scrollRef.current)
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="w-full">
			{messages.length === 0 && (
				<p className="text-black text-center font-semibold text-2xl mt-[40lvh]">
					Welcome
				</p>
			)}
			{messages.map((msg, index) => {
				if (
					msg.type !== "user_message" &&
					msg.type !== "assistant_message"
				)
					return null;

				const { role, content } = msg.message;

				return (
					<div
						key={msg.type + index}
						ref={scrollRef}
						className={`chat ${
							role === "assistant" ? "chat-start" : "chat-end"
						}`}>
						<div
							className={`chat-bubble ${
								role === "assistant"
									? "chat-bubble-secondary"
									: "chat-bubble-accent"
							}`}>
							{content}
						</div>
					</div>
				);
			})}
		</div>
	);
}
