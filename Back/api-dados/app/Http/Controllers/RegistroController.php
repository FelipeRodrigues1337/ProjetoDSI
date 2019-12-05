<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Registro;
use DB;

class RegistroController extends Controller
{
    public function getAll(){
        return Registro::getRegistros();
    }

    public function show(Registro $registro){
        return $registro;
    }

    public function store(Request $request){
        $registro = Registro::create([
            'id_maquina'=>$request->input('maquina'),
            'descricao_problema'=>$request->input('descricao'),
            'estado_manutencao'=>$request->input('manutencao'),
        ]);
        return $registro;
    }

    public function update(Request $request, Registro $registro){
        $registro->id_maquina = $request->input('maquina');
        $registro->descricao_problema = $request->input('descricao');
        $registro->estado_manutencao = $request->input('estado');
        $registro->save();

        return $registro;
    }

    public function delete(Registro $registro){

        $registro->delete();

        return response()->json(['success'=>true]);
    }
}
