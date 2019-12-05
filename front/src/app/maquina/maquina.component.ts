import { Component, OnInit } from '@angular/core';
import { Maquina } from '../models/maquina';
import { first } from 'rxjs/operators';
import { MaquinaService } from './maquina.service';
import { Setor } from '../models/setor';
import { ProcurarTMaquinaPipe } from '../pipes/procurar-tmaquinas-pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.css']
})
export class MaquinaComponent implements OnInit {

  constructor(private MaquinaService:MaquinaService, private toastr: ToastrService) { }


  Maquina: Maquina[];
  Setor: Setor[];
  setorBase: Setor;
  MaquinaBase: Maquina;
  displayCliente: string;
  displayUpdate: string;
  display: boolean;
  displayUp: boolean;
  buscaTmaquina: ProcurarTMaquinaPipe;


  //Validação de formulário
  name_valid: boolean = false;
  gabinete_valid: boolean = false;
  identificador_Valid: boolean = false;
  setor_id_setor_valid: boolean = false;
  att_gabinete_valid: boolean = false;
  att_identificador_valid: boolean = false;
  att_nomeCliente_valid: boolean = false;
  att_selectValidation: boolean = false;
  error: '';
  isLoading: boolean = true;
  addLoading: boolean = false;
  editLoading: boolean = false;
  addButton: boolean = true;
  editButton: boolean = true;

  ngOnInit() {
    this.getMaquina();
    this.getSetor();
  }

  onDisplayMaquina(value = 'e'){
    this.displayCliente = value;
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


  getMaquina(){
    this.MaquinaService.getMaquina()
    .subscribe(maquina =>{ this.Maquina = maquina,
      this.orderByName();
    });
  }

  getSetor(){
    this.MaquinaService.getSetor()
    .subscribe(setor =>{ this.Setor = setor,
      this.orderByName();
    });
  }

  onSubmit(p){
  //Cliente Validação
    this.name_valid = false;
    let cliente = p.value.cliente;
    if(cliente == ''){
      this.name_valid = true;
    }
    if(this.name_valid){
      return false;
    }
 //Gabinete Validação
    this.gabinete_valid = false;
    let gabinete = p.value.gabinete;
    if(gabinete == ''){
      this.gabinete_valid = true;
    }
    if(this.gabinete_valid){
      return false;
    }
  //Identificador Validação
    this.identificador_Valid = false;
    let identificador = p.value.identificador;
    if( identificador == ''){
      this.identificador_Valid= true;
     }
    if(this.identificador_Valid){
      return false;
     }
  //Setor Validação
    this.setor_id_setor_valid = false;
    let setor = p.value.setor_id_setor;
    if( setor == ''){
      this.setor_id_setor_valid= true;
    }
    if(this.setor_id_setor_valid){
      return false;
    }

    const MaquinaResp = {
      'gabinete': p.value.gabinete,
      'identificador':p.value.identificador,
      'setor':p.value.setor_id_setor,
      'nomeCliente': p.value.cliente
    };

    this.MaquinaService.postMaquina(MaquinaResp).subscribe((response) => {
      p.reset();
      this.getMaquina();
      this.display = !this.display;
      console.log(response);
    }, error => {

    });

  }

  select(p){
    this.MaquinaBase = Object.assign({},p);
  }

  updateMaquina(b){
     //Identificador validacao
     this.att_nomeCliente_valid = false;
     let nomeCliente = b.value.nomeCliente;
     if( nomeCliente == ''){
       this.att_nomeCliente_valid = true;
     }
     if(this.att_nomeCliente_valid){
       return false;
     }
    //Gabinete validacao
    this.att_gabinete_valid = false;
    let gabinete = b.value.att_gabinete;
    if( gabinete == ''){
      this.att_gabinete_valid = true;
    }
    if(this.att_gabinete_valid){
      return false;
    }
    //Identificador validacao
    this.att_identificador_valid = false;
    let identificador = b.value.identificador;
    if( identificador == ''){
      this.att_identificador_valid= true;
    }
    if(this.att_identificador_valid){
      return false;
    }

    const MaquinaResp = {
      'gabinete': b.value.att_gabinete,
      'identificador': b.value.identificador,
      'setor_id_setor': b.value.setor,
      'nomeCliente' : b.value.nomeCliente
    };

    console.log(MaquinaResp);
    this.MaquinaService.updateMaquina(MaquinaResp, this.MaquinaBase.id_maquina)
    .subscribe(
      resp => {
        this.Maquina = null;
        this.displayUp = !this.displayUp;
        this.getMaquina();
      },error => {
      });
  }

  deleteMaquina(){
    this.MaquinaService.deleteMaquina(this.MaquinaBase.id_maquina)
      .subscribe(
        resp => {
          this.Maquina = null
          this.getMaquina
          ();
        },error => {
          this.error = error;
        });
  }


  orderByName(){
    this.Maquina.sort((a: Maquina, b:Maquina)=>{
      if(a.gabinete.toLowerCase() > b.gabinete.toLowerCase()) {
        return 1;
      } else if(a.gabinete.toLowerCase() < a.gabinete.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    })
  }

}
