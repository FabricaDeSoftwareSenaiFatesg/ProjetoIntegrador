package br.com.projeto.barberhelper.controller;

import br.com.projeto.barberhelper.generic.ManutencaoController;
import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Promocao;
import br.com.projeto.barberhelper.service.PromocaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "promocao")
public class PromocaoController extends ManutencaoController<Promocao> {

    private static final long serialVersionUID = 1L;

    @Autowired
    private PromocaoService service;

    @Override
    protected Service<Long, Promocao> getServico() {
        return service;
    }

}
