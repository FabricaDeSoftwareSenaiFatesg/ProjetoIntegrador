package br.com.projeto.barberhelper.utils;

import java.text.MessageFormat;

public class ServiceException extends ControllerException{

    private static final long serialVersionUID = 1L;

    public ServiceException(final String mensagem, final Object... argumentos) {
        super(mensagem, argumentos);
    }

    public String buildMensagem() {
        return MessageFormat.format(this.getMessage(), this.getArgumentos());
    }

}
