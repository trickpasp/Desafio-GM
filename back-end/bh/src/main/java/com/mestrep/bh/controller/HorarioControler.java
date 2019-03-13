package com.mestrep.bh.controller;

import com.mestrep.bh.model.Horario;
import com.mestrep.bh.services.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("app")
public class HorarioControler {

    private final HorarioService horarioService;

    @Autowired
    public HorarioControler(HorarioService horarioService) {
        this.horarioService = horarioService;
    }

    @PostMapping(value = "/horario")
    public Horario salvarHorario(@RequestBody Horario horario) {
        return horarioService.salvar(horario);
    }

    @GetMapping(value = "/horarios")
    public List<Horario> listarTodosHorarios(){
        return horarioService.listarTodos();
    }
}
