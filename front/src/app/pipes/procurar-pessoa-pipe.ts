import { Pipe, PipeTransform } from '@angular/core';
import { Registro } from '../models/registro';

@Pipe({
  name: 'searcher'
})
export class ProcurarPessoaPipe implements PipeTransform {

  transform(items: Registro[], procuraPerson: string): Registro[] {

    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.cliente.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
