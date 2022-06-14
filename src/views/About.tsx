import { Component } from 'solid-js';
import Header from '../components/Header';

const About: Component = () => {
  return (
    <>
      <Header title="关于" />
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <article class="prose prose-neutral">
            <h1>🔒 我的密码是什么</h1>
            <p>总地来说是一个哈希生成器。</p>
            <h2>✨ 特性</h2>
            <ul>
              <li>使用浏览器自带 Crypto API</li>
              <li>使用 PBKDF2 算法</li>
              <li>使用 solidjs 作为前端框架</li>
              <li>使用 tailwindcss</li>
            </ul>
          </article>
        </div>
      </main>
    </>
  );
};

export default About;
