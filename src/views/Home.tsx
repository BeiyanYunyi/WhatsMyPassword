import { Component, createEffect, createSignal } from 'solid-js';
import Header from '../components/Header';
import Panel from '../components/Panel';
import hashForPassword from '../utils/hashForPassword';

const Home: Component = () => {
  const [strToHash, setStrToHash] = createSignal('');
  const [mainPassword, setMainPassword] = createSignal('');
  const [hash, setHash] = createSignal('');
  const [show, setShow] = createSignal(false);
  createEffect(() => {
    setHash('生成中');
    hashForPassword(mainPassword(), strToHash()).then((res) => setHash(res));
  });
  const showPassword = () => {
    setShow(true);
  };
  const hidePassword = () => {
    setShow(false);
  };
  return (
    <>
      <Header title="🔐 我的密码是什么" />
      <main>
        <div class="mx-auto mt-4 flex max-w-7xl flex-col gap-4">
          <Panel>
            主密码
            <label class="flex flex-row gap-1 border-2 border-dashed focus-within:border-solid">
              <input
                class="flex-grow outline-none"
                type={show() ? 'text' : 'password'}
                onChange={(e) => {
                  setMainPassword(e.currentTarget.value);
                }}
                value={mainPassword()}
              />
              <button
                class="border-l-2 border-dashed px-2"
                onPointerDown={showPassword}
                onPointerUp={hidePassword}
                onPointerLeave={hidePassword}
                onTouchStart={showPassword}
                onTouchEnd={hidePassword}
              >
                显示
              </button>
            </label>
          </Panel>
          <Panel>
            <div class="flex flex-col gap-2">
              <p>用于生成密码的字符串</p>
              <textarea
                class="border-2 border-dashed outline-none focus:border-solid"
                style={{ width: '100%', height: '100%' }}
                onChange={(e) => {
                  setStrToHash(e.currentTarget.value);
                }}
                value={strToHash()}
              />
            </div>
          </Panel>
          <Panel>
            <div class="flex flex-col gap-2 break-all">
              <p>上面两栏输入完后点击别处开始生成</p>
              <code class="font-sans">{hash()}</code>
            </div>
          </Panel>
        </div>
      </main>
    </>
  );
};

export default Home;
