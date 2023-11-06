package br.com.projeto.barberhelper.serviceImpl;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.generic.ServiceGenerico;
import br.com.projeto.barberhelper.model.Pedido;
import br.com.projeto.barberhelper.model.Produto;
import br.com.projeto.barberhelper.repository.PedidoDAO;
import br.com.projeto.barberhelper.service.PedidoService;
import br.com.projeto.barberhelper.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class PedidoServiceImpl extends ServiceGenerico<Long, Pedido> implements PedidoService {

    @Autowired
    private PedidoDAO dao;

    @Autowired
    private ProdutoService produtoService;

    @Override
    public DAO<Long, Pedido> getDAO() {
        return dao;
    }

    @Override
    public void preSalvar(final Pedido entidade) {

        if (!Objects.isNull(entidade)) {

            if (!Objects.isNull(entidade.getProdutos())) {

                List<Produto> produtosParaAlterarQuantidade = produtoService.get(entidade.getProdutos().stream().map(produto -> produto.getId()).collect(Collectors.toList()));

                produtosParaAlterarQuantidade.forEach(produto -> {

                    produto.setQuantidade(produto.getQuantidade() - entidade.getProdutos().get(entidade.getProdutos().indexOf(produto)).getQuantidade());

                    produtoService.salvar(produto);

                });

            }

        }

    }

}
