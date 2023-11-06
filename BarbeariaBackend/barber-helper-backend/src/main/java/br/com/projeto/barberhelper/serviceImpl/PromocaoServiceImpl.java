package br.com.projeto.barberhelper.serviceImpl;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.generic.ServiceGenerico;
import br.com.projeto.barberhelper.model.Promocao;
import br.com.projeto.barberhelper.repository.PromocaoDAO;
import br.com.projeto.barberhelper.service.PromocaoService;
import br.com.projeto.barberhelper.utils.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Objects;

@Service
public class PromocaoServiceImpl extends ServiceGenerico<Long, Promocao> implements PromocaoService {

    @Autowired
    private PromocaoDAO dao;

    @Override
    public DAO<Long, Promocao> getDAO() {
        return dao;
    }

    @Override
    public void preSalvar(final Promocao entidade) {

        super.preSalvar(entidade);

        validaListasPromocao(entidade);

    }

    private void validaListasPromocao(Promocao entidade) {

        if (Objects.isNull(entidade.getServicos()) || entidade.getServicos().isEmpty()) {

            if (Objects.isNull(entidade.getProdutos()) || entidade.getProdutos().isEmpty()) {

                throw new ServiceException("Lista de produtos ou serviços não pode ser vazia!");

            }

        }

    }

}
