import { useEffect, useState, useRef} from "react";
import Header from "./Header.tsx";
import { useVideo } from "./VideoContext.tsx"; // useVideo をインポート
import LinkButton from "./children/LinkButton.tsx";
import "./App.css";
import { VideoProvider } from "./VideoContext.tsx"; // ここを追加
import {Camera} from "react-camera-pro";

function AppContent() {
  const { videoUrl, setVideoUrl } = useVideo(); // Context から videoUrl を取得
  const [isSetedVideo, setIsSetedVideo] = useState(false);

  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setVideoUrl(fileUrl); // Context の setVideoUrl を使用
      setIsSetedVideo(true);
    }
  };

  useEffect(() => {
    console.log(videoUrl); // videoUrl が更新されるたびにログを表示
  }, [videoUrl]); 

  return (
    <div className="App">
      <Header title="北九州高専DCON!" />
      <main>
      <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
        
        <img src={image} alt='Taken photo' style={{ width: 'auto', height: '200px' }} />

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

function App() {
  return (
    <VideoProvider>
      <AppContent />
    </VideoProvider>
  );
}

export default App;
