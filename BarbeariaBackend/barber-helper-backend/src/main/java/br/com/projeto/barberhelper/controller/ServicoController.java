package br.com.projeto.barberhelper.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.barberhelper.generic.ManutencaoController;
import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Servico;
import br.com.projeto.barberhelper.service.ServicoService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "servico")
public class ServicoController extends ManutencaoController<Servico> {

    private static final long serialVersionUID = 1L;

    @Autowired
    private ServicoService service;

    @Override
    protected Service<Long, Servico> getServico() {
        return service;
    }

    @GetMapping(value = "/listar-dtos")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Servico> listarServicosDTO() {

        return this.service.listarServicosDTO();
    }
}
