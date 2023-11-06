package br.com.projeto.barberhelper.model.dto.listagem;

import br.com.projeto.barberhelper.generic.DTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservaListagemDTO extends DTO {

    private String clienteNome;

    private String funcionarioNome;

    private String data;

    private String inicio;

    private String fim;

    private String status;
}
