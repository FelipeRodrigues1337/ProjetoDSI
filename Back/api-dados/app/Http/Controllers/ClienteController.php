<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cliente;

class ClienteController extends Controller
{
    public function getAll(){
        return Cliente::all();
    }

    public function show(Cliente $cliente){
        return $cliente;
    }

    public function store(Request $request){
        $cliente = Cliente::create([
            'nome'=>$request->input('nome'),
        ]);

        return $cliente;
    }

    public function update(Request $request, Cliente $cliente){

        $cliente->nome = $request->input('nome');
        $cliente->save();
       
        return $cliente;
    }

    public function delete(Cliente $cliente){

        $cliente->delete();

        return response()->json(['success'=>true]);
    }
}
