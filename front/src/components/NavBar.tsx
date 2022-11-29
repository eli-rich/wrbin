import { Icon } from '@iconify-icon/solid';
import { A } from '@solidjs/router';
import { createSignal, Match, Show, Switch } from 'solid-js';
import Modal from './Modal';
export default function NavBar() {
  const [showLogin, setShowLogin] = createSignal<boolean>(false);
  const [showLogout, setShowLogout] = createSignal<boolean>(false);
  const toggleLoginModal = (e: Event) => {
    e.preventDefault();
    setShowLogin(!showLogin());
  };
  const toggleLogoutModal = (e: Event) => {
    e.preventDefault();
    setShowLogout(!showLogout());
  };
  return (
    <>
      <div class='navbar bg-base-300'>
        <div class='flex-1'>
          <A href='/' class='btn btn-ghost normal-case text-xl'>
            wrBIN
          </A>
        </div>
        <div class='flex-none'>
          <Switch>
            <Match when={true}>
              <button class='btn btn-square btn-ghost' onClick={toggleLogoutModal}>
                <Icon icon='mdi:user-circle-outline' class='text-3xl' />
              </button>
            </Match>
            <Match when={false}>
              <button class='btn btn-square btn-ghost' onClick={toggleLoginModal}>
                <Icon icon='ic:baseline-log-in' class='text-3xl' />
              </button>
            </Match>
          </Switch>
          {/* log in modal */}
          <Show when={showLogin()}>
            <Modal
              title='Sign in'
              centered={true}
              htmlName='login-modal'
              show={showLogin}
              showHandler={setShowLogin}
            >
              <div class='w-full flex justify-center'>
                <button class='btn btn-ghost bg-black text-white mt-4 mx-auto' onClick={() => {}}>
                  Sign in with Github
                  <Icon icon='mdi:github' class='text-3xl ml-2' />
                </button>
              </div>
            </Modal>
          </Show>
          {/* log out modal */}
          <Show when={showLogout()}>
            <Modal
              title='Sign out'
              centered={true}
              htmlName='logout-modal'
              show={showLogout}
              showHandler={setShowLogout}
            >
              <div class='w-full flex justify-center'>
                <button class='btn btn-ghost bg-black text-white mt-4 mx-auto' onClick={() => {}}>
                  Sign out
                  <Icon icon='mdi:logout' class='text-3xl ml-2' />
                </button>
              </div>
            </Modal>
          </Show>
        </div>
      </div>
    </>
  );
}
