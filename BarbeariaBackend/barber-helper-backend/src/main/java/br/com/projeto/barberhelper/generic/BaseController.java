package br.com.projeto.barberhelper.generic;

import br.com.projeto.barberhelper.model.Usuario;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import java.io.Serializable;
import java.util.ResourceBundle;

public class BaseController implements Serializable {

    private static final long serialVersionUID = 1L;

    public static final String TOKEN_USER = "TOKEN.USER";

    public static final String TOKEN_USER_AUTHORIZATION = "TOKEN.USER.AUTHORIZATION";

    public static final String AUTHORIZATION_PROPERTY = "Authorization";

    @Context
    protected HttpServletRequest request;

    public Usuario getUsuarioToken() {

        return (Usuario) this.request.getAttribute(TOKEN_USER);
    }

    public HttpServletRequest getRequest() {

        return this.request;
    }

    public void adicionarAtributoNaRequisicao(String nome, Object value) {

        this.request.setAttribute(nome, value);
    }

    public void adicionarAtributoNaSessao(String nome, Object value) {

        this.request.getSession().setAttribute(nome, value);
    }

    public String obterParametroRequisicao(String parameter) {

        return this.request.getParameter(parameter);
    }

    @SuppressWarnings("unchecked")
    public <T> T obterAtributoRequisicao(String name) {

        return (T) this.request.getAttribute(name);
    }

    @SuppressWarnings("unchecked")
    public <T> T obterAtributoSessao(String name) {

        return (T) this.request.getSession().getAttribute(name);
    }

    protected String getMensagem(String mensagem) {

        try {

            return getBundle().getString(mensagem);

        } catch (Exception e) {

            return mensagem;
        }
    }

    protected ResourceBundle getBundle() {

        return ResourceBundle.getBundle("message");
    }

}
