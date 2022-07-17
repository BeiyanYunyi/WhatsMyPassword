import { IoClipboardOutline, IoEye, IoEyeOutline } from 'solid-icons/io';
import { Component, createSignal, Show } from 'solid-js';
import toast from 'solid-toast';
import Header from '../components/Header';
import Panel from '../components/Panel';
import hashForPassword from '../utils/hashForPassword';

const Home: Component = () => {
  const [strToHash, setStrToHash] = createSignal('');
  const [mainPassword, setMainPassword] = createSignal('');
  const [hash, setHash] = createSignal('');
  const [error, setError] = createSignal('');
  const [iterations, setIterations] = createSignal(1048576);
  const [show, setShow] = createSignal(false);
  const generatePassword = () => {
    setHash('');
    const pms = hashForPassword(mainPassword(), strToHash(), iterations());
    toast.promise(pms, { loading: '生成中……', success: '已生成', error: '请检查参数' });
    pms
      .then((res) => {
        setError('');
        setHash(res);
      })
      .catch((e: string) => {
        setError(e);
        setHash('');
      });
  };
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
          <Panel center>
            主密码
            <label class="flex flex-row gap-1 border-2 border-dashed focus-within:border-solid">
              <input
                class="flex-grow outline-none"
                type={show() ? 'text' : 'password'}
                onInput={(e) => {
                  setMainPassword(e.currentTarget.value);
                }}
                value={mainPassword()}
              />
              <button
                class="border-l-2 border-dashed px-2 flex items-center"
                onPointerDown={showPassword}
                onPointerUp={hidePassword}
                onPointerLeave={hidePassword}
                onTouchStart={showPassword}
                onTouchEnd={hidePassword}
              >
                <Show when={show()} fallback={<IoEyeOutline size={16} />}>
                  <IoEye size={16} />
                </Show>
              </button>
            </label>
          </Panel>
          <Panel center>
            <div class="flex flex-col gap-2">
              <p>用于生成密码的字符串</p>
              <textarea
                class="border-2 border-dashed outline-none focus:border-solid"
                style={{ width: '100%', height: '100%' }}
                onInput={(e) => {
                  setStrToHash(e.currentTarget.value);
                }}
                value={strToHash()}
              />
            </div>
          </Panel>
          <Panel center>
            <div class="flex flex-col gap-2 items-center">
              <p>迭代次数（建议保持默认或更大）</p>
              <input
                class="flex-grow outline-none border-dashed border-2"
                type="number"
                onChange={(e) => {
                  const val = Number(e.currentTarget.value);
                  if (!Number.isNaN(val)) setIterations(val);
                }}
                value={iterations()}
              />
            </div>
          </Panel>

          <Panel center>
            <div class="flex flex-col gap-2 break-all items-center">
              <button
                class="border-2 border-blue-400 border-dashed hover:border-solid rounded-full px-2 py-1"
                onClick={(e) => {
                  e.preventDefault();
                  generatePassword();
                }}
              >
                点击生成
              </button>
              <div class="flex items-center gap-2">
                <code class="font-mono">{hash()}</code>
                <Show when={hash() !== ''}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const pms = window.navigator.clipboard.writeText(hash());
                      toast.promise(pms, {
                        loading: '正在复制到剪贴板',
                        success: '已复制到剪贴板',
                        error: '复制失败',
                      });
                    }}
                  >
                    <IoClipboardOutline size={16} />
                  </button>
                </Show>
              </div>
              <p class="text-red-600">{error()}</p>
            </div>
          </Panel>
        </div>
      </main>
    </>
  );
};

export default Home;
