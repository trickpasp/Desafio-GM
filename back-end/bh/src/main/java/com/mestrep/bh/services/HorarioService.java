package com.mestrep.bh.services;

import com.mestrep.bh.interfaces.DAO;
import com.mestrep.bh.model.Horario;
import com.mestrep.bh.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HorarioService implements DAO<Horario> {

    private final HorarioRepository horarioRepository;

    @Autowired
    public HorarioService(HorarioRepository horarioRepository) {
        this.horarioRepository = horarioRepository;
    }

    @Override
    public Horario salvar(Horario horario) {
        return horarioRepository.save(horario);
    }

    @Override
    public Horario atualizar(Horario horario) {
        return horarioRepository.saveAndFlush(horario);
    }

    @Override
    public List<Horario> listarTodos() {
        return horarioRepository.findAll();
    }
}
