package com.mestrep.bh.services;

import com.mestrep.bh.dto.HorarioDTO;
import com.mestrep.bh.error.UsuarioExecption;
import com.mestrep.bh.interfaces.DAO;
import com.mestrep.bh.model.Horario;
import com.mestrep.bh.model.Usuario;
import com.mestrep.bh.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HorarioService implements DAO<Horario> {

    private final HorarioRepository horarioRepository;
    private final UsuarioService usuarioService;

    @Autowired
    public HorarioService(HorarioRepository horarioRepository, UsuarioService usuarioService) {
        this.horarioRepository = horarioRepository;
        this.usuarioService = usuarioService;
    }

    @Override
    public Horario salvar(Horario horario) {
        return horarioRepository.save(horario);
    }

    @Transactional
    public Horario salvar(Horario horario, String email, Integer id) {
        Usuario usuario = usuarioService.listarUsuarioPorIdOuEmail(email, id);
        if (usuario == null)
            throw new UsuarioExecption("Usuario não encontrado!");
        List<Horario> horarios = horarioRepository.findAllByUsuario_Id(usuario.getId());
        horario.setUsuario(usuario);
        horarios.add(horario);
        usuario.setHorarios(horarios);
        usuarioService.atualizar(usuario);
        return horario;
    }

    @Override
    public Horario atualizar(Horario horario) {
        return horarioRepository.saveAndFlush(horario);
    }

    @Override
    public List<Horario> listarTodos() {
        return  horarioRepository.findAll();
    }

    public List<HorarioDTO> listarTodosDTO() {
        Optional<List<Horario>> optionalHorario = Optional.ofNullable(listarTodos());
        List<HorarioDTO> horarios = new ArrayList<>();
        optionalHorario.ifPresent(horarios1 -> horarios1.forEach(x -> horarios.add(new HorarioDTO(x))));
        return horarios;
    }

    public List<HorarioDTO> listarTodosHorariosDeUsuarioPorId(Integer usuarioId){
        Usuario usuario = usuarioService.listarUsuarioPorId(usuarioId);
        Optional<List<Horario>> optionalHorario = Optional.ofNullable(horarioRepository.findAllByUsuario_Id(usuario.getId()));
        List<HorarioDTO> horarios = new ArrayList<>();
        optionalHorario.ifPresent(horarios1 -> horarios1.forEach(x -> horarios.add(new HorarioDTO(x))));
        return horarios;
    }

    public Horario deDTO(HorarioDTO horarioDTO) throws ParseException {
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");
        Date data = formato.parse(horarioDTO.getData());
        return new Horario(horarioDTO.getQtdHoras(), data);
    }

}
