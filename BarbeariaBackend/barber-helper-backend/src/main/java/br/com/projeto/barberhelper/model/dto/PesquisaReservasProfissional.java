package br.com.projeto.barberhelper.model.dto;

import java.util.Date;

import br.com.projeto.barberhelper.model.Pessoa;
import br.com.projeto.barberhelper.model.enuns.StatusReservaEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PesquisaReservasProfissional {

    private Pessoa profissional;

    private Date data;

    private StatusReservaEnum status;
}
