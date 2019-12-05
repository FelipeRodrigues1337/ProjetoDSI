import { Pipe, PipeTransform } from '@angular/core';
import { Maquina } from '../models/maquina';

@Pipe({
  name: 'searcher_maquina'
})
export class ProcurarTMaquinaPipe implements PipeTransform {

  transform(items: Maquina[], procuraIdent: string):Maquina[] {

    if(!items) return[];
    if(!procuraIdent) return items;

    return items.filter( it => {
      return it.identificador == procuraIdent;
    })
  }

}
