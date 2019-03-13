package com.mestrep.bh.controller;

import com.mestrep.bh.model.Usuario;
import com.mestrep.bh.services.UsuarioService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @ApiOperation(value = "Inseri um usuário. Só quem pode inserir um usuário é um administrador")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping(value = "/usuario", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Usuario salvarUsuario(@RequestBody Usuario usuario){
        return usuarioService.salvar(usuario);
    }

    @ApiOperation(value = "Lista de usuário")
    @GetMapping(value = "/usuarios", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Usuario> listarUsuarios(){
        return usuarioService.listarTodos();
    }

}
