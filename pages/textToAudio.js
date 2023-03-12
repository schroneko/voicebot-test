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

export default function textToAudio() {
  return (
    <>
      <h1>Hello This is from textToAudio.js</h1>
      <p>{convertTextToAudio(textFromGPT)}</p>
    </>
  );
}
