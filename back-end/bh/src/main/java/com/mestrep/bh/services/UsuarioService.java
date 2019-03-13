package com.mestrep.bh.services;

import com.mestrep.bh.interfaces.DAO;
import com.mestrep.bh.model.Perfil;
import com.mestrep.bh.model.Usuario;
import com.mestrep.bh.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UsuarioService implements DAO<Usuario> {

    private final UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }


    //Criptografa senha de usuario, cria perfi e salva usuario
    @Override
    public Usuario salvar(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuario.setPerfil(Collections.singletonList(new Perfil("ROLE_USUARIO")));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario atualizar(Usuario usuario) {
        return usuarioRepository.saveAndFlush(usuario);
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario listarUsuarioPorEmail(String email){
        return usuarioRepository.findByEmail(email);
    }
}
