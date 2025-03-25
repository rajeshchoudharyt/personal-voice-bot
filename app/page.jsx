import "server-only";

import VoiceBot from "./components/VoiceBot";

import { fetchAccessToken } from "hume";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const secretKey = process.env.HUME_SECRET_KEY;
const apiKey = process.env.HUME_API_KEY;

export default async function Page() {
	let persona = "helpful asssitant";

	try {
		const userRef = doc(db, "user", "j0JZP2xenucMG79R6WtS");
		const docSnap = await getDoc(userRef);
		const data = docSnap.exists() ? docSnap.data() : "";
		persona = data.persona;
		//
	} catch (error) {
		console.error(error);
	}

	const systemPrompt = `You are the person described below. Use the below information to respond back.
                            Start with a greeting and ask would you like to know about me.
                        
                        ${persona}`;

	const accessToken = await fetchAccessToken({ apiKey, secretKey });

	if (!accessToken) throw new Error("Failed to fetch access token");

	return <VoiceBot accessToken={accessToken} systemPrompt={systemPrompt} />;
}
