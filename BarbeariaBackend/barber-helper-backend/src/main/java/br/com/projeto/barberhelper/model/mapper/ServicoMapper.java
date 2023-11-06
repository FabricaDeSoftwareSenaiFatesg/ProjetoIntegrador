package br.com.projeto.barberhelper.model.mapper;

import java.math.BigDecimal;
import java.util.List;

import br.com.projeto.barberhelper.model.Servico;
import br.com.projeto.barberhelper.model.dto.ServicosVisuaizacaoDTO;

public class ServicoMapper {

    public static ServicosVisuaizacaoDTO toServicosVisuaizacaoDTO(List<Servico> servicos) {
        ServicosVisuaizacaoDTO servicosVisuaizacaoDTO = new ServicosVisuaizacaoDTO();
        servicosVisuaizacaoDTO.setServicos(servicos);
        servicosVisuaizacaoDTO.setValorTotal(servicos.stream().map(Servico::getValor).reduce(BigDecimal.ZERO, BigDecimal::add));
        servicosVisuaizacaoDTO.setTempoTotal(servicos.stream().mapToLong(Servico::getTempo).sum());
        return servicosVisuaizacaoDTO;
    }
}
