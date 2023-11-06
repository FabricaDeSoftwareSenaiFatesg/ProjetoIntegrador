package br.com.projeto.barberhelper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jmx.support.RegistrationPolicy;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING)
@SpringBootApplication
@EntityScan(basePackages = BarberHelperApplication.PACOTE_MODELO)
@ComponentScan(basePackages = BarberHelperApplication.BASE_COMPONENT)
@EnableJpaRepositories(BarberHelperApplication.BASE_REPOSITORY)
@EnableScheduling
public class BarberHelperApplication {

    public static final String BASE_COMPONENT = "br.com.projeto.barberhelper";

    public static final String BASE_REPOSITORY = "br.com.projeto.barberhelper.repository";

    public static final String PACOTE_MODELO = "br.com.projeto.barberhelper.model";

    public static void main(String[] args) {
        SpringApplication.run(BarberHelperApplication.class, args);
    }

}
