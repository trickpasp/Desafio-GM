package com.mestrep.bh.controller;

import com.mestrep.bh.model.Horario;
import com.mestrep.bh.services.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("app")
public class HorarioControler {

    private final HorarioService horarioService;

    @Autowired
    public HorarioControler(HorarioService horarioService) {
        this.horarioService = horarioService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USUARIO')")
    @PostMapping(value = "/horario")
    public Horario salvarHorario(@RequestBody Horario horario, Principal principal) {
        return horarioService.salvar(horario, principal.getName());
    }

    @GetMapping(value = "/horarios")
    public List<Horario> listarTodosHorarios(){
        return horarioService.listarTodos();
    }

    @GetMapping(value = "/horarios/{id}")
    public List<Horario> listarTodosHorarios(@PathVariable("id") Integer id){
        return horarioService.listarTodosHorariosDeUsuarioPorId(id);
    }
}
