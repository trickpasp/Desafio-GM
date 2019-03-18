package com.mestrep.bh.security;

import com.mestrep.bh.model.Usuario;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserServiceSec {

    public static Usuario autheticated(){
        try{
            return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }catch (Exception e){
            return null;
        }
    }
}
