import { Icon } from '@iconify-icon/solid';
import { A, useRouteData } from '@solidjs/router';
import { createMemo, createSignal, Match, Show, Switch } from 'solid-js';
import { authorize, deauthorize } from '../auth';
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
  const id: any = useRouteData();
  const isLoggedIn = createMemo<boolean>(() => {
    if (id() === undefined) return false;
    if (id().id === undefined) return false;
    return id().id !== '';
  });
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
            <Match when={isLoggedIn()}>
              <button class='btn btn-square btn-ghost' onClick={toggleLogoutModal}>
                <Icon icon='mdi:user-circle-outline' class='text-3xl' />
              </button>
            </Match>
            <Match when={!isLoggedIn()}>
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
                <button class='btn btn-ghost bg-black text-white mt-4 mx-auto' onClick={authorize}>
                  Sign in with Github
                  <Icon icon='mdi:github' class='text-3xl ml-2' />
                </button>
              </div>
            </Modal>
          </Show>
          {/* log out modal */}
          <Show when={showLogout()}>
            <Modal
              title='Me'
              centered={true}
              htmlName='logout-modal'
              show={showLogout}
              showHandler={setShowLogout}
            >
              <div class='w-full flex justify-center'>
                <div class='flex flex-col gap-2 mt-4'>
                  <A class='btn btn-primary' href='/posts'>
                    My Bins
                  </A>
                  <button class='btn btn-ghost bg-black text-white mx-auto' onClick={deauthorize}>
                    Sign out
                    <Icon icon='mdi:logout' class='text-3xl ml-2' />
                  </button>
                </div>
              </div>
            </Modal>
          </Show>
        </div>
      </div>
    </>
  );
}
