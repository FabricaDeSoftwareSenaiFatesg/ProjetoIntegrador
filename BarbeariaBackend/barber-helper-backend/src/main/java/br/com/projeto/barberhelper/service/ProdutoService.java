package br.com.projeto.barberhelper.service;

import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Produto;
import br.com.projeto.barberhelper.model.dto.listagem.ProdutoListagemDTO;

import java.util.List;

public interface ProdutoService extends Service<Long, Produto> {

    List<ProdutoListagemDTO> listarProdutoDTO();
}
