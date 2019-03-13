package com.mestrep.bh.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private int qtdHoras;

    private Date data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public Horario() {
    }

    public Horario(int qtdHoras, Date data) {
        this.qtdHoras = qtdHoras;
        this.data = data;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getQtdHoras() {
        return qtdHoras;
    }

    public void setQtdHoras(int qtdHoras) {
        this.qtdHoras = qtdHoras;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }
}
