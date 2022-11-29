import { Accessor, Setter } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import classNames from 'classnames';
import { Icon } from '@iconify-icon/solid';

interface ModalProps {
  title: string;
  centered?: boolean;
  htmlName: string;
  children: JSX.Element;
  show: Accessor<boolean>;
  showHandler: Setter<boolean>;
}
export default function Modal(props: ModalProps) {
  return (
    <>
      <div
        class={classNames('modal', {
          'modal-open': props.show(),
        })}
      >
        <div class='modal-box relative'>
          <p class={classNames('text-2xl font-bold', { 'text-center': props.centered })}>
            {props.title}
          </p>
          {props.children}
          <Icon
            icon='mdi:close-circle'
            class='text-3xl absolute top-4 right-4 cursor-pointer hover:scale-110 transition-all duration-200'
            onClick={() => props.showHandler(false)}
          />
        </div>
      </div>
    </>
  );
}
