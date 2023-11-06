package br.com.projeto.barberhelper.controller;

import br.com.projeto.barberhelper.auth.User;
import br.com.projeto.barberhelper.auth.UtilManager;
import br.com.projeto.barberhelper.repository.LoginDAO;
import br.com.projeto.barberhelper.utilsHttp.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("login")
public class LoginController {

    @Autowired
    private LoginDAO loginDao;

    @Value("${ads04.security.urlManager}")
    private String urlManager;

    @Value("${ads04.security.userManager}")
    private String userManager;

    @Value("${ads04.security.passManager}")
    private String passManager;


    @PostMapping
    public Map<String, Object> post(@RequestBody Map<String, String> body) {
        String usuario = body.get("usuario");
        String senha = body.get("senha");

        Token token = loginDao.getToken(usuario, senha);

        Map<String, Object> result = new HashMap<>();
        result.put("access_token", token.getAccessToken());
        return result;
    }

    @PostMapping("/criar")
    public void criarUsuario(@RequestBody Map<String, Object> dados) {
        String login = (String) dados.get("login");
        String pass = (String) dados.get("pass");

        User user = new User();
        user.setLogin(login);
        user.setPassword(pass);
        user.getRoles().add("ROLE_ADMIN");
        user.setTenant("teste");
        UtilManager.createUser(urlManager, userManager, passManager, user);
    }


}
