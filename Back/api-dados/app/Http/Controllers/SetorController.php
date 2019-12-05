<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setor;

class SetorController extends Controller
{
    public function getAll(){
        return Setor::all();
    }

    public function show(Setor $setor){
        return $setor;
    }

    public function store(Request $request){
        $setor = Setor::create([
            'nome_setor'=>$request->input('nome_setor'),
        ]);

        return $setor;
    }

    public function update(Request $request, Setor $setor){

        $setor->nome_setor = $request->input('nome_setor');

        $setor->save();
       
        return $setor;
    }

    public function delete(Setor $setor){

        $setor->delete();

        return response()->json(['success'=>true]);
    }
}
