import { Component, Fragment, ReactFragment } from "react";

/**
 * ViewX includes all HTML props, no need to add it extra
 */
export default class<Props = {}, State = {}, SS = any> extends Component<HTMLAttributes<Element> & Props, State, SS> {
  public constructor(props: (HTMLAttributes<Element> & Props) | Readonly<HTMLAttributes<Element> & Props>) {
    super(props);
  }

  public render(): ReactFragment {
    return <Fragment key={this.props.id}>{this.props.children}</Fragment>;
  }
}
