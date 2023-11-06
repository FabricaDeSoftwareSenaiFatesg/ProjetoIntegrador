package br.com.projeto.barberhelper.model.mapper;

import java.util.ArrayList;
import java.util.List;

import br.com.projeto.barberhelper.model.Reserva;
import br.com.projeto.barberhelper.model.dto.listagem.ReservaListagemDTO;
import br.com.projeto.barberhelper.utils.DateUtil;

public class ReservaMapper {

    public static ReservaListagemDTO toReservaListagemDTO(Reserva reserva) {
        ReservaListagemDTO reservaListagemDTO = new ReservaListagemDTO();
        reservaListagemDTO.setId(reserva.getId());
        reservaListagemDTO.setClienteNome(reserva.getCliente().getNome());
        reservaListagemDTO.setFuncionarioNome(reserva.getFuncionario().getNome());
        reservaListagemDTO.setData(DateUtil.getStringData(reserva.getDataInicial()));
        reservaListagemDTO.setInicio(DateUtil.getStringHorario(DateUtil.getCalendarDate(reserva.getDataInicial())));
        reservaListagemDTO.setFim(DateUtil.getStringHorario(DateUtil.getCalendarDate(reserva.getDataFim())));
        reservaListagemDTO.setStatus(reserva.getStatusReserva().toString());
        return reservaListagemDTO;
    }

    public static List<ReservaListagemDTO> toListReservaListagemDTO(List<Reserva> reservas) {
        List<ReservaListagemDTO> reservaListagemDTOS = new ArrayList<>();
        for (Reserva reserva: reservas) {
            reservaListagemDTOS.add(toReservaListagemDTO(reserva));
        }
        return reservaListagemDTOS;
    }
}
