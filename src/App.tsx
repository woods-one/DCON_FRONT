import { useState } from "react";
import LinkButton from "./children/LinkButton.tsx";
import "./App.css"; // CSSをインポート

function App() {
  const title: string = "北九州高専DCON!";
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isSetedVide, setIsSetedVide] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setVideoUrl(null);  // まず前の動画をクリア
      setIsSetedVide(false);  // 動画選択前に戻す
      setTimeout(() => {
        setVideoUrl(fileUrl);  // 新しい動画のURLを設定
        setIsSetedVide(true);   // 動画が設定された状態にする
      }, 0);  // 状態更新後、次のレンダリングで動画を設定
    }
  };

  return (
    <div className="App">
      <header>
        <h1>{title}</h1>
      </header>
      <div>
        {!isSetedVide && (
          <h2>プレゼン動画に点数を付けるよ！動画を選んでね！</h2>
        )}
        <input type="file" accept="video/*" onChange={handleFileSelect} />
        {videoUrl && isSetedVide && (
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            お使いのブラウザは動画をサポートしていません。
          </video>
        )}
        {isSetedVide && <LinkButton text="採点" link="/test" canLink={isSetedVide} />}
      </div>
    </div>
  );
}

export default App;
