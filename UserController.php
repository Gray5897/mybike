<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show ($name){
    	$user = \DB::table('users')->where('name', $name)->first();

    	//dd($user);
    	return view('users', ['user' => $user]);
    }

    public function saluda(){
    	//return view('users', ['name' => 'Alejandro']);
		return view('users')->with('name','Jeferson');
    }
}
