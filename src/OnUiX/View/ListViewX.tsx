import { isValidElement } from "react";
import { ListItem, ListTitle, Select, Switch } from "react-onsenui";
import ons from "onsenui";
import SharedPreferences, { ISharedPreferences } from "../utils/SharedPreferences";
import tools from "../utils/tools";
import ViewX from "../extend/ViewX";
import GestureX from "./GestureX";
import { IIntentXPushProps } from "../extend/XInit";

interface IProps {
  data: IListInterface[];
  pushPage: any;
}

export interface IListOptions {
  key?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
  /**
   * @deprecated This element slow down the rendering
   */
  expandableContent?: JSX.Element | HTMLElement | string | undefined;
  /**
   * @deprecated This element slow down the rendering
   */
  expandable?: boolean;
  tappable?: boolean;
  unTyped?: any;
  modifier?: string;
  /**
   * Makes an dialog
   */
  helper?: IListHelper;
  type: "switch" | "select" | "";
  text: string | JSX.Element;
  subtext?: string | JSX.Element;

  /**
   * Performs an onClick event to the current list item
   * @param key Get the key from the current list item
   */
  onClick?(key: string | undefined, pushPage: (props: IIntentXPushProps) => void): void;
  selectValue?: IListSelectValue[];
  icon?: string | JSX.Element;
  selectDefaultValue?: string;
  selectDefaultText?: string;
  switchDefaultValue?: boolean;
  /**
   *
   * @param {Event} e Event
   * @param {String} key Returns the key
   * @param {Void} keepDefaultFuntion This will keep the default function
   */
  callback?(e?: any, key?: string | undefined, keepDefaultFuntion?: void): void;
}

export interface IListHelper {
  /**
   * Hold the current list item text to open the dialog
   */
  text: string;
  /**
   * @default true
   */
  cancelable?: boolean;
}

export interface IListSelectValue {
  text: string;
  value: string;
  disabled?: boolean;
}

export interface IListInterface {
  title: string;
  id?: string;
  unTyped?: any;
  style?: React.CSSProperties;
  className?: string;
  content: IListOptions[];
}

class ListViewBuilder extends ViewX<IProps> {
  private pref: ISharedPreferences;

  public constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.pref = new SharedPreferences();
  }

  public render() {
    const { data, pushPage } = this.props;

    return data.map((header: IListInterface) => (
      <>
        <section id={header.id} className={header.className} style={header.style}>
          <ListTitle>{header.title}</ListTitle>
          {header.content.map((item: IListOptions) => (
            <>
              <ListItem
                modifier={tools.typeCheck(item.modifier, "")}
                tappable={tools.typeCheck(item.tappable, false)}
                id={item.key + "-ListItem"}
                style={item.style}
                onClick={() => {
                  if (typeof item.onClick == "function") {
                    const key = item.key;
                    item.onClick(key, pushPage);
                  }
                }}
              >
                {item.icon === (null || "" || undefined) ? null : isValidElement(item.icon) ? (
                  <div className="left">{item.icon}</div>
                ) : null}
                <GestureX
                  event="hold"
                  callback={() => {
                    if (item.helper?.text) {
                      ons.notification.alert({
                        message: item.helper?.text,
                        title: "Info",
                        buttonLabels: ["Ok"],
                        animation: "default",
                        primaryButtonIndex: 1,
                        cancelable: tools.typeCheck(item.helper?.cancelable, true),
                      });
                    }
                  }}
                >
                  <div className="center">
                    {item.subtext === (null || "" || undefined) ? (
                      item.text
                    ) : (
                      <>
                        <span className="list-item__title">{item.text}</span>
                        <span className="list-item__subtitle" style={{ display: "block" }}>
                          {item.subtext}
                        </span>
                      </>
                    )}
                  </div>
                </GestureX>
                <div className="right">
                  {(() => {
                    switch (item.type) {
                      case "switch":
                        return (
                          <Switch
                            //@ts-ignore
                            checked={this.pref.getBoolean(`${item.key!}_switch`, false)}
                            disabled={item.disabled}
                            onChange={(e: any) => {
                              /**
                               * This will keep the default funtion
                               */
                              const keepDefaultFuntion = (): void =>
                                this.pref.setBoolean(`${item.key!}_switch`, e.target.checked);
                              if (typeof item.callback == "function") {
                                const key = item.key;
                                item.callback(e, key, keepDefaultFuntion());
                              } else {
                                keepDefaultFuntion();
                              }
                            }}
                          ></Switch>
                        );
                      case "select":
                        return (
                          <Select
                            disabled={item.disabled}
                            // @ts-ignore --> Argument of type 'string | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'.ts(2345)
                            value={this.pref.getString(`${item.key!}_select`, item.selectDefaultValue)}
                            onChange={(e: any) => {
                              const keepDefaultFuntion = () =>
                                this.pref.setString(`${item.key!}_select`, e.target.value);
                              if (typeof item.callback == "function") {
                                const key = item.key;
                                item.callback(e, key, keepDefaultFuntion());
                              } else {
                                keepDefaultFuntion();
                              }
                            }}
                          >
                            <option value="" selected disabled hidden>
                              {item.selectDefaultText ? item.selectDefaultText : "Choose"}
                            </option>
                            {item.selectValue?.map((select: IListSelectValue) => (
                              <>
                                <option value={select.value} disabled={select.disabled}>
                                  {select.text}
                                </option>
                              </>
                            ))}
                          </Select>
                        );
                      default:
                        return;
                    }
                  })()}
                </div>
              </ListItem>
            </>
          ))}
        </section>
      </>
    ));
  }
}

export default ListViewBuilder;
