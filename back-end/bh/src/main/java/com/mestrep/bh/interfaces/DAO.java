package com.mestrep.bh.interfaces;

import java.util.List;

public interface DAO<T> {

    T salvar(T t);
    T atualizar(T t);
    List<T> listarTodos();
}
