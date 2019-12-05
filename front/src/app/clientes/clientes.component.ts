import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { first } from 'rxjs/operators';
import { ClienteService } from './clientes.service';
import { ProcurarClientePipe } from '../pipes/nome.cliente.pesquisar.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private ClienteService:ClienteService, toastr: ToastrService) { }

  Cliente: Cliente[];
  ClienteBase: Cliente;
  displayCliente: string;
  displayUpdate: string;
  display: boolean;
  displayUp: boolean;
  buscarNome: ProcurarClientePipe;

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
    this.getCliente();
  }

  onDisplayCliente(value = 'e'){
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


  getCliente(){
    this.ClienteService.getCliente()
    .subscribe(cliente =>{ this.Cliente = cliente,
      this.orderByName();
    });
  }

  onSubmit(p){
    console.log(p);
    this.name_valid = false;
    let name = p.value.nome;
    if(name == ''){
      this.name_valid = true;
    }
    if(this.name_valid){
      return false;
    }
    const ClienteResp = {
      'nome': p.value.nome
    };

    this.ClienteService.postCliente(ClienteResp).subscribe((response) => {
      p.reset();
      this.getCliente();
      this.display = !this.display;
      console.log(response);

      this.addLoading = false;
      this.addButton = true;
    }, error => {
      this.addButton = false;
    });

  }

  select(p){
    this.ClienteBase = Object.assign({},p);
  }

  updateCliente(b){
    this.editLoading = true;
    this.editButton = false;
    this.att_nameValidation = false;
    let name = b.value.nome;

    if(name == ''){
      this.att_nameValidation  = true;
    }

    const ClienteResp = {
      'nome': b.value.nome
    };
    this.ClienteService.updateCliente(ClienteResp, this.ClienteBase.id_cliente)
    .subscribe(
      resp => {
        this.Cliente = null;
        this.displayUp = !this.displayUp;
        this.getCliente();
      },error => {
      });
  }

  deleteCliente(){
    this.ClienteService.deleteCliente(this.ClienteBase.id_cliente)
      .subscribe(
        resp => {
          this.Cliente = null
          this.getCliente();
        },error => {
          this.error = error;
        });
  }


  orderByName(){
    this.Cliente.sort((a: Cliente, b:Cliente)=>{
      if(a.nome.toLowerCase() > b.nome.toLowerCase()) {
        return 1;
      } else if(a.nome.toLowerCase() < b.nome.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    })
  }

}
