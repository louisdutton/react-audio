export type AttachCallback = string | ((child: any, parentInstance: any) => void);
type Args<T> = T extends new (...args: any) => any ? ConstructorParameters<T> : T;
export interface Node<T, P> {
  /** Attaches this class onto the parent under the given name and nulls it on unmount */
  attach?: string;
  /** Appends this class to an array on the parent under the given name and removes it on unmount */
  attachArray?: string;
  /** Adds this class to an object on the parent under the given name and deletes it on unmount */
  attachObject?: [target: string, name: string];
  /**
   * Appends and removes this class to the parent by calling a callback function
   * or when the given name is a string by calling a method on the parent
   */
  attachFns?: [AttachCallback, AttachCallback];
  /** Constructor arguments */
  args?: Args<P>;
  children?: React.ReactNode;
  ref?: React.RefCallback<T> | React.RefObject<React.ReactNode> | null;
  key?: React.Key;
  onUpdate?: (self: T) => void;
}

// export type AudioNode = Node<AudioNode, typeof AudioNode>;
export type OscillatorNodeProps = Node<OscillatorNode, typeof OscillatorNode>;
export type BiquadFilterNodeProps = Node<BiquadFilterNode, typeof OscillatorNode>;
export type ChannelMergerNodeProps = Node<ChannelMergerNode, typeof ChannelMergerNode>;
export type ChannelSplitterNodeProps = Node<ChannelSplitterNode, typeof ChannelSplitterNode>;
export type ConstantSourceNodeProps = Node<ConstantSourceNode, typeof ConstantSourceNode>;
export type ConvolverNodeProps = Node<ConvolverNode, typeof ConvolverNode>;
export type DelayNodeProps = Node<DelayNode, typeof DelayNode>;
export type DynamicsCompressorNodeProps = Node<DynamicsCompressorNode, typeof DynamicsCompressorNode>;
export type GainNodeProps = Node<GainNode, typeof GainNode>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      oscillator: OscillatorNodeProps;
      biquadFilter: BiquadFilterNodeProps;
      gain: GainNodeProps;
    }
  }
}
