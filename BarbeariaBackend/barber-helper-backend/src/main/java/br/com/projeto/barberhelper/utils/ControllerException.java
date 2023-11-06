package br.com.projeto.barberhelper.utils;

public class ControllerException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final Object[] argumentos;

    public ControllerException(final String mensagem, final Object... argumentos) {

        super(mensagem);

        this.argumentos = argumentos;

    }

    public Object[] getArgumentos() {

        return this.argumentos.clone();

    }

}
