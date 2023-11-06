package br.com.projeto.barberhelper.utils;

import java.text.MessageFormat;
import java.util.ResourceBundle;

public class MessageSupport {

    private static ResourceBundle messages = ResourceBundle.getBundle("message");

    private MessageSupport() {

    }

    public static String getMessage(final String key) {

        return messages.getString(key);
    }

    public static String getMessage(final String key, Object... values) {

        return MessageFormat.format(messages.getString(key), values);
    }

}
