"use client";

import Messages from "./Messages";
import Controls from "./Controls";

import { VoiceProvider } from "@humeai/voice-react";

export default function VoiceBot({ accessToken, systemPrompt }) {
	return (
		<VoiceProvider
			configId={process.env.NEXT_PUBLIC_HUME_CONFIG_ID}
			auth={{ type: "accessToken", value: accessToken }}
			sessionSettings={{ systemPrompt }}>
			<div className="w-[100lvw-2rem] flex flex-col justify-between min-h-[85lvh] m-4">
				<Messages />
				<Controls />
			</div>
		</VoiceProvider>
	);
}
