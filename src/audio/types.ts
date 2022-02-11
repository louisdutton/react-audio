export type AttachCallback = string | ((child: any, parentInstance: any) => void);
export interface Node<T> {
  children?: React.ReactNode;
  ref?: React.RefCallback<T> | React.RefObject<React.ReactNode> | null;
  key?: React.Key;
  onUpdate?: (self: T) => void;
}

// export type AudioNode = Node<AudioNode, typeof AudioNode>;
export type OscillatorProps = Node<OscillatorNode> & OscillatorOptions;
export type BiquadFilterNodeProps = Node<BiquadFilterNode> & BiquadFilterOptions;
export type GainNodeProps = Node<GainNode> & GainOptions;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      oscillator: OscillatorProps;
      biquadFilter: BiquadFilterNodeProps;
      gain: GainNodeProps;
    }
  }
}
