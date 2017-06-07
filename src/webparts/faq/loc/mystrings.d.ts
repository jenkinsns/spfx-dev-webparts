declare interface IFaqStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'faqStrings' {
  const strings: IFaqStrings;
  export = strings;
}
