<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Registro extends Model
{
    protected $primaryKey='id_registro';
    protected $fillable = ['id_maquina','descricao_problema','estado_manutencao'];

    public static function getRegistros(){
        $registro=DB::table('registros')
        ->join('maquinas', 'maquinas.id_maquina' , '=' ,'registros.id_maquina')
        ->join('setors', 'setors.id_setor' , '=' ,'maquinas.setor_id_setor')
        ->select(
        /*Registros*/'registros.id_registro','registros.id_maquina','registros.descricao_problema','registros.estado_manutencao',
        /*Maquinas*/'maquinas.nomeCliente as cliente','maquinas.identificador as identificador','maquinas.gabinete as gabinete',
        /*Setores*/'setors.nome_setor as nomeSetor'
         )
        ->get();
        return $registro;
    }
}
