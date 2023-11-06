package br.com.projeto.barberhelper.model.dto;

import java.util.Date;
import java.util.List;

import br.com.projeto.barberhelper.model.Pessoa;
import br.com.projeto.barberhelper.model.Servico;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PesquisaHorarios {

    private List<Servico> servicos;

    private Pessoa profissional;

    private Date data;
}
