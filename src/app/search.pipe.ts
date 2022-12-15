import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchString: string, propName: string): any {
    if (searchString === ""){
      return null;
    }
    const resultArray = [];
    for (let item of value) {
      if (item[propName].toLowerCase().match(searchString.toLowerCase())){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
 