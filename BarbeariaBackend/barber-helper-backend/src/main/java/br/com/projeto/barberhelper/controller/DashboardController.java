package br.com.projeto.barberhelper.controller;

import br.com.projeto.barberhelper.model.dto.DashboardDTO;
import br.com.projeto.barberhelper.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "dashboard")
public class DashboardController {

    @Autowired
    private DashboardService service;

    @GetMapping(value = "valores-dashboard")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity<DashboardDTO> obterDadosDashboard() {
        return ResponseEntity.ok().body(service.getValoresPraDashboard());
    }

}
