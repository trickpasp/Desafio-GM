package com.mestrep.bh.services;

import com.mestrep.bh.dto.UsuarioDTO;
import com.mestrep.bh.error.ObjectNotFoundExecption;
import com.mestrep.bh.error.UsuarioExecption;
import com.mestrep.bh.interfaces.DAO;
import com.mestrep.bh.model.Perfil;
import com.mestrep.bh.model.Usuario;
import com.mestrep.bh.repository.UsuarioRepository;
import com.mestrep.bh.security.UserServiceSec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

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
        Optional<Usuario> isExist = Optional.ofNullable(listarUsuarioPorEmail(usuario.getEmail()));
        if (isExist.isPresent())
            throw new UsuarioExecption("Usuário já existe!");
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuario.setPerfis(Collections.singletonList(new Perfil("ROLE_USUARIO")));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario atualizar(Usuario usuario) {
        return usuarioRepository.saveAndFlush(usuario);
    }

    @Override
    public List<Usuario> listarTodos() {
        Usuario usuario = UserServiceSec.authenticated();
        List<Usuario> usuarioList = new ArrayList<>();
        if (usuario == null)
            return usuarioRepository.findAll();
        Optional<List<Usuario>> optionalUsuarios = Optional.ofNullable(usuarioRepository.findAll());
        optionalUsuarios
                .ifPresent(usuarios ->
                        usuarios
                                .stream()
                                .filter(p -> !p.getId().equals(usuario.getId()))
                                .forEach(usuarioList::add)
                );
        return usuarioList;
    }

    public Usuario listarUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario listarUsuarioPorId(Integer id) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isPresent())
            return optionalUsuario.get();
        throw new ObjectNotFoundExecption("Usuário não encontrado!");
    }

    public Usuario deDTO(UsuarioDTO usuarioDTO) {
        return new Usuario(usuarioDTO.getNome(), usuarioDTO.getEmail(), usuarioDTO.getSenha());
    }

    public Usuario listarUsuarioPorIdOuEmail(String email, Integer id) {
        if (email == null && id != null) {
            return listarUsuarioPorId(id);
        }
        return listarUsuarioPorEmail(email);
    }

}
