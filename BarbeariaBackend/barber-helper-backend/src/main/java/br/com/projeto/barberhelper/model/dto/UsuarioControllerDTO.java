package br.com.projeto.barberhelper.model.dto;

import br.com.projeto.barberhelper.model.Usuario;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;

@Getter
@Setter
public class UsuarioControllerDTO {

    private Long id;

    private String nome;

    private String login;

    private boolean senhaInicial;

    private String ultimoAcesso;

    private Boolean flagVisualizacaoMapAdministrativo;

    private String tipo;

    public UsuarioControllerDTO(final Usuario usuario) {
        setId(usuario.getId());
        setLogin(usuario.getEmail());
        setNome(usuario.getPessoa().getNome());
        setTipo(usuario.getTipo().toString());
    }

}
