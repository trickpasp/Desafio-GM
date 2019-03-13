package com.mestrep.bh.config;

import com.mestrep.bh.model.Perfil;
import com.mestrep.bh.model.Usuario;
import com.mestrep.bh.repository.PerfilRepository;
import com.mestrep.bh.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class CargaInicial implements ApplicationListener<ContextRefreshedEvent> {

    private final UsuarioRepository usuarioRepository;

    private final PerfilRepository perfilRepository;

    @Autowired
    public CargaInicial(UsuarioRepository usuarioRepository, PerfilRepository perfilRepository) {
        this.usuarioRepository = usuarioRepository;
        this.perfilRepository = perfilRepository;
    }


    @Override
    public void onApplicationEvent(ContextRefreshedEvent arg0) {

        List<Perfil> perfis = perfilRepository.findAll();

        if(perfis.isEmpty()) {
            usuarioRepository.save(new Usuario("ADMIN", "admin@bh.com", new BCryptPasswordEncoder().encode("123"), Collections.singletonList(new Perfil("ROLE_ADMIN"))));
        }

    }

}