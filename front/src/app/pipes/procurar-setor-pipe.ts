import { Pipe, PipeTransform } from '@angular/core';
import { Registro } from '../models/registro';

@Pipe({
  name: 'searcher_mov'
})
export class ProcurarMovPipe implements PipeTransform {

  transform(items: Registro[], procuraMov: string):Registro[] {

    if(!items) return[];
    if(!procuraMov) return items;

    procuraMov = procuraMov.toLowerCase();


    return items.filter( it => {
      return it.nomeSetor.toLocaleLowerCase().includes(procuraMov);
    })
  }

}
