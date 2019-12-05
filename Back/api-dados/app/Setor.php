<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setor extends Model
{
    protected $primaryKey='id_setor';
    protected $fillable = ['nome_setor'];
}
