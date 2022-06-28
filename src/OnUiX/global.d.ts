export {};

declare global {
  type HTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.HTMLAttributes<E> & P, E>;
  type AnchorHTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.AnchorHTMLAttributes<E> & P, E>;
  namespace JSX {
    interface IntrinsicElements {
      "content-x-view": HTMLAttributes<HTMLDivElement>;
      "content-x-view-inner": HTMLAttributes<HTMLDivElement>;
    }
  }
}
