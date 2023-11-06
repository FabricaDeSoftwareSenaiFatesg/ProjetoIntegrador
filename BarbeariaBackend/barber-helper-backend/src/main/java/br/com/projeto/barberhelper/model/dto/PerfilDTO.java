package br.com.projeto.barberhelper.model.dto;

import br.com.projeto.barberhelper.model.enuns.StatusPedidoEnum;
import br.com.projeto.barberhelper.model.enuns.StatusReservaEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerfilDTO {

    private String dtUltimaReserva;

    private int qtdReservasFeitas;

    private StatusReservaEnum statusUltimaReserva;

    private String statusUltimaReservaFormatado;

    private String dtUltimaCompra;

    private int qtdPedidosFeito;

    private StatusPedidoEnum statusUltimaCompra;

}
