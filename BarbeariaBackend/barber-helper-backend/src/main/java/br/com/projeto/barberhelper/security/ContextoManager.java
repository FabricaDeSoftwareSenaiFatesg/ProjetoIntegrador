package br.com.projeto.barberhelper.security;

import br.com.projeto.barberhelper.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ContextoManager {

    private static final String MANAGER_CONTEXT = "MANAGER.CONTEXT.APP";

    @Autowired
    private ServletContext servletContext;

    @PostConstruct
    public void init() {

        this.servletContext.setAttribute(MANAGER_CONTEXT, new HashMap<String, Object>());

    }

    public void armazenar(String chave, Object valor) {

        this.obterMap().put(chave, valor);

    }

    @SuppressWarnings("unchecked")
    public <T> T obter(String chave) {

        return (T) this.obterMap().get(chave);

    }

    public void remover(String chave) {

        this.obterMap().remove(chave);

    }

    public boolean existe(String chave) {

        return this.obterMap().containsKey(chave);

    }

    public void removerTokenParaUsuario(final Usuario usuario) {

        final List<String> tokens = this.obterMap().entrySet()

                .stream()

                .filter(u -> ((Usuario) u.getValue()).getEmail().equals(usuario.getEmail()) )

                .map(Map.Entry::getKey)

                .collect(Collectors.toList());

        tokens.forEach(token -> this.remover(token) );

    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> obterMap() {

        return (Map<String, Object>) this.servletContext.getAttribute(MANAGER_CONTEXT);

    }

}
