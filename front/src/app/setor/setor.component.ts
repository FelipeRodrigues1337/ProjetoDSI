import { Component, OnInit, ElementRef } from '@angular/core';
import { Setor } from '../models/setor';
import { first } from 'rxjs/operators';
import { SetorService } from './setor.service';
import { ProcurarSetorPipe } from '../pipes/nome.setor.pesquisar.pipe';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {

  constructor(private SetorService: SetorService, private elementRef: ElementRef) { }


  setor: Setor[];
  setorBase: Setor;
  displaySetor: string;
  displayUpdate: string;
  display: boolean;
  displayUp: boolean;
  buscarSetor: ProcurarSetorPipe;

  //Validação de formulário
  name_valid: boolean = false;
  att_nameValidation: boolean = false;
  att_selectValidation: boolean = false;
  error: '';
  isLoading: boolean = true;
  addLoading: boolean = false;
  editLoading: boolean = false;
  addButton: boolean = true;
  editButton: boolean = true;

  ngOnInit() {
    this.getSetor();
  }

  onDisplaySetor(value = 'e'){
    this.displaySetor = value;
    console.log(value);
  }

  onDisplay(){
    this.display = !this.display;
  }

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

  onDisplayUpdate(value = 'e'){
    this.displayUpdate = value;
  }


  getSetor(){
    this.SetorService.getSetor()
    .subscribe(Setor =>{ this.setor = Setor,
      this.orderByName();
    });
  }

  onSubmit(p){
    console.log(p);
    this.name_valid = false;
    let name = p.value.nome_setor;
    if(name == ''){
      this.name_valid = true;
    }
    if(this.name_valid){
      return false;
    }
    const SetorResp = {
      'nome_setor': p.value.nome_setor
    };

    this.SetorService.postSetor(SetorResp).subscribe((response) => {
      p.reset();
      this.getSetor();
      this.display = !this.display;
      console.log(response);
      /*this.toastr.success('Categoria adicionada', 'Sucesso!', {
        timeOut: 5000
      });*/
      this.addLoading = false;
      this.addButton = true;
    }, error => {
      this.addButton = false;
    });

  }

  select(p){
    this.setorBase = Object.assign({},p);
  }

  updateSetor(b){
    this.editLoading = true;
    this.editButton = false;
    this.att_nameValidation = false;
    let name = b.value.nome_setor;

    if(name == ''){
      this.att_nameValidation  = true;
    }

    const SetorResp = {
      'nome_setor': b.value.nome_setor
    };
    this.SetorService.updateSetor(SetorResp, this.setorBase.id_setor)
    .subscribe(
      resp => {
        this.setor = null;
        this.displayUp = !this.displayUp;
        this.getSetor();
      },error => {
      });
  }

  deleteSetor(){
    this.SetorService.deleteSetor(this.setorBase.id_setor)
      .subscribe(
        resp => {
          this.setor = null
          this.getSetor();
        },error => {
          this.error = error;
        });
  }


  orderByName(){
    this.setor.sort((a: Setor, b:Setor)=>{
      if(a.nome_setor.toLowerCase() > b.nome_setor.toLowerCase()) {
        return 1;
      } else if(a.nome_setor.toLowerCase() < b.nome_setor.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    })
  }
}
