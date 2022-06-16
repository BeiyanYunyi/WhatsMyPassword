import { Component, createEffect, createSignal, Show } from 'solid-js';
import Header from '../components/Header';
import hashForPassword from '../utils/hashForPassword';
import getCredID from '../utils/getCredID';

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
    const res = await getCredID();
    setMainPassword(res);
  };
  return (
    <>
      <Header title="🔐 我的密码是什么（WebAuthn）" />
      <main>
        <div class="mx-auto mt-4 flex max-w-7xl flex-col gap-4">
          <div class="rounded-lg border-2 border-dashed border-gray-200 p-4 text-center hover:border-solid">
            <div class="flex flex-col items-center gap-2">
              <p>WebAuthn</p>
              <button
                onClick={handleClick}
                disabled={!!mainPassword()}
                class={
                  mainPassword()
                    ? 'w-fit rounded-md border-2 border-dashed border-green-400 bg-green-400 px-2 py-1'
                    : 'w-fit rounded-md border-2 border-dashed border-slate-200 bg-slate-300 px-2 py-1 text-slate-600'
                }
              >
                {mainPassword() ? '✅ 已验证' : '🔒 点击验证'}
              </button>
            </div>
          </div>
          <Show when={!!mainPassword()}>
            <div class="rounded-lg border-2 border-dashed border-gray-200 p-4 text-center hover:border-solid">
              <div class="flex flex-col gap-2">
                <p>用于生成密码的字符串</p>
                <textarea
                  disabled={!mainPassword()}
                  class="border-2 border-dashed outline-none focus:border-solid"
                  style={{ width: '100%', height: '100%' }}
                  onChange={(e) => {
                    setStrToHash(e.currentTarget.value);
                  }}
                  value={strToHash()}
                />
              </div>
            </div>
            <div class="rounded-lg border-2 border-dashed border-gray-200 p-4 text-center hover:border-solid">
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
