<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
class Maquina extends Model
{
    protected $primaryKey='id_maquina';
    protected $fillable = ['gabinete','identificador','setor_id_setor','nomeCliente'];

    public static function getMaquinas(){
        $maquina=DB::table('maquinas')
        ->join('setors', 'setors.id_setor' , '=' ,'maquinas.setor_id_setor')
        ->select('maquinas.id_maquina','maquinas.gabinete','maquinas.nomeCliente', 'maquinas.identificador', 'maquinas.setor_id_setor', 'setors.nome_setor as nomeSetor')
        ->get();
        return $maquina;
    }
}
