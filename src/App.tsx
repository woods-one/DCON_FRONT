import Header from "./Header.tsx";
import { useState } from "react";
import LinkButton from "./children/LinkButton.tsx";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isSetedVideo, setIsSetedVideo] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setVideoUrl(fileUrl);
      setIsSetedVideo(true);
    }
  };

  return (
    <div className="App">
      <Header title="北九州高専DCON!" />
      <main>
        <div>
          {!isSetedVideo && <h2>プレゼン動画に点数を付けるよ！動画を選んでね！</h2>}
          <input type="file" accept="video/*" onChange={handleFileSelect} />
          {videoUrl && isSetedVideo && (
            <video controls>
              <source src={videoUrl} type="video/mp4" />
              お使いのブラウザは動画をサポートしていません。
            </video>
          )}
          {isSetedVideo && <LinkButton text="採点" link="/result" canLink={isSetedVideo} />}
        </div>
      </main>
    </div>
  );
}

export default App;
