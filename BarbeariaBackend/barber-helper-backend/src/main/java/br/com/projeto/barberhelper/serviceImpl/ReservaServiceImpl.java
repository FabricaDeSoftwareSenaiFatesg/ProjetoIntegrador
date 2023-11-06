package br.com.projeto.barberhelper.serviceImpl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import br.com.projeto.barberhelper.model.*;
import br.com.projeto.barberhelper.model.dto.PerfilDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.generic.ServiceGenerico;
import br.com.projeto.barberhelper.model.dto.FidelidadeDTO;
import br.com.projeto.barberhelper.model.enuns.StatusReservaEnum;
import br.com.projeto.barberhelper.repository.ReservaDAO;
import br.com.projeto.barberhelper.service.ReservaService;
import br.com.projeto.barberhelper.utils.DateUtil;

@Service
public class ReservaServiceImpl extends ServiceGenerico<Long, Reserva> implements ReservaService {

    @Autowired
    private ReservaDAO dao;

    @Override
    public DAO<Long, Reserva> getDAO() {
        return dao;
    }

    @Override
    public void preSalvar(final Reserva entidade) {
    }

    @Override
    public FidelidadeDTO obterCountFidelidadeCliente(Long id) {

        final CriteriaBuilder builder = em.getCriteriaBuilder();

        final CriteriaQuery<Tuple> query = builder.createTupleQuery();

        final Root<Reserva> root = query.from(Reserva.class);

        query.select(builder.tuple(

                root.get("id").alias("id")));

        query.where(builder.equal(root.get("cliente"), id),
                builder.equal(root.get("statusReserva"), StatusReservaEnum.FINALIZADO));

        FidelidadeDTO fidelidadeDTO = new FidelidadeDTO();

        fidelidadeDTO.setIdCliente(id);

        fidelidadeDTO.setCountReservas((int) this.executeQueryAndTransforResult(query, Reserva.class).stream().count());

        return fidelidadeDTO;

    }

    @Override
    public List<Reserva> obterReservasDoFuncionarioPorData(Long funcionarioId, Date dataReserva) {
        final CriteriaBuilder builder = em.getCriteriaBuilder();
        final CriteriaQuery<Tuple> query = builder.createTupleQuery();
        final Root<Reserva> root = query.from(Reserva.class);
        final Join<Reserva, Pessoa> rootFuncionario = root.join("funcionario");

        query.select(builder.tuple(
                root.get("dataInicial").alias("dataInicial"),
                root.get("dataFim").alias("dataFim")
        ));

        Date dataInicial = DateUtil.converterDateInicioDia(dataReserva);
        Date dataFinal = DateUtil.converterDateFimDia(dataReserva);

        query.where(
                builder.equal(rootFuncionario.get("id"), funcionarioId),
                builder.between(root.get("dataInicial"), dataInicial, dataFinal),
                builder.equal(root.get("statusReserva"), StatusReservaEnum.RESERVADO)
        );

        return this.executeQueryAndTransforResult(query, Reserva.class);
    }

    @Override
    public List<String> getHorariosReservadosDasReservas(List<Reserva> reservas) {
        List<String> horariosReservados = new ArrayList<>();
        for (Reserva reserva: reservas) {
            Calendar inicio = DateUtil.getCalendarDate(reserva.getDataInicial());
            Calendar fim = DateUtil.getCalendarDate(reserva.getDataFim());
            Calendar temp = (Calendar) inicio.clone();
            temp.add(Calendar.MINUTE, 30);

            horariosReservados.add(DateUtil.getStringHorario(inicio));
            while (temp.before(fim)) {
                horariosReservados.add(DateUtil.getStringHorario(temp));
                temp.add(Calendar.MINUTE, 30);
            }
        }
        return horariosReservados;
    }

    @Override
    public List<String> getHorariosFiltardos(List<String> horariosReservados, List<Servico> servicos, Date dataPesquisada) {
        List<String> horariosDisponiveis = HorariosDisponiveis.getHorarios().stream().filter(horario -> !horariosReservados.contains(horario)).collect(Collectors.toList());

        int qntHorariosNecessarios = getQntHorariosNecessarios(servicos);
        if (qntHorariosNecessarios > 0) {
            List<String> horariosRemocao = horariosDisponiveis.stream()
                    .filter(horario -> {
                        for (int i = 1; i <= qntHorariosNecessarios; i++) {
                            String horarioTemp = HorariosDisponiveis.getNext(horario, i);
                            if (horarioTemp == null || !horariosDisponiveis.contains(horarioTemp)) {
                                return true;
                            }
                        }
                        return false;
                    })
                    .collect(Collectors.toList());
            horariosDisponiveis.removeIf(horariosRemocao::contains);
        }
        return horariosDisponiveis.stream()
                .filter(horario -> !HorariosDisponiveis.getCalendarData(horario, dataPesquisada).getTime().before(DateUtil.getCalendarDate(new Date()).getTime()))
                .collect(Collectors.toList());
    }

    private int getQntHorariosNecessarios(List<Servico> servicos) {
        return (int) Math.ceil((double) servicos.stream().mapToLong(Servico::getTempo).sum()/30)-1;
    }

    @Override
    public List<Reserva> listarFiltrado(Long funcionarioId, Date dataReserva) {
        final CriteriaBuilder builder = em.getCriteriaBuilder();
        final CriteriaQuery<Tuple> query = builder.createTupleQuery();
        final Root<Reserva> root = query.from(Reserva.class);
        final Join<Reserva, Pessoa> rootCliente = root.join("cliente");
        final Join<Reserva, Pessoa> rootFuncionario = root.join("funcionario");

        query.select(builder.tuple(
                root.get("id").alias("id"),

                rootCliente.get("id").alias("cliente.id"),
                rootCliente.get("nome").alias("cliente.nome"),

                rootFuncionario.get("id").alias("funcionario.id"),
                rootFuncionario.get("nome").alias("funcionario.nome"),

                root.get("dataInicial").alias("dataInicial"),
                root.get("dataFim").alias("dataFim"),
                root.get("statusReserva").alias("statusReserva")
        ));

        Date dataInicial = DateUtil.converterDateInicioDia(dataReserva);
        Date dataFinal = DateUtil.converterDateFimDia(dataReserva);

        query.where(
                builder.equal(rootFuncionario.get("id"), funcionarioId),
                builder.between(root.get("dataInicial"), dataInicial, dataFinal),
                builder.equal(root.get("statusReserva"), StatusReservaEnum.RESERVADO)
        );

        return this.executeQueryAndTransforResult(query, Reserva.class);
    }

    public List<Servico> consultarServicosDaReserva(Long idReserva) {
        final CriteriaBuilder builder = em.getCriteriaBuilder();
        final CriteriaQuery<Tuple> query = builder.createTupleQuery();
        final Root<Reserva> root = query.from(Reserva.class);
        final Join<Reserva, Servico> rootServico = root.join("servicos");

        query.select(builder.tuple(
                rootServico.get("valor").alias("valor"),
                rootServico.get("descricao").alias("descricao"),
                rootServico.get("tempo").alias("tempo")
        ));

        query.where(
                builder.equal(root.get("id"), idReserva)
        );

        return this.executeQueryAndTransforResult(query, Servico.class);
    }

    public PerfilDTO consultarDadosParaPerfil(Long idPessoa) {

        List<Reserva> listaReservas = this.consultarReservasPorCliente(idPessoa);

        List<Pedido> listaPedidos = this.consultarPedidosPorCliente(idPessoa);

        PerfilDTO dto = new PerfilDTO();

        if (!listaReservas.isEmpty()) {

            dto.setDtUltimaReserva(listaReservas.get(0).getDataInicial().toString());

            dto.setStatusUltimaReserva(listaReservas.get(0).getStatusReserva());

            dto.setQtdReservasFeitas(listaReservas.size());

        }

        if (!listaPedidos.isEmpty()) {

            dto.setDtUltimaCompra(listaPedidos.get(0).getDataPedido().toString());

            dto.setStatusUltimaCompra(listaPedidos.get(0).getStatusPedido());

            dto.setQtdPedidosFeito(listaPedidos.size());

        }

        return dto;

    }

    public List<Reserva> consultarReservasPorCliente(Long idPessoa) {
        final CriteriaBuilder builder = em.getCriteriaBuilder();
        final CriteriaQuery<Tuple> query = builder.createTupleQuery();
        final Root<Reserva> root = query.from(Reserva.class);
        final Join<Reserva, Pessoa> rootPessoa = root.join("cliente");

        query.select(builder.tuple(
                root.get("statusReserva").alias("statusReserva"),
                root.get("dataInicial").alias("dataInicial")
                ));

        query.where(
                builder.equal(rootPessoa.get("id"), idPessoa)
        );

        query.orderBy(builder.desc(root.get("dataInicial")));

        return this.executeQueryAndTransforResult(query, Reserva.class);
    }

    public List<Pedido> consultarPedidosPorCliente(Long idPessoa) {
        final CriteriaBuilder builder = em.getCriteriaBuilder();
        final CriteriaQuery<Tuple> query = builder.createTupleQuery();
        final Root<Pedido> root = query.from(Pedido.class);
        final Join<Pedido, Pessoa> rootPessoa = root.join("cliente");

        query.select(builder.tuple(
                root.get("statusPedido").alias("statusPedido"),
                root.get("dataPedido").alias("dataPedido")
                ));

        query.where(
                builder.equal(rootPessoa.get("id"), idPessoa)
        );

        query.orderBy(builder.desc(root.get("dataPedido")));

        return this.executeQueryAndTransforResult(query, Pedido.class);
    }

}
