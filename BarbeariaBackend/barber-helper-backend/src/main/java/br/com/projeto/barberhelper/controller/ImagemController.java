package br.com.projeto.barberhelper.controller;

import br.com.projeto.barberhelper.generic.ManutencaoController;
import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Imagem;
import br.com.projeto.barberhelper.service.ImagemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "imagem")
public class ImagemController extends ManutencaoController<Imagem> {

    private static final long serialVersionUID = 1L;

    @Autowired
    private ImagemService service;

    @Override
    protected Service<Long, Imagem> getServico() {
        return service;
    }

}
