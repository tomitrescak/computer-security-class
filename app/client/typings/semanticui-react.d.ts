import React = __React;

declare module "semanticui-react" {


  export function init(component: string): void;
  export let config: {
    linkElement: any,
    i18n: (key: string) => string
  };

  interface IProps {
    classes?: string;
    children?: any;
    divider: string;
  }

  // export class Input extends React.Component<IProps, {}> { }


  interface IEntity {
    id: string;
  }

  interface IComponent {
    classes?: string;
  }

  interface ILocalComponent extends IComponent {
    mid: string;
    text: string;
  }

  // COLLECTIONS

  // breadcrumbs

  interface IBreadcrumbsProps {
    classes?: string;
    children?: any;
    divider?: string;
    dividerIcon?: string;
  }

  export class Breadcrumbs extends React.Component<IBreadcrumbsProps, {}> { }

  interface IBreadcrumbProps {
    text?: string | { key: string, parameters: Object };
    link?: any;
    active?: boolean;
  }

  export class Breadcrumb extends React.Component<IBreadcrumbProps, {}> { }

  // form

  interface IFormProps {
    classes?: string;
    children?: any;
  }

  export class Form extends React.Component<IFormProps, {}> { }

  // grid

  interface IGridProps {
    classes?: string;
    columns?: number;
    children?: any;
    stackable?: boolean;
    page?: boolean;
    divided?: boolean;
    align?: "center" | "left" | "right"
  }

  export class Grid extends React.Component<IGridProps, {}> { }

  // menu

  interface IMenuProps extends IColors {
    classes?: string;
    children?: any;
    pagination?: boolean;
    vertical?: boolean;
    inverted?: boolean;
    position?: string;
  }

  export class Menu extends React.Component<IMenuProps, {}> { }

  interface IMenuDropdown {
    icon?: string;
    text?: string | { key: string, parameters: Object };
    children?: any;
    id: string;
  }

  export class MenuDropdown extends React.Component<IMenuDropdown, {}> { }

  interface IMenuItem {
    classes?: string;
    icon?: string;
    text?: string | { key: string, parameters: Object };
    children?: any;
    link?: string;
    onClick?: Function;
  }

  export class MenuItem extends React.Component<IMenuItem, {}> { }

  ///////////////////////////////////////////////////////
  // components

  interface IColors {
    color?: "default" | "primary" | "secondary" | "success" | "failure" | "blue" | "red" | "olive" | "orange" | "yellow" | "green" | "teal" | "blue" | "violet" | "pink" | "purple" | "brown" | "grey" | "black";
  }

  interface ISizes {
    size?: "mini" | "tiny" | "small" | "medium" | "large" | "huge" | "massive";
  }

  export interface IButton extends IColors, ISizes {
    classes?: string;
    text?: string | { key: string, parameters: Object };
    basic?: boolean;
    inverted?: boolean;
    compact?: boolean;
    icon?: string;
    floated?: "left" | "right";
    labeled?: "left" | "right";
    loading?: boolean;
    circular?: boolean;
    toggle?: "active" | "inactive";
    fluid?: boolean;
    disabled?: boolean;
    attached?: "left" | "right";
    active?: boolean;
    onClick?: Function;
    url?: string;
    target?: string;
    style?: any;
  }

  export class Button extends React.Component<IButton, {}> { }

  // buttons

  interface IButtons extends IColors, ISizes {
    classes?: string;
    children?: any;
    vertical?: boolean;
    labeled?: boolean;
    icon?: boolean;
  }

  export class Buttons extends React.Component<IButton, {}> { }

  // column

  interface IColumn {
    classes?: string;
    width?: number;
    children?: any;
  }

  export class Column extends React.Component<IColumn, {}> { }

  // divider

  interface IDivider {
    classes?: string;
    children?: any;
    icon?: string;
    inverted?: boolean;
    orientation?: "vertical" | "horizontal";
    isHeader?: boolean;
  }

  export class Divider extends React.Component<IDivider, {}> { }

  // fields

  interface IFieldsProps {
    children?: any;
    type?: "inline" | "grouped";
  }

  export class Fields extends React.Component<IFieldsProps, {}> { }

  interface IFieldProps {
    children?: any;
    type?: "inline" | "grouped";
    label?: string;
    text?: string | { key: string, parameters: Object };
    width?: number;
    style?: any;
  }

  export class Field extends React.Component<IFieldProps, {}> { }

  // header

  interface IHeader extends IColors {
    classes?: string;
    children?: any;
    icon?: string;
    sub?: string;
    circular?: boolean;
    alignment?: "center" | "left" | "right";
    image?: string;
    dividing?: boolean;
    attached?: "top" | "middle" | "bottom";
    iconOnTop?: boolean;
    block?: boolean;
    inverted?: boolean;
    text?: string | { key: string, parameters: Object };
  }

  export class Header1 extends React.Component<IHeader, {}> { }
  export class Header2 extends React.Component<IHeader, {}> { }
  export class Header3 extends React.Component<IHeader, {}> { }
  export class Header4 extends React.Component<IHeader, {}> { }
  export class Header5 extends React.Component<IHeader, {}> { }

  // icon

  interface IIcon {
    classes?: string;
    children?: any;
    icon: string;
  }

  export class Icon extends React.Component<IIcon, {}> { }

  // image

  interface IImage extends ISizes {
    classes?: string;
    children?: any;
    src?: string;
    avatar?: boolean;
    bordered?: boolean;
    fluid?: boolean;
    rounded?: boolean;
    circular?: boolean;
    align?: "top" | "middle" | "bottom";
    centered?: boolean;
    spaced?: boolean;
    float?: "left" | "right";
  }

  export class Image extends React.Component<IImage, {}> { }

  // input

  interface IInput {
    classes?: string;
    placeholder?: string;
    label?: string;
    icon?: string;
    search?: boolean;
    iconPosition?: string;
    onChange?: Function;
    children?: any;
    inputClasses?: string;
    type?: string;
    value?: any;
    defaultValue?: any;
    leftLabel?: string;
    rightLabel?: string;
    inline?: boolean;
    step?: string;
    readOnly?: boolean;
    disabled?: boolean; 
  }

  export class Input extends React.Component<IInput, {}> {
    value: any;
  }

  // label

  interface ILabel extends ISizes, IColors {
    classes?: string;
    children?: any;
    icon?: string;
    rightIcon?: string;
    image?: string;
    detail?: string;
    pointing?: "left" | "right" | "above" | "below";
    basic?: boolean;
    corner?: "left" | "right";
    tag?: boolean;
    ribbon?: boolean;
    attached?: "top" | "bottom" | "top right" | "top left" | "bottom left" | "bottom right";
    horizontal?: boolean;
    floating?: boolean;
    circular?: boolean;
    text?: string | { key: string, parameters: Object };
    link?: string;
    onClick?: Function;
    style?: any;
  }

  export class Label extends React.Component<ILabel, {}> { }

  // list

  interface IList extends ISizes {
    classes?: string;
    children?: any;
    divided?: boolean;
    bulleted?: boolean;
    ordered?: boolean;
    celled?: boolean;
    relaxed?: boolean;
    selection?: boolean;
    animated?: boolean;
    inverted?: boolean;
    link?: boolean;
    align?: "middle" | "top" | "bottom";
  }

  export class List extends React.Component<IList, {}> { }

  interface IListItemProps {
    classes?: string;
    children?: any;
    icon?: string;
    image?: string;
    float?: "right" | "left";
    bullet?: string;
    link?: string;
    onClick?: Function;
    text?: string | { key: string, parameters: Object };
  }

  export class ListItem extends React.Component<IListItemProps, {}> { }

  // loader

  interface ILoader {
    classes?: string;
    inline?: boolean;
    size?: "small" | "large";
    active?: boolean;
  }

  export class Loader extends React.Component<ILoader, {}> { }

  // segment

  interface ISegment extends IColors {
    classes?: string;
    children?: any;
    attached?: "top" | "bottom" | "middle";
    loading?: boolean;
    inverted?: boolean;
    compact?: boolean;
    circular?: boolean;
    alignment?: "left" | "center" | "right";
    float?: "left" | "right";
    style?: any;
  }

  export class Segment extends React.Component<ISegment, {}> { }

  interface ISegments {
    classes?: string;
    children?: any;
  }

  export class Segments extends React.Component<ISegments, {}> { }

  // site

  interface ISite {
    classes?: string;
    children?: any;
  }

  export class Site extends React.Component<ISite, {}> { }

  // steps

  interface ISteps {
    classes?: string;
    children?: any;
    ordered?: boolean;
    vertical?: boolean;
    fluid?: boolean;
    stackable?: boolean;
    attached?: "top" | "bottom";
  }

  export class Steps extends React.Component<ISteps, {}> { }

  interface IStep {
    active?: boolean;
    icon?: string;
    title: string;
    disabled?: boolean;
    completed?: boolean;
    children?: any;
  }

  export class Step extends React.Component<IStep, {}> { }

  ////////////////////////////////////////
  // MODULES

  // accordion

  interface IAcordion {
    styled?: boolean;
    classes?: string;
    exclusive?: boolean;
    children?: any;
    id: string;
    menu?: boolean;
  }

  export class Accordion extends React.Component<IAcordion, {}> { }

  interface IAccordionItem {
    children?: any;
    title: string;
    active?: boolean;
  }

  export class AccordionItem extends React.Component<IAccordionItem, {}> { }

  // checkbox

  interface IRadio {
    classes?: string;
    id?: string;
    name?: string;
    children?: any;
    text?: string | { key: string, parameters: Object };
    checked?: boolean;
    disabled?: boolean;
    fitted?: boolean;
    onChange?: Function;
  }

  export class Radio extends React.Component<IRadio, {}> { }

  interface ICheckbox extends IRadio {
    variation?: "slider" | "toggle";
  }

  export class Checkbox extends React.Component<ICheckbox, {}> { }

  // dropdowns

  interface IDropdown extends IColors {
    id: string;
    classes?: string;
    defaultText?: string | { key: string, parameters: Object };
    text?: string | { key: string, parameters: Object };
    selection?: boolean;
    fluid?: boolean;
    search?: boolean;
    multiple?: boolean;
    children?: any;
    activation: "hover" | "click";
    label?: string;
    onChange?: (value: string, text: string) => void;
    onInit?: (elem: any) => void;
    value?: any;
    defaultValue?: any;
  }

  export class Dropdown extends React.Component<IDropdown, {}> { }

  interface IDropdownItem {
    value?: string;
    image?: string;
    icon?: string;
    text?: string | { key: string, parameters: Object };
    children?: any;
  }

  export class DropdownItem extends React.Component<IDropdownItem, {}> { }

  interface IDropdownButton {
    id: string;
    classes?: string;
    icon?: string;
    children?: any;
    activation: "hover" | "click";
    pointing?: string;
    labeled?: boolean;
    color: IColors;
    compact: boolean;
  }

  export class DropdownButton extends React.Component<IDropdownButton, {}> { }

  // modal

  interface IModal {
    id: string;
    classes?: string;
    header?: string;
    children?: any;
    image?: boolean;
    small?: boolean;
    icon?: string;
    approveAction?: Function;
    neutralAction?: Function;
    cancelAction?: Function;
    approveText?: string | { key: string, parameters: Object };
    neutralText?: string | { key: string, parameters: Object };
    cancelText?: string | { key: string, parameters: Object };
  }

  export class Modal extends React.Component<IModal, {}> { }

  // progress

  interface IProgress extends IColors {
    id: string;
    classes?: string;
    value: number;
    total: number;
    indicating?: boolean;
    text?: string | { key: string, parameters: Object };
    showProgress?: boolean;
    successText?: string | { key: string, parameters: Object };
    progressText?: string | { key: string, parameters: Object };
  }

  export class Progress extends React.Component<IProgress, {}> { }

  // rating

  interface IRating {
    id: string;
    classes?: string;
    size?: "mini" | "tiny" | "small" | "medium" | "large" | "huge" | "massive";
    type: "star" | "heart";
    rating: number;
    maxRating: number;
  }

  export class Rating extends React.Component<IRating, {}> { }

  // search

  interface ISearch {
    classes?: string;
    id: string;
    text: string;
    loading?: boolean;
    fluid?: boolean;
    category?: boolean;
    values?: { title: string }[];
    setup?: Function;
  }

  export class Search extends React.Component<ISearch, {}> { }

  // sidebar

  interface ISidebar {
    classes?: string;
    id: string;
    children?: any;
    position?: "top" | "left" | "bottom" | "right";
    inverted?: boolean;
    visible?: boolean;
  }

  export class Sidebar extends React.Component<ISidebar, {}> { }

  // tabs

  interface ITab {
    title?: string; // non-internationalised
    text?: string | { key: string, parameters: Object };
    children?: any;
    url?: string;
    name?: string;
    style?: any;
    icon?: string;
  }

  interface ITabs {
    classes?: string;
    containerClass?: string;
    id: string;
    children?: any;
    activeTab?: string;
    type?: "tabs" | "buttons" | "lines";
    linkBased?: boolean;
    selected?: (name: string) => void;
  }

  export class Tabs extends React.Component<ITabs, {}> { }

  export class Tab extends React.Component<ITab, {}> { }

  ///////////////////////////////////////////////
  // VIEWS

  // comments

  interface IComments {
    classes?: string;
    children?: any;
    header?: string;
    commentPlaceholder?: string;
    addButtonText: string;
    previewButtonText?: string | { key: string, parameters: Object };
    addComment: (e?: React.SyntheticEvent, comment?: string) => void;
    previewComment?: (comment: string) => void;
  }

  export class Comments extends React.Component<IComments, {}> { }

  interface IAction {
    name: string;
    handler: Function;
  }

  interface IComment {
    image?: string;
    date: string;
    children?: any;
    author: string;
    actions?: IAction[];
    text?: string | { key: string, parameters: Object };
  }

  export class Comment extends React.Component<IComment, {}> { }

  // feed

  interface IFeed extends ISizes {
    classes?: string;
    children?: any;
  }

  export class Feed extends React.Component<IFeed, {}> { }

  interface ILinkImage {
    src: string;
    link: string;
  }

  interface IFeedItem {
    image?: string;
    date?: string;
    children?: any;
    likes?: string;
    extraImages?: ILinkImage[];
    text?: string | { key: string, parameters: Object };
  }

  export class FeedItem extends React.Component<IFeedItem, {}> { }

  // items

  interface IItems {
    classes?: string;
    children?: any;
    loading?: boolean;
    divided?: boolean;
    link?: boolean;
  }

  export class Items extends React.Component<IItems, {}> { }

  interface IMeta {
    name: string;
    description?: string;
  }

  interface IITemBase {
    state?: any;
    classes?: string;
  }

  interface IITemImage extends IITemBase {
    state?: any;
    classes?: string;
    size?: ISizes;
    src?: string;
  }

  interface IItem {
    image?: string | any;
    icon?: string;
    header?: string | any;
    link?: string;
    children?: any;
    imageSize?: "tiny" | "small";
    meta?: any;
    alignment?: "middle aligned" | "top aligned" | "middle aligned";
    description?: any;
    extra?: any;
  }

  export module Item {
    export class Main extends React.Component<IItem, {}> { }

    export class Image extends React.Component<IITemImage, {}> { }

    export class Content extends React.Component<IITemBase, {}> { }

    export class Header extends React.Component<IITemBase, {}> { }

    export class Extra extends React.Component<IITemBase, {}> { }

    export class Meta extends React.Component<IITemBase, {}> { }

    export class Description extends React.Component<IITemBase, {}> { }
  }

  interface SUIComponent {
    style?: any;
  }

  interface IJumbo extends SUIComponent {
    classes?: string;
    children?: any;
    inverted?: boolean;
  }

  export class Jumbo extends React.Component<IJumbo, {}> { }

  interface IText {
    classes?: string;
    style?: Object;
    text: string;
  }

  export class Text extends React.Component<IText, {}> { }

  interface ILink {
    classes?: string;
    style?: Object;
    text?: string | { key: string, parameters: Object };
    link: string;
    icon?: string;
    onClick?: Function;
  }

  export class Link extends React.Component<ILink, {}> { }

  interface IMessage extends IColors {
    size?: "mini" | "tiny" | "small" | "medium" | "large" | "huge" | "massive";
    classes?: string;
    children?: any;
    header?: string;
    icon?: string;
    attached?: boolean;
    compact?: boolean;
    fluid?: boolean;
  }

  export class Message extends React.Component<IMessage, {}> { }

  interface ITextArea {
    classes?: string;
    placeholder?: string;
    label?: string;
    onChange?: Function;
    value?: any;
    defaultValue?: any;
    rows?: number;
    cols?: number;
    inline?: boolean;
    previewMarkdown?: boolean;
  }

  export class TextArea extends React.Component<ITextArea, {}> { }
}

