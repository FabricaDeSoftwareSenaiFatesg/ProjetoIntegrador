package br.com.projeto.barberhelper.controller;

import br.com.projeto.barberhelper.generic.ManutencaoController;
import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Pedido;
import br.com.projeto.barberhelper.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "pedido")
public class PedidoController extends ManutencaoController<Pedido> {

    private static final long serialVersionUID = 1L;

    @Autowired
    private PedidoService service;

    @Override
    protected Service<Long, Pedido> getServico() {
        return service;
    }

}
