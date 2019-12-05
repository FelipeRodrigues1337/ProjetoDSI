import { Pipe, PipeTransform } from '@angular/core';
import { Setor } from '../models/setor';


@Pipe({
  name: 'searcherSetor'
})
export class ProcurarSetorPipe implements PipeTransform {

  transform(items: Setor[], procuraPerson: string): Setor[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.nome_setor.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
