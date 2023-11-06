package br.com.projeto.barberhelper.service;

import java.util.List;

import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Servico;

public interface ServicoService extends Service<Long, Servico> {
    List<Servico> listarServicosDTO();
}
