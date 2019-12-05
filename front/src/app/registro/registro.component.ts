import { Component, OnInit, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { RegistroService } from './registro.service';
import { Setor } from '../models/setor';
import { Maquina } from '../models/maquina';
import { Registro } from '../models/registro';
import { Cliente } from '../models/cliente';
import { ProcurarPessoaPipe } from '../pipes/procurar-pessoa-pipe';
import { ProcurarMovPipe } from '../pipes/procurar-setor-pipe';
import { ProcurarMaquinaPipe} from '../pipes/procurar-maquina-pipe';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private RegistroService: RegistroService) { }

  buscarNome: ProcurarPessoaPipe;
  buscarSetor: ProcurarMovPipe;
  buscarIdent: ProcurarMaquinaPipe;
  identBase: number;
  Registro: Registro[];
  registroBase: Registro;
  Maquina: Maquina[];
  maquinaBase: Maquina;
  Cliente: Cliente[];
  clienteBase: Cliente;
  Setor: Setor[];
  setorBase: Setor;
  displayCliente: string;
  displayUpdate: string;
  display: boolean;
  displayUp: boolean;

  //Validação de formulário
  name_valid: boolean = false;
  identificador_valid: boolean = false;
  estado_valid: boolean = false;
  att_nameValidation: boolean = false;
  att_selectValidation: boolean = false;
  error: '';
  isLoading: boolean = true;
  addLoading: boolean = false;
  editLoading: boolean = false;
  addButton: boolean = true;
  editButton: boolean = true;
  textProblema: string = "Problema:\nSolução:\nObservação:\n";





  ngOnInit() {
    this.getRegistro();
    this.getMaquina();
    this.getCliente();
    this.getSetor();
  }

  gerarPDF() {
    let documento = new jsPDF();
    documento.setFont("Courier");
    documento.setFontStyle("bold");
    documento.setFontSize(20);
    documento.text("Ficha da Maquina", 70, 15);

    documento.setFillColor(50,50,50);
    documento.rect(8, 20, 40, 8,"FD");
    documento.rect(8, 28, 40, 8, "FD");
    documento.rect(8, 36, 40, 8, "FD");
    documento.rect(8, 44, 40, 8, "FD");
    documento.rect(8, 52, 40, 8, "FD");
    documento.rect(8, 61, 40, 8, "FD");
    documento.rect(48, 20, 159, 8, );
    documento.rect(48, 28, 159, 8, );
    documento.rect(48, 36, 159, 8, );
    documento.rect(48, 44, 159, 8, );
    documento.rect(48, 52, 159, 8, );
    documento.rect(8, 61, 199, 60, );

    documento.setFontSize(12);
    documento.setTextColor(255, 255, 255);
    documento.text("Responsável", 10, 25);
    documento.text("Setor", 10, 33);
    documento.text("Identificador", 10, 41);
    documento.text("Modelo Gabinete", 10, 49);
    documento.text("Estado", 10, 57);
    documento.text("Informações:", 10, 66);


    documento.setFontStyle("normal");
    documento.setTextColor(0, 0, 0);
    documento.text(this.registroBase.cliente, 58, 25);
    documento.text(this.registroBase.nomeSetor, 58, 33);
    documento.text(this.registroBase.identificador, 58, 41);
    documento.text(this.registroBase.gabinete, 58, 49);
    documento.text(this.registroBase.estado_manutencao, 58, 57);
    documento.text(this.registroBase.descricao_problema, 8, 78);
    documento.text("Assinatura do Técnico: ", 10, 136);
    documento.line(66, 136, 199, 136,"DF");
    documento.text("Assinatura do Cliente: ", 10, 160);
    documento.line(66, 160, 199, 160,"DF");

    documento.text("Data:__________________/___________________/______________ ", 10, 180);
    documento.output("dataurlnewwindow");
  }

  onDisplayRegistro(value = 'e') {
    this.displayCliente = value;
    console.log(value);
  }

  onDisplay() {
    this.display = !this.display;
  }

  onDisplayUp() {
    this.displayUp = !this.displayUp;
  }

  onDisplayUpdate(value = 'e') {
    this.displayUpdate = value;
  }


  getRegistro() {
    this.RegistroService.getRegistro()
      .subscribe(registro => {
        this.Registro = registro,
          this.orderByName();
      });
  }

  getSetor(){
    this.RegistroService.getSetor()
    .subscribe(Setor =>{ this.Setor = Setor,
      this.orderByName();
    });
  }

  getMaquina(){
    this.RegistroService.getMaquina()
    .subscribe(maquina =>{ this.Maquina = maquina,
      this.orderByName();
    });
  }

  getCliente(){
    this.RegistroService.getCliente()
    .subscribe(cliente =>{ this.Cliente = cliente,
      this.orderByName();
    });
  }


  onSubmit(p) {
    //Maquina Validacao
    this.identificador_valid = false;
    let identificador = p.value.maquina;
    if (identificador==undefined) {
      this.identificador_valid = true;
    }
    if (this.identificador_valid) {
      return false;
    }
    //Estado validacao
    this.estado_valid = false;
    let estado_manutencao = p.value.estado;
    if (estado_manutencao=="") {
      console.log("ok");
      this.estado_valid = true;
    }
    if (this.estado_valid) {
      return false;
    }

    const RegistroResp = {
      'cliente': p.value.cliente,
      'maquina': p.value.maquina,
      'descricao': p.value.descricao,
      'manutencao':p.value.estado,
    };

    this.RegistroService.postRegistro(RegistroResp).subscribe((response) => {
      p.reset();
      this.getRegistro();
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

  select(p) {
    this.registroBase = Object.assign({}, p);
  }

  selectMaquina(p) {
    this.registroBase = Object.assign({}, p);
    this.identBase = this.registroBase.id_maquina;
  }


  updateRegistro(b) {
    //Maquina Validacao
    this.identificador_valid = false;
    let identificador = b.value.maquina;
    if (identificador=='') {
      this.identificador_valid = true;
    }
    if (this.identificador_valid) {
      return false;
    }
    //Estado validacao
    this.estado_valid = false;
    let estado_manutencao = b.value.estado;
    if (estado_manutencao=="") {
      console.log("ok");
      this.estado_valid = true;
    }
    if (this.estado_valid) {
      return false;
    }


    const RegistroResp = {
      'maquina': b.value.maquina,
      'descricao': b.value.descricao,
      'estado':b.value.estado,
    };

    console.log(RegistroResp);
    this.RegistroService.updateRegistro(RegistroResp, this.registroBase.id_registro)
      .subscribe(
        resp => {
          this.Registro = null;
          this.displayUp = !this.displayUp;
          this.getRegistro();
        }, error => {
        });
  }

  deleteRegistro() {
    this.RegistroService.deleteRegistro(this.registroBase.id_registro)
      .subscribe(
        resp => {
          this.Registro = null
          this.getRegistro
            ();
        }, error => {
          this.error = error;
        });
  }


  orderByName() {
    this.Registro.sort((a: Registro, b: Registro) => {
      if (a.cliente.toLowerCase() > b.cliente.toLowerCase()) {
        return 1;
      } else if (a.cliente.toLowerCase() < a.cliente.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    })
  }

}
