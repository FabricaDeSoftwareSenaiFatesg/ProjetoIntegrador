package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Usuario;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioDAO extends DAO<Long, Usuario> {

    boolean existsUsuarioByEmailAndSenha(String email, String senha);

    Usuario getUsuarioByEmailAndSenha(String email, String senha);

    Usuario getUsuarioByPessoaCpf(String cpf);

    Usuario findByEmail(String username);

}
