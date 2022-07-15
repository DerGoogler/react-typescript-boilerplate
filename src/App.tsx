import { Toolbar, ActivityX, Tab, Page, Tabbar, TabbarEvent, ActivityXRenderData } from "react-onsenuix";
import { Icon } from "react-onsenui";
import "./styles/default.scss";
import "onsenui/css/onsenui.css";
import { Kard } from "./Card";

interface State {
  index: number;
}

const MyTab = ({ content }: any) => (
  <Page>
    <section style={{ margin: "16px" }}>
      <Kard name={content} />
    </section>
  </Page>
);

class App extends ActivityX<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
    };

    this.onCreate = this.onCreate.bind(this);
    this.onCreateToolbar = this.onCreateToolbar.bind(this);
  }

  public onCreateToolbar() {
    const titles = ["Home", "Settings"];
    return (
      <Toolbar>
        <Toolbar.Center>{titles[this.state.index]}</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button>
            <Icon icon="md-menu" />
          </Toolbar.Button>
        </Toolbar.Right>
      </Toolbar>
    );
  }

  private renderTabs() {
    return [
      {
        content: <MyTab content="Welcome home" />,
        tab: <Tab label="Home" icon="md-home" />,
      },
      {
        content: <MyTab content="Change the settings" />,
        tab: <Tab label="Settings" icon="md-settings" />,
      },
    ];
  }

  public onCreate(data: ActivityXRenderData<{}, State>): JSX.Element {
    return (
      <Tabbar
        swipeable={true}
        position="auto"
        index={data.s.index}
        onPreChange={(event: TabbarEvent) => {
          if (event.index != data.s.index) {
            this.setState({ index: event.index });
          }
        }}
        renderTabs={this.renderTabs}
      />
    );
  }
}

export { App };
