package br.com.projeto.barberhelper.controller;

import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.barberhelper.generic.ManutencaoController;
import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Reserva;
import br.com.projeto.barberhelper.model.dto.FidelidadeDTO;
import br.com.projeto.barberhelper.model.dto.PerfilDTO;
import br.com.projeto.barberhelper.model.dto.PesquisaHorarios;
import br.com.projeto.barberhelper.model.dto.PesquisaReservasProfissional;
import br.com.projeto.barberhelper.model.dto.listagem.ReservaListagemDTO;
import br.com.projeto.barberhelper.model.enuns.StatusReservaEnum;
import br.com.projeto.barberhelper.model.mapper.ReservaMapper;
import br.com.projeto.barberhelper.model.mapper.ServicoMapper;
import br.com.projeto.barberhelper.service.ReservaService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "reserva")
public class ReservaController extends ManutencaoController<Reserva> {

    private static final long serialVersionUID = 1L;

    @Autowired
    private ReservaService service;

    @Override
    protected Service<Long, Reserva> getServico() {
        return service;
    }

    @GetMapping(value = "/fidelidade/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity<FidelidadeDTO> obterFidelidadeCliente(@PathVariable Long id) {

        return ResponseEntity.ok().body(service.obterCountFidelidadeCliente(id));

    }

    @PostMapping(value = "/consultarHorarios")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response consultarHorarios(@RequestBody PesquisaHorarios pesquisaHorarios) {

        List<Reserva> reservas = service.obterReservasDoFuncionarioPorData(pesquisaHorarios.getProfissional().getId(), pesquisaHorarios.getData());
        List<String> horariosReservados = service.getHorariosReservadosDasReservas(reservas);
        return Response.ok(service.getHorariosFiltardos(horariosReservados, pesquisaHorarios.getServicos(), pesquisaHorarios.getData())).build();
    }

    @PostMapping(value = "/listarFiltrado")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarFiltrado(@RequestBody PesquisaHorarios pesquisaHorarios) {
        List<Reserva> reservas = service.listarFiltrado(pesquisaHorarios.getProfissional().getId(), pesquisaHorarios.getData());
        return Response.ok(ReservaMapper.toListReservaListagemDTO(reservas)).build();
    }

    @GetMapping(value = "/consultarServicos/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response consultarServicosDaReserva(@PathVariable Long id) {

        return Response.ok(ServicoMapper.toServicosVisuaizacaoDTO(service.consultarServicosDaReserva(id))).build();
    }

    @PostMapping(value = "/salvarReserva")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response salvarReserva(@RequestBody Reserva reserva) {
        if (reserva.getId() != null) {
            reserva.setId(null);
        }
        service.salvar(reserva);
        return Response.ok().build();
    }

    @GetMapping(value = "/dadosReservaPorPessoa/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PerfilDTO consultarDadosReservaPorPessoa(@PathVariable Long id) {

        return service.consultarDadosParaPerfil(id);

    }

    @GetMapping(value = "/listarReservasPorCliente/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<ReservaListagemDTO> consultarReservasPorCliente(@PathVariable Long id) {
        List<Reserva> reservas = service.consultarReservasPorCliente(id);
        return ResponseEntity.ok().body(ReservaMapper.toListReservaListagemDTO(reservas)).getBody();
    }

    @PostMapping(value = "/listarReservasPorProfissional")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<ReservaListagemDTO> consultarReservasPorProfissional(@RequestBody PesquisaReservasProfissional pesquisaReservasProfissional) {
        List<Reserva> reservas = service.consultarReservasPorProfissional(pesquisaReservasProfissional);
        return ResponseEntity.ok().body(ReservaMapper.toListReservaListagemDTO(reservas)).getBody();
    }

    @PutMapping(value = "/cancelarReserva/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void cancelarReserva(@PathVariable Long id) {
        service.cancelarReserva(id);
    }

    @PutMapping(value = "/executarReserva/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void executarReserva(@PathVariable Long id) {
        service.executarReserva(id);
    }
}
