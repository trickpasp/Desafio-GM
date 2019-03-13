package com.mestrep.bh.controller;

import com.mestrep.bh.model.Usuario;
import com.mestrep.bh.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("app")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping(value = "/usuario")
    public Usuario salvarUsuario(@RequestBody Usuario usuario){
        return usuarioService.salvar(usuario);
    }

    @GetMapping(value = "/usuarios")
    public List<Usuario> listarUsuarios(){
        return usuarioService.listarTodos();
    }

}
