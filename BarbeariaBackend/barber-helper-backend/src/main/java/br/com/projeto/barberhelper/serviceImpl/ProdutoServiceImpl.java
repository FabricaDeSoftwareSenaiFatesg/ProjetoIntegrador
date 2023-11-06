package br.com.projeto.barberhelper.serviceImpl;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.generic.ServiceGenerico;
import br.com.projeto.barberhelper.model.Imagem;
import br.com.projeto.barberhelper.model.Produto;
import br.com.projeto.barberhelper.model.Reserva;
import br.com.projeto.barberhelper.model.dto.FidelidadeDTO;
import br.com.projeto.barberhelper.model.dto.listagem.ProdutoListagemDTO;
import br.com.projeto.barberhelper.model.enuns.StatusReservaEnum;
import br.com.projeto.barberhelper.repository.ProdutoDAO;
import br.com.projeto.barberhelper.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.util.List;

@Service
public class ProdutoServiceImpl extends ServiceGenerico<Long, Produto> implements ProdutoService {

    @Autowired
    private ProdutoDAO dao;

    @Override
    public DAO<Long, Produto> getDAO() {
        return dao;
    }

    @Override
    public void preSalvar(final Produto entidade) {

        super.preSalvar(entidade);

    }

    @Override
    public List<ProdutoListagemDTO> listarProdutoDTO() {

        final CriteriaBuilder builder = em.getCriteriaBuilder();

        final CriteriaQuery<Tuple> query = builder.createTupleQuery();

        final Root<Produto> root = query.from(Produto.class);

        final Join<Produto, Imagem> rootImagem = root.join("imagem");

        query.select(builder.tuple(

                root.get("id").alias("id"),

                root.get("valor").alias("valor"),

                root.get("descricao").alias("descricao"),

                root.get("quantidade").alias("quantidade"),

                rootImagem.get("id").alias("imagem.id"),

                rootImagem.get("nome").alias("imagem.nome"),

                rootImagem.get("conteudo").alias("imagem.conteudo"),

                rootImagem.get("tipo").alias("imagem.tipo")));

        return this.executeQueryAndTransforResult(query, ProdutoListagemDTO.class);

    }

}
