package com.mestrep.bh.controller;

import com.mestrep.bh.dto.UsuarioDTO;
import com.mestrep.bh.model.Usuario;
import com.mestrep.bh.services.UsuarioService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/app")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @ApiOperation(value = "Inserir um usuário")
    @PostMapping(value = "/cadastroUsuario", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Usuario salvarUsuario(@RequestBody UsuarioDTO usuarioDTO){
        Usuario usuario = usuarioService.deDTO(usuarioDTO);
        return usuarioService.salvar(usuario);
    }

    @ApiOperation(value = "Lista de usuário")
    @GetMapping(value = "/usuarios", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Usuario> listarUsuarios(){
        return usuarioService.listarTodos();
    }

}
