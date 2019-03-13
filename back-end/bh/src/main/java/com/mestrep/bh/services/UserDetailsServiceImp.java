package com.mestrep.bh.services;

import com.mestrep.bh.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

    private final UsuarioService usuarioService;

    @Autowired
    public UserDetailsServiceImp(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioService.listarUsuarioPorEmail(email);
        if (usuario == null){
            throw new UsernameNotFoundException("Usuário não encontrado");
        }

        return usuario;
    }
}
