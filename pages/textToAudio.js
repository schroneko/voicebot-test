import { useState } from "react";

const textFromGPT = "こんにちは";

const convertTextToAudio = async (textFromGPT) => {
  const url = "https://api.rinna.co.jp/models/cttse/koeiro";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textFromGPT,
        speaker_x: 0.0,
        speaker_y: 0.0,
        style: "talk",
      }),
    });

    const data = await response.json();
    const audioBase64 = data.audio;

    console.log(audioBase64);
    return audioBase64;
  } catch (error) {
    console.error(error);
  }
};

export default function TextToAudio() {
  const [audio, setAudio] = useState("");
  const [pending, setPending] = useState(false);
  const generateAudio = async () => {
    setPending(true);
    try {
      setAudio((await convertTextToAudio(textFromGPT)) || "");
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <h1>Hello This is from textToAudio.js</h1>
      <button onClick={generateAudio} disabled={pending}>音声に変換</button>
      <p>{audio}</p>
    </>
  );
}
