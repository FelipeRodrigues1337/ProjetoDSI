import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../models/cliente';

@Pipe({
  name: 'searcherClient'
})
export class ProcurarClientePipe implements PipeTransform {

  transform(items: Cliente[], procuraPerson: string): Cliente[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.nome.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
