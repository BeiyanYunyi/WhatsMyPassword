import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { useRegisterSW } from 'virtual:pwa-register/solid';
import styles from './ReloadPrompt.module.css';

const ReloadPrompt: Component = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div class={styles.Container}>
      <Show when={offlineReady() || needRefresh()}>
        <div class={styles.Toast}>
          <div class={styles.Message}>
            <Show fallback={<span>新版本可用，点击刷新</span>} when={offlineReady()}>
              <span>网页已安装，可离线运行</span>
            </Show>
          </div>
          <Show when={needRefresh()}>
            <button class={styles.ToastButton} onClick={() => updateServiceWorker(true)}>
              刷新
            </button>
          </Show>
          <button class={styles.ToastButton} onClick={() => close()}>
            关闭
          </button>
        </div>
      </Show>
    </div>
  );
};

export default ReloadPrompt;
