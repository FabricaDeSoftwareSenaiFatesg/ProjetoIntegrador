package br.com.projeto.barberhelper.model;

import br.com.projeto.barberhelper.model.enuns.TipoUsuarioEnum;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_usuario")
public class Usuario extends EntidadeGenerica {

    private String email;

    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoUsuarioEnum tipo;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_pessoa", referencedColumnName = "id")
    private Pessoa pessoa;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_imagem", referencedColumnName = "id")
    private Imagem imagem;

}
