package br.com.projeto.barberhelper.model.dto;

import java.math.BigDecimal;
import java.util.List;

import br.com.projeto.barberhelper.model.Servico;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServicosVisuaizacaoDTO {

    List<Servico> servicos;

    BigDecimal valorTotal;

    Long tempoTotal;
}
