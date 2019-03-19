package com.mestrep.bh.controller;

import com.mestrep.bh.dto.HorarioDTO;
import com.mestrep.bh.model.Horario;
import com.mestrep.bh.services.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/app")
public class HorarioControler {

    private final HorarioService horarioService;

    @Autowired
    public HorarioControler(HorarioService horarioService) {
        this.horarioService = horarioService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USUARIO')")
    @PostMapping(value = "/horario")
    public Horario salvarHorario(@RequestBody HorarioDTO horarioDTO, Principal principal) throws ParseException {
        Horario horario = horarioService.deDTO(horarioDTO);
        return horarioService.salvar(horario, principal.getName(), null);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USUARIO')")
    @PostMapping(value = "/horario/{id}")
    public Horario salvarHorario(@RequestBody HorarioDTO horarioDTO, @PathVariable("id") Integer id) throws ParseException {
        Horario horario = horarioService.deDTO(horarioDTO);
        return horarioService.salvar(horario, null, id);
    }

    @GetMapping(value = "/horarios")
    public List<HorarioDTO> listarTodosHorarios(){
        return horarioService.listarTodosDTO();
    }

    @GetMapping(value = "/horarios/{id}")
    public List<HorarioDTO> listarTodosHorarios(@PathVariable("id") Integer id){
        return horarioService.listarTodosHorariosDeUsuarioPorId(null, id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USUARIO')")
    @GetMapping(value = "/horarios")
    public List<HorarioDTO> listarTodosHorarios(Principal principal){
        return horarioService.listarTodosHorariosDeUsuarioPorId(principal.getName(), null);
    }
}
