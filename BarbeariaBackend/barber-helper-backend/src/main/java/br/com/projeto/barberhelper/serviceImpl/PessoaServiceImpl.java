package br.com.projeto.barberhelper.serviceImpl;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.generic.ServiceGenerico;
import br.com.projeto.barberhelper.model.Pessoa;
import br.com.projeto.barberhelper.model.Reserva;
import br.com.projeto.barberhelper.model.Usuario;
import br.com.projeto.barberhelper.model.enuns.TipoUsuarioEnum;
import br.com.projeto.barberhelper.repository.PessoaDAO;
import br.com.projeto.barberhelper.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PessoaServiceImpl extends ServiceGenerico<Long, Pessoa> implements PessoaService {

    @Autowired
    private PessoaDAO dao;

    @Override
    public DAO<Long, Pessoa> getDAO() {
        return dao;
    }

    @Override
    public List<Pessoa> listarFuncionarios() {
        List<Usuario> usuarios = getIdsUsuariosNoBanco();
        List<Pessoa> pessoas = dao.findAllByIdIn(usuarios.stream().map(Usuario::getId).collect(Collectors.toList()));

        pessoas.stream().forEach(pessoa -> {
            usuarios.stream().filter(usuario -> usuario.getPessoa().getId().equals(pessoa.getId())).forEach(usuario -> pessoa.setImagemPerfil(usuario.getImagem()));
        });

        return pessoas;
    }

    public List<Usuario> getIdsUsuariosNoBanco(){

        final CriteriaBuilder builder = em.getCriteriaBuilder();

        final CriteriaQuery<Tuple> query = builder.createTupleQuery();

        final Root<Usuario> root = query.from(Usuario.class);

        query.select(builder.tuple(

                root.get("id").alias("id"),
                root.get("imagem").alias("imagem"),
                root.get("pessoa").alias("pessoa")));

        query.where(builder.or(
                builder.equal(root.get("tipo"), TipoUsuarioEnum.FUNCIONARIO),
                builder.equal(root.get("tipo"), TipoUsuarioEnum.ADMINISTRADOR)
        ));

        return this.executeQueryAndTransforResult(query, Usuario.class);

    }

}
