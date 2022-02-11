import { Children, useEffect, useState, ReactNode } from "react";

interface Child {
  type: string;
  props: any[];
  ref: any;
}

export interface Props {
  children: ReactNode;
}

export const Audio = ({ children, ...props }: Props) => {
  const [ctx] = useState(new AudioContext());

  const handleBlur = () => {
    ctx.suspend();
  };

  const handleFocus = () => {
    ctx.resume();
  };

  useEffect(() => {
    if (!children) return;

    const nodes: AudioNode[] = Children.map<AudioNode, Child>(children, ({ type, props, ref }) => {
      const className = `${type[0].toUpperCase()}${type.slice(1)}Node`;
      const AnonNode = eval(className); // FIXME possibly dangerous
      const audioNode = new AnonNode(ctx, props);

      if (ref) ref.current = audioNode;
      return audioNode;
    });

    connectChain(nodes, ctx);
    console.log(nodes);
  }, [children]);

  useEffect(() => {
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return null;
};

const connectChain = (nodes: AudioNode[], ctx: AudioContext) => {
  const last = nodes.length - 1;
  for (let i = 0; i < last; i++) {
    nodes[i].connect(nodes[i + 1]);
  }
  nodes[last].connect(ctx.destination);
};
