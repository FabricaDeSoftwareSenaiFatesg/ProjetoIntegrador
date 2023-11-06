package br.com.projeto.barberhelper.serviceImpl;

import br.com.projeto.barberhelper.model.*;
import br.com.projeto.barberhelper.model.dto.DashboardDTO;
import br.com.projeto.barberhelper.model.dto.FuncionarioPorReservaDTO;
import br.com.projeto.barberhelper.model.dto.ServicoPorQuantidadeDTO;
import br.com.projeto.barberhelper.model.enuns.TipoUsuarioEnum;
import br.com.projeto.barberhelper.repository.PedidoDAO;
import br.com.projeto.barberhelper.repository.ReservaDAO;
import br.com.projeto.barberhelper.service.DashboardService;
import br.com.projeto.barberhelper.utils.NullUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private PedidoDAO pedidoDAO;

    @Autowired
    private ReservaDAO reservaDAO;

    @Autowired
    protected EntityManager em;

    @Override
    public DashboardDTO getValoresPraDashboard() {

        List<Pedido> pedidos = pedidoDAO.findAll();
        List<Reserva> reservas = reservaDAO.findAll();

        DashboardDTO dashboardDTO = new DashboardDTO();
        dashboardDTO.setPedidos(pedidos);
        dashboardDTO.setReservas(reservas);
        dashboardDTO.setFuncionariosPorReserva(getFuncionariosPorReserva());
        dashboardDTO.setServicosPorQuantidade(getServicosPorReserva());

        return dashboardDTO;
    }

    public List<FuncionarioPorReservaDTO> getFuncionariosPorReserva(){
        List<FuncionarioPorReservaDTO> funcionarioPorReservaDTO = new ArrayList<>();
        List<Long> idsFuncionarios = getIdsFuncionariosNoBanco();

        idsFuncionarios.forEach(idFuncionario -> {
            Integer quantidadeDeServicos = Math.toIntExact(getQuantidadeDeReservas(idFuncionario));
            if(NullUtil.isNotNullOrEmpty(Collections.singleton(quantidadeDeServicos))){
                funcionarioPorReservaDTO.add(new FuncionarioPorReservaDTO(getNomeFuncionario(idFuncionario), quantidadeDeServicos));
            }
        });

        return funcionarioPorReservaDTO;
    }

    public List<Long> getIdsFuncionariosNoBanco(){
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        Root<Usuario> root = query.from(Usuario.class);

        query.select(root.get("id"));
        query.where(builder.or(
                builder.equal(root.get("tipo"), TipoUsuarioEnum.FUNCIONARIO),
                builder.equal(root.get("tipo"), TipoUsuarioEnum.ADMINISTRADOR)
        ));

        return em.createQuery(query).getResultList();
    }

    public Long getQuantidadeDeReservas(Long id){
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        Root<Reserva> reservaRoot = query.from(Reserva.class);
        Join<Reserva, Pessoa> funcionarioJoin = reservaRoot.join("funcionario");

        query.select(builder.count(reservaRoot));
        query.where(
                builder.equal(funcionarioJoin.get("id"), id)
        );

        return em.createQuery(query).getSingleResult();
    }

    public String getNomeFuncionario(Long idPessoa){
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<String> query = builder.createQuery(String.class);
        Root<Pessoa> root = query.from(Pessoa.class);

        Selection<String> selection = root.get("nome");
        query.select(selection);
        query.where(builder.equal(root.get("id"), idPessoa));

        TypedQuery<String> typedQuery = em.createQuery(query);
        return typedQuery.getSingleResult();
    }

    public List<ServicoPorQuantidadeDTO> getServicosPorReserva(){
        List<ServicoPorQuantidadeDTO> servicosPorQuantidadeDTO = new ArrayList<>();
        List<Long> idsServicos = getIdsServicosNoBanco();

        idsServicos.forEach(idServico -> {
            Integer quantidadeDeServicos = Math.toIntExact(getQuantidadeDeServicos(idServico));
            if(NullUtil.isNotNullOrEmpty(Collections.singleton(quantidadeDeServicos))){
                servicosPorQuantidadeDTO.add(new ServicoPorQuantidadeDTO(getNomeServico(idServico), quantidadeDeServicos));
            }
        });

        return servicosPorQuantidadeDTO;
    }

    public List<Long> getIdsServicosNoBanco(){
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        Root<Servico> root = query.from(Servico.class);

        query.select(root.get("id"));

        return em.createQuery(query).getResultList();
    }

    public String getNomeServico(Long idServico){
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<String> query = builder.createQuery(String.class);
        Root<Servico> root = query.from(Servico.class);

        Selection<String> selection = root.get("descricao");
        query.select(selection);
        query.where(builder.equal(root.get("id"), idServico));

        TypedQuery<String> typedQuery = em.createQuery(query);
        return typedQuery.getSingleResult();
    }

    public Long getQuantidadeDeServicos(Long id){
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        Root<Servico> servicoRoot = query.from(Servico.class);

        query.select(builder.count(servicoRoot));
        query.where(
                builder.equal(servicoRoot.get("id"), id)
        );

        return em.createQuery(query).getSingleResult();
    }

}
