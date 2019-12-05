<?php

use Illuminate\Http\Request;

//ROTAS PARA SETOR//
Route::get("setor","SetorController@getAll");
Route::get("setor/{setor}","SetorController@show");
Route::post("setor","SetorController@store");
Route::patch("setor/{setor}","SetorController@update");
Route::delete("setor/{setor}","SetorController@delete");
//ROTAS PARA CLIENTE//
Route::get("cliente","ClienteController@getAll");
Route::get("cliente/{cliente}","ClienteController@show");
Route::post("cliente","ClienteController@store");
Route::patch("cliente/{cliente}","ClienteController@update");
Route::delete("cliente/{cliente}","ClienteController@delete");
//ROTAS PARA MAQUINA//
Route::get("maquina","MaquinaController@getAll");
Route::get("maquina/{maquina}","MaquinaController@show");
Route::post("maquina","MaquinaController@store");
Route::patch("maquina/{maquina}","MaquinaController@update");
Route::delete("maquina/{maquina}","MaquinaController@delete");
//ROTAS PARA REGISTRO//
Route::get("registro","RegistroController@getAll");
Route::get("registro/{registro}","RegistroController@show");
Route::post("registro","RegistroController@store");
Route::patch("registro/{registro}","RegistroController@update");
Route::delete("registro/{registro}","RegistroController@delete");
?>