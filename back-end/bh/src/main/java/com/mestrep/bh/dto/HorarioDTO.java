package com.mestrep.bh.dto;

import com.mestrep.bh.model.Horario;

import java.time.LocalDate;
import java.time.ZoneId;

import static java.time.format.DateTimeFormatter.ofPattern;

public class HorarioDTO {

    private int id;
    private int qtdHoras;
    private String data;

    public HorarioDTO() {
    }

    public HorarioDTO(Horario horario){
        this.id = horario.getId();
        this.qtdHoras = horario.getQtdHoras();
        this.data = "" + horario.getData().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().format(ofPattern("dd/MM/yyyy"));
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQtdHoras() {
        return qtdHoras;
    }

    public void setQtdHoras(int qtdHoras) {
        this.qtdHoras = qtdHoras;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
