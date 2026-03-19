async function fetchInfo() {
  const url = document.getElementById("url").value;

  if (!url) {
    document.getElementById("preview").innerHTML = "";
    return;
  }

  try {
    const res = await fetch(`/info?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (!data.title) {
      document.getElementById("preview").innerHTML = "";
      return;
    }

    document.getElementById("preview").innerHTML = `
      <img src="${data.thumbnail}" width="300" style="border-radius:10px;"><br><br>
      <b>${data.title}</b><br>
      <small>${data.channel}</small>
    `;
  } catch (err) {
    document.getElementById("preview").innerHTML = "";
  }
}

function downloadVideo() {
  const url = document.getElementById("url").value;

  if (!url) {
    alert("Link daal bhai 😅");
    return;
  }

  window.open(`/download?url=${encodeURIComponent(url)}`, "_blank");
}

function downloadAudio() {
  const url = document.getElementById("url").value;

  if (!url) {
    alert("Link daal bhai 😅");
    return;
  }

  window.open(`/audio?url=${encodeURIComponent(url)}`, "_blank");
}