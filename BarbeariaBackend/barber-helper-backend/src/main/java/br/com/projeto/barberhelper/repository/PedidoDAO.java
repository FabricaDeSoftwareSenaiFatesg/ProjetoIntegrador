package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Pedido;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoDAO extends DAO<Long, Pedido> {
}
