<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Maquina;
use DB;
class MaquinaController extends Controller
{
    public function getAll(){
        return Maquina::getMaquinas();
    }

    public function show(Maquina $maquina){
        return $maquina;
    }

    public function store(Request $request){
        $maquina = Maquina::create([
            'gabinete'=>$request->input('gabinete'),
            'identificador'=>$request->input('identificador'),
            'setor_id_setor'=>$request->input('setor'),
            'nomeCliente'=>$request->input('nomeCliente'),
        ]);

        return $maquina;
    }

    public function update(Request $request, Maquina $maquina){

        $maquina->gabinete = $request->input('gabinete');
        $maquina->identificador = $request->input('identificador');
        $maquina->setor_id_setor = $request->input('setor_id_setor');
        $maquina->nomeCliente = $request->input('nomeCliente');
        $maquina->save();
        return $maquina;
    }

    public function delete(Maquina $maquina){

        $maquina->delete();

        return response()->json(['success'=>true]);
    }
}
