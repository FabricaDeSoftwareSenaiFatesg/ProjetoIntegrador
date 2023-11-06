package br.com.projeto.barberhelper.controller;

import br.com.projeto.barberhelper.generic.ManutencaoController;
import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Produto;
import br.com.projeto.barberhelper.model.dto.listagem.ProdutoListagemDTO;
import br.com.projeto.barberhelper.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "produto")
public class ProdutoController extends ManutencaoController<Produto> {

    private static final long serialVersionUID = 1L;

    @Autowired
    private ProdutoService service;

    @Override
    protected Service<Long, Produto> getServico() {
        return service;
    }

    @GetMapping(value = "/listar-dtos")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<ProdutoListagemDTO> listarProdutoDTO() {

        return this.service.listarProdutoDTO();

    }

}
