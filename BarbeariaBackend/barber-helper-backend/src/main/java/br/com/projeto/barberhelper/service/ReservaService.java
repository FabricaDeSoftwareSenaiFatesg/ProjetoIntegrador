package br.com.projeto.barberhelper.service;

import java.util.Date;
import java.util.List;

import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Servico;
import br.com.projeto.barberhelper.model.dto.FidelidadeDTO;
import br.com.projeto.barberhelper.model.Reserva;
import br.com.projeto.barberhelper.model.dto.PerfilDTO;

public interface ReservaService extends Service<Long, Reserva> {

    FidelidadeDTO obterCountFidelidadeCliente(Long id);

    List<Reserva> obterReservasDoFuncionarioPorData(Long funcionarioId, Date dataReserva);

    List<String> getHorariosReservadosDasReservas(List<Reserva> reservas);

    public List<String> getHorariosFiltardos(List<String> horariosReservados, List<Servico> servicos, Date dataPesquisada);

    public List<Reserva> listarFiltrado(Long funcionarioId, Date dataReserva);

    public List<Servico> consultarServicosDaReserva(Long idReserva);

    PerfilDTO consultarDadosParaPerfil(Long idPessoa);
}
