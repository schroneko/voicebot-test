// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const audiofile = "../public/input.m4a";

fetch(audiofile)
  .then((response) => response.blob())
  .then((audio_file) => {
    const formData = new FormData();
    formData.append("model", "whisper-1");
    formData.append("audio", audio_file);

    fetch("https://api.openai.com/v1/audio/transcribe", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const transcript = data.transcription;
        console.log(transcript);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });
