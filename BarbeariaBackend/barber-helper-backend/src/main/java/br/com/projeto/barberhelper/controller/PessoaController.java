package br.com.projeto.barberhelper.controller;

import br.com.projeto.barberhelper.generic.ManutencaoController;
import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Pessoa;
import br.com.projeto.barberhelper.service.PessoaService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "pessoa")
public class PessoaController extends ManutencaoController<Pessoa> {

    private static final long serialVersionUID = 1L;

    @Autowired
    private PessoaService pessoaService;

    @Override
    protected Service<Long, Pessoa> getServico() {
        return pessoaService;
    }

    @PostMapping(value = "/retornar-cpf")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response retornarCpf(@RequestBody String cpf) {

        return Response.ok(cpf).build();

    }

    @GetMapping(value = "valores-dashboard")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Pessoa> obterDadosDashboard() {
        return ResponseEntity.ok().body(pessoaService.listarFuncionarios()).getBody();
    }

}
