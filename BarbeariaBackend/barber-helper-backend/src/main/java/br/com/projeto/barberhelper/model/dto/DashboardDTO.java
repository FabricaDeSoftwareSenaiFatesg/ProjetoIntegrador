package br.com.projeto.barberhelper.model.dto;

import br.com.projeto.barberhelper.generic.DTO;
import br.com.projeto.barberhelper.model.Pedido;
import br.com.projeto.barberhelper.model.Reserva;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class DashboardDTO extends DTO implements Serializable {

    private List<Pedido> pedidos = new ArrayList<>();
    private List<Reserva> reservas = new ArrayList<>();
    private List<FuncionarioPorReservaDTO> funcionariosPorReserva = new ArrayList<>();
    private List<ServicoPorQuantidadeDTO> servicosPorQuantidade = new ArrayList<>();

}
