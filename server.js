const express = require("express");
const path = require("path");
const ytdlp = require("yt-dlp-exec");

const app = express();

// 🔥 IMPORTANT FOR DEPLOY
const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


// 🎬 VIDEO DOWNLOAD (NO BLACK SCREEN - MP4)
app.get("/download", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.send("No URL");

  try {
    res.header("Content-Disposition", "attachment; filename=video.mp4");

    const process = ytdlp.exec(url, {
      format: "bv*[vcodec^=avc1]+ba[acodec^=mp4a]/mp4",
      mergeOutputFormat: "mp4",
      output: "-",
    });

    process.stdout.pipe(res);

  } catch (err) {
    console.log(err);
    res.send("Video download failed");
  }
});


// 🎵 AUDIO DOWNLOAD (MP3)
app.get("/audio", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.send("No URL");

  try {
    res.header("Content-Disposition", "attachment; filename=audio.mp3");

    const process = ytdlp.exec(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: "-",
    });

    process.stdout.pipe(res);

  } catch (err) {
    console.log(err);
    res.send("Audio download failed");
  }
});


// 🖼️ VIDEO INFO (thumbnail + title)
app.get("/info", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.json({});

  try {
    const data = await ytdlp(url, {
      dumpSingleJson: true,
    });

    res.json({
      title: data.title,
      thumbnail: data.thumbnail,
      channel: data.uploader,
    });

  } catch (err) {
    res.json({});
  }
});


// 🚀 SERVER START
app.listen(PORT, () => {
  console.log(`🔥 LIVE SERVER RUNNING ON PORT ${PORT}`);
});