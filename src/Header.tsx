import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img
        src="/logo.png" // ロゴ画像のパス
        alt="アプリのロゴ"
        className="header-logo"
      />
      <div className="header-user-area">
        <img
          src="/user-icon.png" // ユーザーアイコンのパス
          alt="ユーザーアイコン"
          className="header-user-icon"
        />
        <span className="header-user-plan">スタンダードプラン</span>
      </div>
    </header>
  );
}

export default Header;
