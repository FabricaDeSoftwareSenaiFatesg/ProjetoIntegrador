package br.com.projeto.barberhelper.service;

import br.com.projeto.barberhelper.generic.Service;
import br.com.projeto.barberhelper.model.Usuario;

public interface UsuarioService extends Service<Long, Usuario> {

    boolean autenticarUsuario(final String email, final String senha);

    Usuario getUsuarioLogado();

    void logout();

    Usuario getUsuarioPeloLogin(String login);

    boolean dadosValidos(Usuario usuario);

}
