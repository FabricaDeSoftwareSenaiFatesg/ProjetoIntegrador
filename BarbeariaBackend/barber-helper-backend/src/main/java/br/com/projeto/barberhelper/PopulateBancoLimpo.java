package br.com.projeto.barberhelper;

import br.com.projeto.barberhelper.auth.User;
import br.com.projeto.barberhelper.auth.UtilManager;
import br.com.projeto.barberhelper.model.Pessoa;
import br.com.projeto.barberhelper.model.Usuario;
import br.com.projeto.barberhelper.model.enuns.TipoUsuarioEnum;
import br.com.projeto.barberhelper.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class PopulateBancoLimpo implements CommandLineRunner {

    @Autowired
    private UsuarioService service;

    @Value("${ads04.security.urlManager}")
    private String urlManager;

    @Value("${ads04.security.userManager}")
    private String userManager;

    @Value("${ads04.security.passManager}")
    private String passManager;

    @Override
    public void run(String... args) {
        Usuario usuarioAdmin = getUsuarioAdmin();

        if (this.service.dadosValidos(usuarioAdmin)){
            insereUsuarioNoAuthServer();
            service.salvar(usuarioAdmin);
        }
    }

    public Usuario getUsuarioAdmin(){
        Usuario usuario = new Usuario();
        usuario.setEmail("admin@gmail.com");
        usuario.setSenha("000000");
        usuario.setAtivo(true);
        usuario.setDataCadastro(new Date());
        usuario.setTipo(TipoUsuarioEnum.ADMINISTRADOR);
        usuario.setPessoa(getPessoa());

        return usuario;
    }

    public Pessoa getPessoa(){
        Pessoa pessoa = new Pessoa();
        pessoa.setAtivo(true);
        pessoa.setDataCadastro(new Date());
        pessoa.setCpf("000.000.000-00");
        pessoa.setNome("Admin");
        pessoa.setTelefone("(62) 00000-0000");
        pessoa.setFlagFuncionario(true);

        return pessoa;
    }

    public void insereUsuarioNoAuthServer(){
        User user = new User();
        user.setLogin("admin@gmail.com");
        user.setPassword("123456");
        user.getRoles().add("ROLE_ADMIN");
        UtilManager.createUser(urlManager, userManager, passManager, user);
    }

}
