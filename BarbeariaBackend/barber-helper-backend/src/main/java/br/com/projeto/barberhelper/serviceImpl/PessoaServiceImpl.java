package br.com.projeto.barberhelper.serviceImpl;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.generic.ServiceGenerico;
import br.com.projeto.barberhelper.model.Pessoa;
import br.com.projeto.barberhelper.model.Usuario;
import br.com.projeto.barberhelper.model.enuns.TipoUsuarioEnum;
import br.com.projeto.barberhelper.repository.PessoaDAO;
import br.com.projeto.barberhelper.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

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
        List<Long> idsUsuario = getIdsUsuariosNoBanco();
        return dao.findAllByIdIn(idsUsuario);
    }

    public List<Long> getIdsUsuariosNoBanco(){
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        Root<Usuario> root = query.from(Usuario.class);

        query.select(root.get("id"));
        query.where(builder.or(
                builder.equal(root.get("tipo"), TipoUsuarioEnum.FUNCIONARIO),
                builder.equal(root.get("tipo"), TipoUsuarioEnum.ADMINISTRADOR)
        ));

        return em.createQuery(query).getResultList();
    }

}
