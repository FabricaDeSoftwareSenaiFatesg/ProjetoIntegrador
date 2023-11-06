package br.com.projeto.barberhelper.serviceImpl;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.generic.ServiceGenerico;
import br.com.projeto.barberhelper.model.Imagem;
import br.com.projeto.barberhelper.model.dto.listagem.ImagemListagemDTO;
import br.com.projeto.barberhelper.repository.ImagemDAO;
import br.com.projeto.barberhelper.service.ImagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagemServiceImpl extends ServiceGenerico<Long, Imagem> implements ImagemService {

    @Autowired
    private ImagemDAO dao;

    @Override
    public DAO<Long, Imagem> getDAO() {
        return dao;
    }

    @Override
    public void preSalvar(final Imagem entidade) {
    }

}
