package br.com.projeto.barberhelper.service;

import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Pessoa;

import java.util.List;

public interface PessoaService extends Service<Long, Pessoa> {

    List<Pessoa> listarFuncionarios();

}
