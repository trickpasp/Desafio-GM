package com.mestrep.bh.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mestrep.bh.dto.TokenDTO;
import com.mestrep.bh.model.Usuario;
import com.mestrep.bh.security.UserServiceSec;
import com.mestrep.bh.util.JWTUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JWTUtil jwtUtil;

    @Autowired
    public AuthController(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    //Obtem um token atualizado
    @ApiOperation(value = "Obtem um token atualizado")
    @RequestMapping(value="/refresh_token", method= RequestMethod.POST)
    public ResponseEntity<Void> refreshToken(HttpServletResponse response) throws IOException {
        Usuario user = UserServiceSec.authenticated();
        String token = jwtUtil.generateToken(user.getUsername());
        String jsonResponse = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(new TokenDTO(token));
        response.getWriter().println(jsonResponse);
        return ResponseEntity.noContent().build();
    }
}
