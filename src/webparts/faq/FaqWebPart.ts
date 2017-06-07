import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Faq.module.scss';
import * as strings from 'faqStrings';
import { IFaqWebPartProps } from './IFaqWebPartProps';

import * as $ from 'jquery';
import html from './Faq.html';


export default class FaqWebPart extends BaseClientSideWebPart<IFaqWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = html.innerHtml;
      let xyz = $(this.domElement).find('.jks').text();
      this.getListItem();
  }

  /* Get List Item */
private getListItem() {
	// Getting our list item
	$.ajax({
		url:  "/sites/dev/_api/web/lists/getbytitle('FAQ')/items?",
		method: "GET",
		async:false,
		headers: { "Accept": "application/json; odata=verbose" },
		success: function (data) {
			// Returning the results
			var datas = data.d.results;
      $('.viewlist').empty();
        var rlength = datas.length;
        var resultpane = '';
        for(var x=0;x<rlength;x++)
        {
          resultpane = '<h1>'+datas[x].Title +'</h1>';
          resultpane += '<div>'+datas[x].Answers +'</div>';
          $('.viewlist').append(resultpane);
        }
        
		},
		error: function (data) {
			console.log('error');
		}
		});
}


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
