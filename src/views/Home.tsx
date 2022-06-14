import { Component, createEffect, createSignal } from 'solid-js';
import Header from '../components/Header';
import hashForPassword from '../utils/hashForPassword';

const Home: Component = () => {
  const [strToHash, setStrToHash] = createSignal('');
  const [mainPassword, setMainPassword] = createSignal('');
  const [hash, setHash] = createSignal('');
  createEffect(() => {
    setHash('生成中');
    hashForPassword(mainPassword(), strToHash()).then((res) => setHash(res));
  });
  return (
    <>
      <Header title="🔒 我的密码是什么" />
      <main>
        <div class="flex flex-col mt-4 gap-4 mx-auto max-w-7xl">
          <div class="border-2 border-dashed hover:border-solid border-gray-200 rounded-lg p-4 text-center">
            主密码
            <input
              style={{ width: '100%' }}
              onChange={(e) => {
                setMainPassword(e.currentTarget.value);
              }}
              value={mainPassword()}
            />
          </div>
          <div class="border-2 border-dashed hover:border-solid border-gray-200 rounded-lg p-4 text-center">
            <div class="flex flex-col gap-2">
              <p>用于生成密码的字符串</p>
              <textarea
                style={{ width: '100%', height: '100%' }}
                onChange={(e) => {
                  setStrToHash(e.currentTarget.value);
                }}
                value={strToHash()}
              />
            </div>
          </div>
          <div class="border-2 border-dashed hover:border-solid border-gray-200 rounded-lg p-4 text-center">
            <div class="flex flex-col gap-2 break-all">
              <p>上面两栏输入完后点击别处开始生成</p>
              <code class="font-sans">{hash()}</code>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
