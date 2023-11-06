package br.com.projeto.barberhelper.generic;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.Serializable;
import java.util.List;

public abstract class ConsultaController<E extends Serializable> {

    private static final long serialVersionUID = 1L;

    protected abstract Service<Long, E> getServico();

    @GetMapping()
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity<List<E>> listar() throws Exception {

        return ResponseEntity.ok().body(this.getServico().listar());

    }

    @GetMapping(value = "/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity<E> get(@PathVariable Long id) {

        return ResponseEntity.ok().body(this.getServico().get( id ));

    }

}
