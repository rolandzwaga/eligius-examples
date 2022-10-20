declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const object: any;
  export default object;
}
