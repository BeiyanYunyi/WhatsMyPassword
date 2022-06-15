import { Component } from 'solid-js';
import Header from '../components/Header';
import GhIcon from '@sicons/ionicons5/LogoGithub.svg';

const About: Component = () => {
  return (
    <>
      <Header title="关于" />
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <article class="prose prose-neutral">
            <h1>🔒 我的密码是什么</h1>
            <p>用一个主密码和与网站对应的副密码来做到“一个网站一个密码”。</p>
            <h2>✨ 特性</h2>
            <ul>
              <li>
                不与任何服务器通信（对于部署在 Pages 上的本示例站并不严格成立，因为 Cloudflare
                会插入一个统计脚本）
              </li>
              <li>使用浏览器自带 Crypto API</li>
              <li>使用 PBKDF2 算法</li>
              <li>使用 solidjs 作为前端框架</li>
              <li>使用 tailwindcss</li>
              <li>支持通过 Web Authentication API 使用 YubiKey 等外置加密硬件获得主密码</li>
            </ul>
            <h2>⚛ 原理</h2>
            <p>
              通过 PBKDF2 算法迭代 1048576 次，以主密码为盐，以“用于生成密码的字符串”为输入，使用
              SHA-512 生成一个哈希值，使用 Base64 转译，再在前面加一个感叹号，这就是生成的密码了。
            </p>
            <p>
              关于 WebAuthn 的部分参考了 MDN 和{' '}
              <a
                href="https://developers.yubico.com/WebAuthn/WebAuthn_Developer_Guide/WebAuthn_Client_Registration.html"
                rel="noreferrer"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                yubico 的说明
              </a>
              。What's my password 将使用 Web Authentication API 返回值中的 AAGUID 字段作为主密码。
            </p>
            <h2>❤ 贡献</h2>
            <p>
              编写此项目时，作者并不具备密码学相关的知识。若对本项目的安全性存在顾虑或改进措施，也欢迎来提
              issue 或 PR。不过无论如何，欢迎来 Star。
            </p>
            <a href="https://github.com/lixiang810/WhatsMyPassword" target="_blank">
              <img class="h-8 w-8" src={GhIcon} />
            </a>
          </article>
        </div>
      </main>
    </>
  );
};

export default About;
