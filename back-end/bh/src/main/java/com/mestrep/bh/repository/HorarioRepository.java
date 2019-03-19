package com.mestrep.bh.repository;

import com.mestrep.bh.model.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Integer> {

    List<Horario> findAllByUsuario_Id(Integer id);
}
