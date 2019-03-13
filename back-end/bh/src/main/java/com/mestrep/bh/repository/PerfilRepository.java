package com.mestrep.bh.repository;

import com.mestrep.bh.model.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Integer> {

    Perfil findByNome(String nome);
}
