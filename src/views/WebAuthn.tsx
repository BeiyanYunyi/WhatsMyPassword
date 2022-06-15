import { Component, createEffect, createSignal, Show } from 'solid-js';
import Header from '../components/Header';
import hashForPassword from '../utils/hashForPassword';
import getAAGuid from '../utils/getAAGuid';

const WebAuthn: Component = () => {
  const [strToHash, setStrToHash] = createSignal('');
  const [mainPassword, setMainPassword] = createSignal('');
  const [hash, setHash] = createSignal('');
  createEffect(() => {
    setHash('生成中');
    hashForPassword(mainPassword(), strToHash()).then((res) => setHash(res));
  });
  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    const res = await getAAGuid();
    setMainPassword(res);
  };
  return (
    <>
      <Header title="🔒 我的密码是什么（WebAuthn）" />
      <main>
        <div class="flex flex-col mt-4 gap-4 mx-auto max-w-7xl">
          <div class="border-2 border-dashed hover:border-solid border-gray-200 rounded-lg p-4 text-center">
            <div class="flex flex-col gap-2 items-center">
              <p>WebAuthn</p>
              <button
                onClick={handleClick}
                disabled={!!mainPassword()}
                class={
                  mainPassword()
                    ? 'w-fit bg-green-400 px-2 py-1 rounded-md border-2 border-green-400 border-dashed'
                    : 'w-fit px-2 py-1 bg-slate-300 rounded-md border-2 border-slate-200 border-dashed text-slate-600'
                }
              >
                {mainPassword() ? '✅ 已验证' : '🔒 点击验证'}
              </button>
            </div>
          </div>
          <Show when={!!mainPassword()}>
            <div class="border-2 border-dashed hover:border-solid border-gray-200 rounded-lg p-4 text-center">
              <div class="flex flex-col gap-2">
                <p>用于生成密码的字符串</p>
                <textarea
                  disabled={!mainPassword()}
                  class="border-2 border-dashed focus:border-solid outline-none"
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
                <p>上一栏输入完后点击别处开始生成</p>
                <code class="font-sans">{hash()}</code>
              </div>
            </div>
          </Show>
        </div>
      </main>
    </>
  );
};

export default WebAuthn;
