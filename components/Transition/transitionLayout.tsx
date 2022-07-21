import { useRouter } from "next/router";
import React from "react";
import { TransitionGroup, Transition } from "react-transition-group";

const TIMEOUT = 200;
const getTransitionStyles: any = {
  entering: {
    position: `absolute`,
    transform: `translateY(10px)`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms linear, transform ${TIMEOUT}ms linear`,
    transform: `translateY(0px)`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms linear, transform ${TIMEOUT}ms linear`,
    transform: `translateY(10px)`,
    opacity: 0,
  },
};

type TTransitionLayout = { children: React.ReactElement };

export default function TransitionLayout({ children }: TTransitionLayout) {
  const router = useRouter();

  return (
    <TransitionGroup>
      <Transition
        key={router.pathname}
        timeout={{ enter: TIMEOUT, exit: TIMEOUT }}
      >
        {(status: string) => (
          <div style={{ ...getTransitionStyles[status] }}>{children}</div>
        )}
      </Transition>
    </TransitionGroup>
  );
}
