package br.com.projeto.barberhelper.model.dto;

import br.com.projeto.barberhelper.generic.DTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FidelidadeDTO extends DTO {

    private int countReservas;

    private Long idCliente;

}
