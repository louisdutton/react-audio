import {
  HTMLAttributes,
  forwardRef,
  Children,
  useMemo,
  useEffect,
  useRef,
  useState,
  ReactNode,
  ReactChild,
} from "react";

interface Child {
  type: string;
  props: any[];
}

export interface Props {
  children: ReactNode;
}

export const Audio = ({ children, ...props }: Props) => {
  const [ctx] = useState(new AudioContext());
  // const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!children) return;

    const nodes: AudioNode[] = Children.map<AudioNode, Child>(children, ({ type, props }) => {
      const className = `${type[0].toUpperCase()}${type.slice(1)}Node`;
      const nodeType = eval(className);
      console.log(props);

      // return eval(`new ${className}(ctx, ...props)`); // FIXME possibly dangerous
      return new nodeType(ctx);
    });

    connectChain(nodes, ctx);
    console.log(nodes);
  }, [children]);

  return null;
};

const connectChain = (nodes: AudioNode[], ctx: AudioContext) => {
  const last = nodes.length - 1;
  for (let i = 0; i < last; i++) {
    nodes[i].connect(nodes[i + 1]);
    if (nodes[i].start) nodes[i].start();
  }
  nodes[last].connect(ctx.destination);
};
