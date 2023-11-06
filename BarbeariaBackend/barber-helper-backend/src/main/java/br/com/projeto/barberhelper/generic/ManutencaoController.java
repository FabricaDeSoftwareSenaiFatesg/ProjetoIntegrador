package br.com.projeto.barberhelper.generic;

import br.com.projeto.barberhelper.model.Usuario;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.Serializable;

public abstract class ManutencaoController<E extends Serializable> extends ConsultaController<E> {

    private static final long serialVersionUID = 1L;

    @PostMapping()
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void salvar(@RequestBody E entidade) throws Exception {

        this.getServico().salvar( entidade );

    }

    @PutMapping()
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void alterar(@RequestBody E entidade) {

        this.getServico().salvar( entidade );

    }

    @PutMapping(value = "{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void status(@PathVariable Long id) {

        final E entidade = this.getServico().get( id );

        this.getServico().alterarStatus( entidade );

    }

    @DeleteMapping(value = "{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void excluir(@PathVariable Long id) {

        this.getServico().excluirPorId( id );

    }

}
