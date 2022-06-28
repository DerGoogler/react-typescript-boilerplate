import jss, { Styles } from "jss";
import preset from "jss-preset-default";
import { Component, ReactNode } from "react";
import { Page, Toolbar, BackButton, RouterNavigator, RouterUtil } from "react-onsenui";

export interface IIntentXPushProps {
  activity: any;
  key?: any;
  extra?: any;
}

export type ThemeType<Name extends string = string> = Partial<Styles<Name, any, undefined>>;

export interface XInitProps {
  component: ReactNode;
  theme: ThemeType<"@global">;
}

interface States {
  currentPage: string;
  routeConfig: any;
}

/**
 * Initializes the component for GooglerX DOM
 */
export default class extends Component<XInitProps, States> {
  public constructor(props: XInitProps | Readonly<XInitProps>) {
    super(props);

    const routeConfig = RouterUtil.init([
      {
        component: this.props.component,
        props: {
          key: "main",
          pushPage: (...args: [props: IIntentXPushProps]) => this.pushPage.apply(null, args),
        },
      },
    ]);

    this.state = { routeConfig, currentPage: "main" };
  }

  public componentDidMount() {
    jss.setup(preset());
    jss.createStyleSheet<"@global">(this.props.theme).attach();
  }

  private pushPage = (props: IIntentXPushProps): void & IIntentXPushProps => {
    const route = {
      component: props.activity,
      props: {
        key: props.key,
        extra: props?.extra,
        popPage: () => this.popPage(),
        pushPage: (...args: [props: IIntentXPushProps]) => this.pushPage.apply(null, args),
      },
    };

    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.push({
      routeConfig,
      route,
    });

    this.setState({ routeConfig, currentPage: props.key });
  };

  private popPage = (options = {}) => {
    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.pop({
      routeConfig,
      options: {
        ...options,
        animationOptions: {
          duration: 0.2,
          timing: "ease-in",
          animation: "fade-md",
        },
      },
    });

    this.setState({ routeConfig, currentPage: "main" });
  };

  private onPostPush = () => {
    const routeConfig = RouterUtil.postPush(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  private onPostPop = () => {
    const routeConfig = RouterUtil.postPop(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  private renderPage = (route: any) => {
    const props = route.props || {};
    return <route.component {...props} />;
  };

  public render = () => {
    return (
      <>
        <Page>
          <RouterNavigator
            swipeable={true}
            // @ts-ignore
            swipePop={(options: any) => this.popPage(options)}
            routeConfig={this.state.routeConfig}
            renderPage={this.renderPage}
            onPostPush={() => this.onPostPush()}
            onPostPop={() => this.onPostPop()}
          />
        </Page>
      </>
    );
  };
}
