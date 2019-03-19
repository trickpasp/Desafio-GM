package com.mestrep.bh.security;

import com.mestrep.bh.model.Usuario;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserServiceSec {

    //Metodo retorna o usuario da sessao
    public static Usuario authenticated(){
        try{
            return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }catch (Exception e){
            return null;
        }
    }
}
