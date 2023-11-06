package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.utilsHttp.Token;
import br.com.projeto.barberhelper.utilsHttp.UtilHttp;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Repository
public class LoginDAO {

    @Value("${ads04.security.urlToken}")
    private String url;

    @Value("${ads04.security.clientId}")
    private String clientId;

    @Value("${ads04.security.clientSecret}")
    private String clientSecret;

    public Token getToken(String email, String password) {

        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", UtilHttp.getAuthHeaderBase64(clientId, clientSecret));

        Map<String, String> parameters = new HashMap<>();
        parameters.put("grant_type", "password");

        try {
            return new Token(url, email, password, headers, parameters);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
