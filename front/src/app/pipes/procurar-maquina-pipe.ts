import { Pipe, PipeTransform } from '@angular/core';
import { Registro } from '../models/registro';

@Pipe({
  name: 'searcher_machine'
})
export class ProcurarMaquinaPipe implements PipeTransform {

  transform(items: Registro[], procuraIdent: string):Registro[] {

    if(!items) return[];
    if(!procuraIdent) return items;

    return items.filter( it => {
      return it.identificador == procuraIdent;
    })
  }

}
